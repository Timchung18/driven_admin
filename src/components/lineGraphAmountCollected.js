import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, AreaChart, Area } from 'recharts';

const data = [
  {
    month: 'Jan',
    paidInFull: 480,
    paidIn4: 600,
    paidInFullPercentage: 40,
    paidIn4Percentage: 60,
    timeToPaymentPaidInFull: 10,
    timeToPaymentPaidIn4: 15,
  },
  {
    month: 'Feb',
    paidInFull: 450,
    paidIn4: 650,
    paidInFullPercentage: 35,
    paidIn4Percentage: 65,
    timeToPaymentPaidInFull: 9,
    timeToPaymentPaidIn4: 14,
  },
  {
    month: 'Mar',
    paidInFull: 500,
    paidIn4: 620,
    paidInFullPercentage: 45,
    paidIn4Percentage: 55,
    timeToPaymentPaidInFull: 8,
    timeToPaymentPaidIn4: 13,
  },
  // Add more data as needed for each month...
];

const TrendLineChart = () => {
  const [isPercentage, setIsPercentage] = useState(false);

  const toggleView = () => {
    setIsPercentage(!isPercentage);
  };

  return (
    <div className="bg-cardBackground rounded-lg shadow-card p-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold text-textPrimary mb-4 text-center">Trend Over Time: Payment Behavior</h2>
      <button
        onClick={toggleView}
        className="px-4 py-2 mb-6 rounded-md border border-gray-300 text-gray-600 text-sm hover:bg-gray-100"
      >
        {isPercentage ? 'Show $ Amount' : 'Show Percentages'}
      </button>

      {/* Chart for "Median Paid in Full" and "Median Paid in 4" */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6C757D', fontSize: 12 }}>
            <Label value="Months" position="insideBottom" offset={-20} />
          </XAxis>
          <YAxis>
            <Label angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }}>
              {isPercentage ? 'Percentage (%)' : 'Amount ($)'}
            </Label>
          </YAxis>
          <Tooltip formatter={(value) => (isPercentage ? `${value}%` : `$${value}`)} />
          <Legend wrapperStyle={{ paddingTop: 20 }} />

          {/* Area for Paid in Full with Shaded Fill */}
          <Area
            type="monotone"
            dataKey={isPercentage ? 'paidInFullPercentage' : 'paidInFull'}
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.2}
            strokeWidth={2}
            name={isPercentage ? 'Paid in Full (%)' : 'Median Paid in Full ($)'}
          />

          {/* Area for Paid in 4 with Shaded Fill */}
          <Area
            type="monotone"
            dataKey={isPercentage ? 'paidIn4Percentage' : 'paidIn4'}
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.2}
            strokeWidth={2}
            name={isPercentage ? 'Paid in 4 (%)' : 'Median Paid in 4 ($)'}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Separate Chart for "Time to Payment" */}
      <h3 className="text-lg font-semibold text-textPrimary mt-8 mb-4 text-center">Median Time to Payment (Days)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6C757D', fontSize: 12 }}>
            <Label value="Months" position="insideBottom" offset={-20} />
          </XAxis>
          <YAxis>
            <Label angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }}>
              Time to Payment (Days)
            </Label>
          </YAxis>
          <Tooltip formatter={(value) => `${value} days`} />
          <Legend wrapperStyle={{ paddingTop: 20 }} />

          {/* Area for Time to Payment (Paid in Full) with Shaded Fill */}
          <Area
            type="monotone"
            dataKey="timeToPaymentPaidInFull"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.2}
            strokeWidth={2}
            name="Time to Payment (Paid in Full)"
          />

          {/* Area for Time to Payment (Paid in 4) with Shaded Fill */}
          <Area
            type="monotone"
            dataKey="timeToPaymentPaidIn4"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.2}
            strokeWidth={2}
            name="Time to Payment (Paid in 4)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendLineChart;
