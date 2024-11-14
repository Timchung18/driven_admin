import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const initialData = [
  { month: 'Jan', year: 2023, traditionalCompletedTickets: 400, drivenCompletedTickets: 240 },
  { month: 'Feb', year: 2023, traditionalCompletedTickets: 300, drivenCompletedTickets: 198 },
  { month: 'Mar', year: 2023, traditionalCompletedTickets: 200, drivenCompletedTickets: 800 },
  { month: 'Apr', year: 2023, traditionalCompletedTickets: 278, drivenCompletedTickets: 390 },
  { month: 'May', year: 2023, traditionalCompletedTickets: 189, drivenCompletedTickets: 480 },
  { month: 'Jun', year: 2023, traditionalCompletedTickets: 239, drivenCompletedTickets: 380 },
  { month: 'Jul', year: 2023, traditionalCompletedTickets: 349, drivenCompletedTickets: 430 },
  { month: 'Aug', year: 2023, traditionalCompletedTickets: 410, drivenCompletedTickets: 260 },
  { month: 'Sep', year: 2023, traditionalCompletedTickets: 320, drivenCompletedTickets: 210 },
  { month: 'Oct', year: 2023, traditionalCompletedTickets: 250, drivenCompletedTickets: 300 },
  { month: 'Nov', year: 2023, traditionalCompletedTickets: 270, drivenCompletedTickets: 350 },
  { month: 'Dec', year: 2023, traditionalCompletedTickets: 300, drivenCompletedTickets: 400 },
  { month: 'Jan', year: 2024, traditionalCompletedTickets: 420, drivenCompletedTickets: 260 },
  { month: 'Feb', year: 2024, traditionalCompletedTickets: 310, drivenCompletedTickets: 208 },
  { month: 'Mar', year: 2024, traditionalCompletedTickets: 220, drivenCompletedTickets: 820 },
  { month: 'Apr', year: 2024, traditionalCompletedTickets: 288, drivenCompletedTickets: 400 },
  { month: 'May', year: 2024, traditionalCompletedTickets: 199, drivenCompletedTickets: 490 },
  { month: 'Jun', year: 2024, traditionalCompletedTickets: 249, drivenCompletedTickets: 390 },
  { month: 'Jul', year: 2024, traditionalCompletedTickets: 359, drivenCompletedTickets: 440 },
  { month: 'Aug', year: 2024, traditionalCompletedTickets: 420, drivenCompletedTickets: 300 },
  { month: 'Sep', year: 2024, traditionalCompletedTickets: 330, drivenCompletedTickets: 310 },
  { month: 'Oct', year: 2024, traditionalCompletedTickets: 260, drivenCompletedTickets: 340 },
  { month: 'Nov', year: 2024, traditionalCompletedTickets: 280, drivenCompletedTickets: 360 },
  { month: 'Dec', year: 2024, traditionalCompletedTickets: 310, drivenCompletedTickets: 410 },
];

// Helper function to create date objects from month and year
const getDateFromMonthYear = (month, year) => new Date(`${month} 1, ${year}`);

// DateRangeSelector component copied from the first component
const DateRangeSelector = ({ setData }) => {
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

      {!isDateRangeValid && (
        <p className="text-red-600 text-sm mt-2 text-center">Start date cannot be after the end date. Please adjust the date range.</p>
      )}
    </div>
  );
};

// BarChart component
const MyBarChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }} 
            interval={0} // Ensures every label is shown
          />
          <YAxis label={{ value: 'Number of Tickets', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="traditionalCompletedTickets" name="Pay in Full" fill="#8884d8" radius={[5, 5, 0, 0]} />
          <Bar dataKey="drivenCompletedTickets" name="Pay in 4" fill="#82ca9d" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// BarChartContainer component with time filter
const BarChartContainer = () => {
  const [data, setData] = useState(initialData);

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Payment Success Rate</h2>
        <DateRangeSelector setData={setData} />
        <MyBarChart data={data} />
      </div>
    </div>
  );
};

export default BarChartContainer;
