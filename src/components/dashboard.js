import React from 'react';
import BarChartContainer from './paymentSuccessRateBarChart';
import LineGraph from './driversLineGraph';

const Dashboard = () => {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        
        {/* Payment Success Rate Component */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <BarChartContainer />
        </div>
  
        {/* Line Graph Component (Positioned Beneath Payment Success Rate) */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <LineGraph />
        </div>
      </div>
    );
  };
  
  export default Dashboard;