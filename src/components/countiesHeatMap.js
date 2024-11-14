import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { feature, mesh } from 'topojson-client'; // Import TopoJSON utilities for working with topojson data
import axios from 'axios';

const GeorgiaCountiesMap = () => {
  const svgRef = useRef(); // Reference for the SVG element
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // Function to fetch ticket data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.PUBLIC_URL}/GeorgiaTicketData.json`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // UseEffect to render the D3 map when data is loaded
  useEffect(() => {
    if (!data) return; // Exit if data is not yet loaded

    // Define dimensions
    const width = 800, height = 600;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width + 200, height]) // Extend width to accommodate legend
      .attr('style', 'width: 100%; height: auto; position: relative;');

    // Load TopoJSON data
    d3.json(`${process.env.PUBLIC_URL}/GeorgiaCounties2018.json`).then(topojsonData => {
      const geojson = feature(topojsonData, topojsonData.objects.Counties2018);
      const sortedFeatures = geojson.features.sort((a, b) => d3.geoArea(a) - d3.geoArea(b));

      // Use GeoMercator projection and adjust scaling and translation
      const projection = d3.geoMercator()
        .center([-83.5, 32.5])
        .scale(5000)
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);
      const countyDataMap = new Map(data.map(d => [d.county.toLowerCase(), d]));

      // Define color scales
      const numPaidColorScale = d3.scaleLinear().domain([50, 300]).range([0, 1]);
      const numOverdueColorScale = d3.scaleLinear().domain([10, 70]).range([0, 1]);

      // Bivariate color scale
      const colorScale = d3.scaleSequential((t) => d3.interpolateGnBu(t)).domain([0, 2]);

      const color = (d) => {
        const countyName = d.properties.NAME.toLowerCase();
        const countyData = countyDataMap.get(countyName);
        if (countyData) {
          const numPaidNormalized = numPaidColorScale(countyData.payInFour.numPaidTickets);
          const numOverdueNormalized = numOverdueColorScale(countyData.payInFour.numOverdueTickets);
          const combinedIndex = numPaidNormalized + numOverdueNormalized;
          return colorScale(combinedIndex);
        } else {
          return "#ccc";
        }
      };

      const format = (d) => {
        const countyName = d.properties.NAME.toLowerCase();
        const countyData = countyDataMap.get(countyName);
        if (!countyData) return "N/A";
        return `Completed Tickets with Pay in Four: ${countyData.payInFour.numPaidTickets}
                Overdue Tickets with Pay in Four: ${countyData.payInFour.numOverdueTickets}`;
      };

      // Draw the counties
      svg.append("g")
        .selectAll("path")
        .data(sortedFeatures)
        .join("path")
        .attr("fill", d => color(d))
        .attr("d", path)
        .append("title")
        .text(d => `${d.properties.NAME}:\n${format(d)}`);

      // Draw boundaries
      svg.append("path")
        .datum(mesh(topojsonData, topojsonData.objects.Counties2018, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d", path);

      // Append the legend to the main SVG
      const legendGroup = addBivariateLegend();
      svg.append(() => legendGroup)
        .attr("transform", `translate(${width + 20}, ${height / 4})`); // Position legend next to the map
    });
  }, [data]); // Only run when 'data' is available

  // Function to add bivariate legend
  const addBivariateLegend = () => {
    const legendSize = 100;
    const cellSize = legendSize / 3;
    const offsetX = 10;
    const offsetY = 10;

    const legendGroup = d3.create("svg:g")
      .attr("class", "bivariate-legend");

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

    // Add axis labels
    legendGroup.append("text")
      .attr("x", offsetX - 10)
      .attr("y", cellSize * 1.5 + offsetY)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "6px")
      .attr("transform", `rotate(-90, ${offsetX - 10}, ${cellSize * 1.5 + offsetY})`)
      .text("Overdue Tickets");

    legendGroup.append("text")
      .attr("x", cellSize * 1.5 + offsetX)
      .attr("y", legendSize + offsetY + 10)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "6px")
      .text("Completed Tickets");

    return legendGroup.node();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Pay in Four: Overdue Tickets vs Completed Tickets</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GeorgiaCountiesMap;
