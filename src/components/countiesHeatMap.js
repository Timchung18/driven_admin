import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { feature, mesh } from 'topojson-client';
import axios from 'axios';

const GeorgiaCountiesMap = () => {
  const svgRef = useRef();
  const [topojsonData, setTopojsonData] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch TopoJSON and ticket data simultaneously
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [topoResponse, ticketResponse] = await Promise.all([
          axios.get(`${process.env.PUBLIC_URL}/GeorgiaCounties2018.json`),
          axios.get(`${process.env.PUBLIC_URL}/GeorgiaTicketData.json`)
        ]);

        setTopojsonData(topoResponse.data);
        setTicketData(ticketResponse.data);

      } catch (err) {
        setError(err.message);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (!topojsonData) return;
  
    const width = 950;
    const height = 850; // Increased height to avoid cutting off the top
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 -50 ${width + 300} ${height + 100}`) // Adjusted viewBox to provide extra space at the top
      .attr('style', 'width: 100%; height: auto; position: relative;'); 
  
    const geojson = feature(topojsonData, topojsonData.objects.Counties2018);
  
    const projection = d3.geoMercator()
      .center([-83.5, 32.5])
      .scale(8000) 
      .translate([width / 2, height / 2 + 50]); // Lowered the map slightly
  
    const path = d3.geoPath().projection(projection);

    svg.append("g")
      .selectAll("path")
      .data(geojson.features)
      .join("path")
      .attr("d", path)
      .attr("fill", "#eee")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5);
  
    svg.append("path")
      .datum(mesh(topojsonData, topojsonData.objects.Counties2018, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("d", path);
  
  }, [topojsonData]);

  useEffect(() => {
    if (!ticketData || !topojsonData) return;

    const width = 800, height = 600;
    const geojson = feature(topojsonData, topojsonData.objects.Counties2018);

    const svg = d3.select(svgRef.current);
    const countyDataMap = new Map(ticketData.map(d => [d.county.toLowerCase(), d]));

    const numPaidColorScale = d3.scaleLinear().domain([50, 300]).range([0, 1]);
    const numOverdueColorScale = d3.scaleLinear().domain([10, 70]).range([0, 1]);
    const colorScale = d3.scaleSequential((t) => d3.interpolateGnBu(t)).domain([0, 2]);

    const color = (countyName) => {
      const countyData = countyDataMap.get(countyName);
      if (countyData) {
        const numPaidNormalized = numPaidColorScale(countyData.payInFour.numPaidTickets);
        const numOverdueNormalized = numOverdueColorScale(countyData.payInFour.numOverdueTickets);
        const combinedIndex = numPaidNormalized + numOverdueNormalized;
        return colorScale(combinedIndex);
      }
      return "#ccc";
    };

    const formatTooltip = (countyName) => {
      const countyData = countyDataMap.get(countyName.toLowerCase());
      if (!countyData) return "No data available";
    
      return `${countyName}<br>
              Completed Tickets: ${countyData.payInFour.numPaidTickets}<br>
              Overdue Tickets: ${countyData.payInFour.numOverdueTickets}`;
    };

    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "6px")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("box-shadow", "0px 0px 5px rgba(0,0,0,0.2)")
      .style("pointer-events", "none")
      .style("visibility", "hidden");

    svg.selectAll("path")
      .data(geojson.features)
      .join("path")
      .attr("fill", d => color(d.properties.NAME.toLowerCase()))
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .html(formatTooltip(d.properties.NAME));
      })
      .on("mousemove", (event) => {
        tooltip.style("top", `${event.pageY - 28}px`)
          .style("left", `${event.pageX + 5}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    const legendGroup = addBivariateLegend();
    svg.append(() => legendGroup)
      .attr("transform", `translate(${width + 100}, ${height / 6})`);

    return () => {
      tooltip.remove();
    };
  }, [ticketData, topojsonData]);

  const addBivariateLegend = () => {
    const legendSize = 150;  
    const cellSize = legendSize / 3; 
    const offsetX = 15;  
    const offsetY = 15;
  
    const legendGroup = d3.create("svg:g").attr("class", "bivariate-legend");
  
    const bivariateColorMatrix = [
      ["#e8f4f8", "#b3d6e1", "#66b3c4"],
      ["#b3e6a5", "#8cd699", "#5eb282"],
      ["#72c162", "#5aa050", "#3f7840"]
    ];
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        legendGroup.append("rect")
          .attr("x", j * cellSize + offsetX)
          .attr("y", i * cellSize + offsetY)
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("fill", bivariateColorMatrix[i][j]);
      }
    }
  
    legendGroup.append("text")
      .attr("x", offsetX - 15)
      .attr("y", cellSize * 1.5 + offsetY)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "18px")
      .attr("transform", `rotate(-90, ${offsetX - 15}, ${cellSize * 1.5 + offsetY})`)
      .text("Overdue Tickets");
  
    legendGroup.append("text")
      .attr("x", cellSize * 1.5 + offsetX)
      .attr("y", legendSize + offsetY + 15)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "18px")
      .text("Completed Tickets");
  
    return legendGroup.node();
  };

  if (error) return <div>Error: {error}</div>;
  if (!topojsonData) return <div>Loading map outline...</div>;
  if (topojsonData && !ticketData) return <div>Loading data-driven colors...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-textPrimary mb-4 text-center">Overdue Tickets vs Completed Tickets</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GeorgiaCountiesMap;
