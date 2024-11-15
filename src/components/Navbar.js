import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaWallet, FaCreditCard, FaFileInvoice, FaGift, FaChartLine } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bg-background h-screen w-64 p-6 text-textSecondary">
      {/* General Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold uppercase text-textSecondary tracking-wider mb-4">General</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  currentPath === '/dashboard' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaChartLine className={`text-lg ${currentPath === '/dashboard' ? 'text-white' : 'text-accent'}`} />
                <span className={`${currentPath === '/dashboard' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/viewTables"
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  currentPath === '/viewTables' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaWallet className={`text-lg ${currentPath === '/viewTables' ? 'text-white' : 'text-accent'}`} />
                <span className={`${currentPath === '/viewTables' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Tables
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/heatmap"
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  currentPath === '/heatmap' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaFileInvoice className={`text-lg ${currentPath === '/heatmap' ? 'text-white' : 'text-accent'}`} />
                <span className={`${currentPath === '/heatmap' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Map
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/stackedBarChart"
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  currentPath === '/stackedBarChart' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaCreditCard className={`text-lg ${currentPath === '/stackedBarChart' ? 'text-white' : 'text-accent'}`} />
                <span className={`${currentPath === '/stackedBarChart' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Stacked Bar Chart
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/trendLineChart"
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  currentPath === '/trendLineChart' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaChartLine className={`text-lg ${currentPath === '/trendLineChart' ? 'text-white' : 'text-accent'}`} />
                <span className={`${currentPath === '/trendLineChart' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Trend Line Chart
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/paymentApproval"
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  currentPath === '/paymentApproval' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaGift className={`text-lg ${currentPath === '/paymentApproval' ? 'text-white' : 'text-accent'}`} />
                <span className={`${currentPath === '/paymentApproval' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Payment Approval
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
