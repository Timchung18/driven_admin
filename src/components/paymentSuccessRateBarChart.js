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

const MyBarChart = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="traditionalCompletedTickets" name="Paid in Full" fill="#8884d8" />
        <Bar dataKey="drivenCompletedTickets" name="Paid in 4 (Driven)" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
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
      <div>
        <label>
          Start Month:
          <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
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
          <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
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
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </label>
        <button onClick={handleFilter}>Filter</button>
      </div>
    );
};
  

const BarChartContainer = () => {
  
    const [data, setData] = useState(initialData);
  
    return (
      <div>
        <h2>Payment Success Rate</h2>
        <DateRangeSelector setData={setData} initialData={initialData} />
        <MyBarChart data={data} />
      </div>
    );
  };

  export default BarChartContainer;
