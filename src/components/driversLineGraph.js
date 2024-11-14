import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const initialData = [
  { month: 'Jan', year: 2023, payInFull: 400, payIn4: 240 },
  { month: 'Feb', year: 2023, payInFull: 300, payIn4: 139 },
  { month: 'Mar', year: 2023, payInFull: 200, payIn4: 980 },
  { month: 'Apr', year: 2023, payInFull: 278, payIn4: 390 },
  { month: 'May', year: 2023, payInFull: 189, payIn4: 480 },
  { month: 'Jun', year: 2023, payInFull: 239, payIn4: 380 },
  { month: 'Jul', year: 2023, payInFull: 349, payIn4: 430 },
  { month: 'Aug', year: 2023, payInFull: 450, payIn4: 210 },
  { month: 'Sep', year: 2023, payInFull: 300, payIn4: 400 },
  { month: 'Oct', year: 2023, payInFull: 240, payIn4: 300 },
  { month: 'Nov', year: 2023, payInFull: 500, payIn4: 600 },
  { month: 'Dec', year: 2023, payInFull: 300, payIn4: 220 },
  { month: 'Jan', year: 2024, payInFull: 420, payIn4: 260 },
  { month: 'Feb', year: 2024, payInFull: 310, payIn4: 208 },
  { month: 'Mar', year: 2024, payInFull: 220, payIn4: 820 },
  { month: 'Apr', year: 2024, payInFull: 288, payIn4: 400 },
  { month: 'May', year: 2024, payInFull: 199, payIn4: 490 },
  { month: 'Jun', year: 2024, payInFull: 249, payIn4: 390 },
  { month: 'Jul', year: 2024, payInFull: 359, payIn4: 440 },
  { month: 'Aug', year: 2024, payInFull: 420, payIn4: 300 },
  { month: 'Sep', year: 2024, payInFull: 330, payIn4: 310 },
  { month: 'Oct', year: 2024, payInFull: 260, payIn4: 340 },
  { month: 'Nov', year: 2024, payInFull: 100, payIn4: 200 },
];

const getDateFromMonthYear = (month, year) => new Date(`${month} 1, ${year}`);

const DateRangeSelector = ({ setData, initialData }) => {
  const [startMonth, setStartMonth] = useState('January');
  const [startYear, setStartYear] = useState(2023);
  const [endMonth, setEndMonth] = useState('December');
  const [endYear, setEndYear] = useState(2024);

  const startDate = getDateFromMonthYear(startMonth, startYear);
  const endDate = getDateFromMonthYear(endMonth, endYear);
  const isDateRangeValid = startDate <= endDate;

  const handleFilter = () => {
    const filteredData = initialData.filter((item) => {
      const itemDate = getDateFromMonthYear(item.month, item.year);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setData(filteredData);
  };

  return (
    <div className="mb-4 flex flex-col items-center">
      <div className="flex gap-4 items-center">
        <label>
          Start Month:
          <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)} className="ml-2 p-1 border rounded">
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </label>

        <label>
          Start Year:
          <select value={startYear} onChange={(e) => setStartYear(parseInt(e.target.value))} className="ml-2 p-1 border rounded">
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>
        </label>

        <label>
          End Month:
          <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)} className="ml-2 p-1 border rounded">
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </label>

        <label>
          End Year:
          <select value={endYear} onChange={(e) => setEndYear(parseInt(e.target.value))} className="ml-2 p-1 border rounded">
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>
        </label>

        <button 
          onClick={handleFilter} 
          disabled={!isDateRangeValid} 
          className={`px-4 py-2 rounded ${
            isDateRangeValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Filter
        </button>
      </div>

      {/* Centered validation message below the filter controls */}
      {!isDateRangeValid && (
        <p className="text-red-600 text-sm mt-2 text-center">Start date cannot be after the end date. Please adjust the date range.</p>
      )}
    </div>
  );
};

const LineGraph = () => {
  const [data, setData] = useState(initialData);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pay in Full Drivers vs Pay in 4 Drivers</h2>
      <DateRangeSelector setData={setData} initialData={initialData} />
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month">
            
          </XAxis>
          <YAxis>
            <Label angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#888' }}>
              Drivers
            </Label>
          </YAxis>
          <Tooltip 
            formatter={(value, name) => [`${value}`, `${name}`]}
            labelFormatter={(label, payload) => {
              if (payload && payload.length > 0) {
                const year = payload[0].payload.year;
                return `${label} ${year}`;
              }
              return label;
            }}
          />
          <Legend />

          <Area
            type="monotone"
            dataKey="payInFull"
            stroke="#8884d8"
            strokeWidth={2}
            fill="#8884d8"
            fillOpacity={0.2}
            name="Pay in Full"
          />
          <Area
            type="monotone"
            dataKey="payIn4"
            stroke="#82ca9d"
            strokeWidth={2}
            fill="#82ca9d"
            fillOpacity={0.2}
            name="Pay in 4"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
