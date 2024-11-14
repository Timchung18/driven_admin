import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LineGraph from './driversLineGraph';

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
          <XAxis dataKey="month" />
          <YAxis label={{ value: 'Number of Tickets', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="traditionalCompletedTickets" name="Paid in Full" fill="#8884d8" radius={[5, 5, 0, 0]} />
          <Bar dataKey="drivenCompletedTickets" name="Paid in 4 (Driven)" fill="#82ca9d" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const DateRangeSelector = ({ setData, initialData }) => {
  const [startMonth, setStartMonth] = useState('January');
  const [endMonth, setEndMonth] = useState('July');
  const [year, setYear] = useState(2023);

  const handleFilter = () => {
    const filteredData = initialData.filter((item) => {
      const itemDate = new Date(`${item.month} 1, ${item.year}`);
      const startDate = new Date(`${startMonth} 1, ${year}`);
      const endDate = new Date(`${endMonth} 1, ${year}`);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setData(filteredData);
  };

  return (
    <div className="mb-4 flex gap-4 items-center">
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
        Year:
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="ml-2 p-1 border rounded">
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </label>
      
      <button onClick={handleFilter} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Filter
      </button>
    </div>
  );
};

const BarChartContainer = () => {
  const [data, setData] = useState(initialData);

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Payment Success Rate</h2>
        <DateRangeSelector setData={setData} initialData={initialData} />
        <MyBarChart data={data} />
      </div>
      <div className="mt-8">
        <LineGraph />
      </div>
    </div>
  );
};

export default BarChartContainer;
