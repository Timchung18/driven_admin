import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const data = [
    { month: 'Jan', payInFull: 400, payIn4: 240 },
    { month: 'Feb', payInFull: 300, payIn4: 139 },
    { month: 'Mar', payInFull: 200, payIn4: 980 },
    { month: 'Apr', payInFull: 278, payIn4: 390 },
    { month: 'May', payInFull: 189, payIn4: 480 },
    { month: 'Jun', payInFull: 239, payIn4: 380 },
    { month: 'Jul', payInFull: 349, payIn4: 430 },
    { month: 'Aug', payInFull: 450, payIn4: 210 },
    { month: 'Sep', payInFull: 300, payIn4: 400 },
    { month: 'Oct', payInFull: 240, payIn4: 300 },
    { month: 'Nov', payInFull: 500, payIn4: 600 },
    { month: 'Dec', payInFull: 300, payIn4: 220 },
];
  

const LineGraph = () => {
  return (
    <div>
      <h2>Pay in Full Drivers vs Pay in 4 Drivers</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month">
            <Label value="Months" position="insideBottom" style={{ textAnchor: 'middle' }} />
          </XAxis>
          <YAxis>
            <Label angle={-90} position='insideLeft' style={{ textAnchor: 'middle' }}>
              Drivers
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="payInFull" stroke="#8884d8" name="Pay in Full" />
          <Line type="monotone" dataKey="payIn4" stroke="#82ca9d" name="Pay in 4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
