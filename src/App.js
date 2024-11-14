import './App.css';
import CsvViewer from './components/loadCSV';
import GeorgiaCountiesMap from './components/countiesHeatMap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StackedBarChart from './components/stackedBarChart';
import TrendLineChart from './components/lineGraphAmountCollected';
import PaymentApprovalDashboard from './components/paymentApprovalDash';
import Dashboard from './components/dashboard';

function App() {
  
  return (
    <Router>
      <div className="flex h-screen bg-background">
        <Navbar />

        {/* Main content area */}
        <div className="flex-1 p-6 overflow-auto">
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/viewTables" element={<CsvViewer />} />
          <Route path="/heatmap" element={<GeorgiaCountiesMap />} />
          <Route path="/stackedBarChart" element={<StackedBarChart />} />
          <Route path="/trendLineChart" element={<TrendLineChart />} />
          <Route path="/paymentApproval" element={<PaymentApprovalDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
