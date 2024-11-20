import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label, AreaChart, Area } from 'recharts';

const data = [
    { month: 'Jan', year: 2023, paidInFull: 480, paidIn4: 600, paidInFullPercentage: 40, paidIn4Percentage: 60, timeToPaymentPaidInFull: 10, timeToPaymentPaidIn4: 15 },
    { month: 'Feb', year: 2023, paidInFull: 450, paidIn4: 650, paidInFullPercentage: 35, paidIn4Percentage: 65, timeToPaymentPaidInFull: 9, timeToPaymentPaidIn4: 14 },
    { month: 'Mar', year: 2023, paidInFull: 500, paidIn4: 620, paidInFullPercentage: 45, paidIn4Percentage: 55, timeToPaymentPaidInFull: 8, timeToPaymentPaidIn4: 13 },
    { month: 'Apr', year: 2023, paidInFull: 520, paidIn4: 600, paidInFullPercentage: 50, paidIn4Percentage: 50, timeToPaymentPaidInFull: 8, timeToPaymentPaidIn4: 12 },
    { month: 'May', year: 2023, paidInFull: 530, paidIn4: 590, paidInFullPercentage: 52, paidIn4Percentage: 48, timeToPaymentPaidInFull: 7, timeToPaymentPaidIn4: 11 },
    { month: 'Jun', year: 2023, paidInFull: 540, paidIn4: 580, paidInFullPercentage: 53, paidIn4Percentage: 47, timeToPaymentPaidInFull: 7, timeToPaymentPaidIn4: 11 },
    { month: 'Jul', year: 2023, paidInFull: 550, paidIn4: 570, paidInFullPercentage: 54, paidIn4Percentage: 46, timeToPaymentPaidInFull: 6, timeToPaymentPaidIn4: 10 },
    { month: 'Aug', year: 2023, paidInFull: 560, paidIn4: 560, paidInFullPercentage: 55, paidIn4Percentage: 45, timeToPaymentPaidInFull: 6, timeToPaymentPaidIn4: 10 },
    { month: 'Sep', year: 2023, paidInFull: 570, paidIn4: 550, paidInFullPercentage: 56, paidIn4Percentage: 44, timeToPaymentPaidInFull: 5, timeToPaymentPaidIn4: 9 },
    { month: 'Oct', year: 2023, paidInFull: 580, paidIn4: 540, paidInFullPercentage: 57, paidIn4Percentage: 43, timeToPaymentPaidInFull: 5, timeToPaymentPaidIn4: 9 },
    { month: 'Nov', year: 2023, paidInFull: 590, paidIn4: 530, paidInFullPercentage: 58, paidIn4Percentage: 42, timeToPaymentPaidInFull: 4, timeToPaymentPaidIn4: 8 },
    { month: 'Dec', year: 2023, paidInFull: 600, paidIn4: 520, paidInFullPercentage: 60, paidIn4Percentage: 40, timeToPaymentPaidInFull: 4, timeToPaymentPaidIn4: 8 },
    { month: 'Jan', year: 2024, paidInFull: 620, paidIn4: 500, paidInFullPercentage: 62, paidIn4Percentage: 38, timeToPaymentPaidInFull: 3, timeToPaymentPaidIn4: 7 },
    { month: 'Feb', year: 2024, paidInFull: 630, paidIn4: 490, paidInFullPercentage: 63, paidIn4Percentage: 37, timeToPaymentPaidInFull: 3, timeToPaymentPaidIn4: 7 },
    { month: 'Mar', year: 2024, paidInFull: 640, paidIn4: 480, paidInFullPercentage: 64, paidIn4Percentage: 36, timeToPaymentPaidInFull: 2, timeToPaymentPaidIn4: 6 },
    { month: 'Apr', year: 2024, paidInFull: 650, paidIn4: 470, paidInFullPercentage: 65, paidIn4Percentage: 35, timeToPaymentPaidInFull: 2, timeToPaymentPaidIn4: 6 },
    { month: 'May', year: 2024, paidInFull: 660, paidIn4: 460, paidInFullPercentage: 66, paidIn4Percentage: 34, timeToPaymentPaidInFull: 2, timeToPaymentPaidIn4: 5 },
    { month: 'Jun', year: 2024, paidInFull: 670, paidIn4: 450, paidInFullPercentage: 67, paidIn4Percentage: 33, timeToPaymentPaidInFull: 2, timeToPaymentPaidIn4: 5 },
    { month: 'Jul', year: 2024, paidInFull: 680, paidIn4: 440, paidInFullPercentage: 68, paidIn4Percentage: 32, timeToPaymentPaidInFull: 2, timeToPaymentPaidIn4: 5 },
    { month: 'Aug', year: 2024, paidInFull: 690, paidIn4: 430, paidInFullPercentage: 69, paidIn4Percentage: 31, timeToPaymentPaidInFull: 2, timeToPaymentPaidIn4: 4 },
    { month: 'Sep', year: 2024, paidInFull: 700, paidIn4: 420, paidInFullPercentage: 70, paidIn4Percentage: 30, timeToPaymentPaidInFull: 2, timeToPaymentPaidIn4: 4 },
    { month: 'Oct', year: 2024, paidInFull: 710, paidIn4: 410, paidInFullPercentage: 71, paidIn4Percentage: 29, timeToPaymentPaidInFull: 1, timeToPaymentPaidIn4: 4 },
    { month: 'Nov', year: 2024, paidInFull: 200, paidIn4: 430, paidInFullPercentage: 32, paidIn4Percentage: 68, timeToPaymentPaidInFull: 3, timeToPaymentPaidIn4: 4 },
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
            top: 10, right: 30, left: 20, bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6C757D', fontSize: 12 }}>
            
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
            top: 10, right: 30, left: 20, bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6C757D', fontSize: 12 }}>
            
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
