import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const data = [
  { month: 'Jan', finesPaid: 1200, finesOverdue: 800, finesOutstanding: 300 },
  { month: 'Feb', finesPaid: 950, finesOverdue: 400, finesOutstanding: 500 },
  { month: 'Mar', finesPaid: 1100, finesOverdue: 600, finesOutstanding: 400 },
  { month: 'Apr', finesPaid: 1300, finesOverdue: 700, finesOutstanding: 600 },
  { month: 'May', finesPaid: 1500, finesOverdue: 900, finesOutstanding: 700 },
  { month: 'Jun', finesPaid: 1250, finesOverdue: 650, finesOutstanding: 500 },
  { month: 'Jul', finesPaid: 1400, finesOverdue: 800, finesOutstanding: 600 },
  { month: 'Aug', finesPaid: 1600, finesOverdue: 900, finesOutstanding: 700 },
  { month: 'Sep', finesPaid: 1200, finesOverdue: 750, finesOutstanding: 600 },
  { month: 'Oct', finesPaid: 1300, finesOverdue: 800, finesOutstanding: 500 },
  { month: 'Nov', finesPaid: 1450, finesOverdue: 850, finesOutstanding: 600 },
  { month: 'Dec', finesPaid: 1550, finesOverdue: 900, finesOutstanding: 700 },
];

const StackedBarChart = () => {
  return (
    <div className="bg-cardBackground rounded-lg shadow-card p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-textPrimary mb-6 text-center">Monthly Fines Overview</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20, // Adjusted left margin to prevent Y-axis label cut-off
            bottom: 50,
          }}
          barCategoryGap="20%"
          barSize={30}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false}>
            <Label
              value="Months"
              position="insideBottom"
              style={{ textAnchor: 'middle', fill: '#6C757D' }}
              dy={20}
            />
          </XAxis>
          <YAxis tickLine={false} axisLine={false}>
            <Label angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#6C757D' }} dy={-10}>
              Fines ($)
            </Label>
          </YAxis>
          <Tooltip formatter={(value) => `$${value}`} />
          
          <Legend verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: 20 }} />

          {/* Stacked Bars with Radius Only on Top Segment */}
          <Bar dataKey="finesPaid" stackId="a" fill="#32a071" name="Fines Paid" radius={[0, 0, 0, 0]} />
          <Bar dataKey="finesOverdue" stackId="a" fill="#8884d8" name="Fines Overdue" radius={[0, 0, 0, 0]} />
          <Bar dataKey="finesOutstanding" stackId="a" fill="#ffc658" name="Fines Outstanding" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
