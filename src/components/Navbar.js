import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaCreditCard, FaFileInvoice, FaGift, FaChartLine } from 'react-icons/fa';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <nav className="bg-background h-screen w-64 p-6 text-textSecondary">
      {/* General Section */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold uppercase text-textSecondary tracking-wider mb-4">General</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/viewTables"
                onClick={() => handleItemClick('Tables')}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeItem === 'Tables' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaWallet className={`text-lg ${activeItem === 'Tables' ? 'text-white' : 'text-accent'}`} />
                <span className={`${activeItem === 'Tables' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Tables
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/heatmap"
                onClick={() => handleItemClick('Map')}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeItem === 'Map' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaFileInvoice className={`text-lg ${activeItem === 'Map' ? 'text-white' : 'text-accent'}`} />
                <span className={`${activeItem === 'Map' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Map
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/stackedBarChart"
                onClick={() => handleItemClick('Stacked Bar Chart')}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeItem === 'Stacked Bar Chart' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaCreditCard className={`text-lg ${activeItem === 'Stacked Bar Chart' ? 'text-white' : 'text-accent'}`} />
                <span className={`${activeItem === 'Stacked Bar Chart' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Stacked Bar Chart
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/trendLineChart"
                onClick={() => handleItemClick('Trend Line Chart')}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeItem === 'Trend Line Chart' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaChartLine className={`text-lg ${activeItem === 'Trend Line Chart' ? 'text-white' : 'text-accent'}`} />
                <span className={`${activeItem === 'Trend Line Chart' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Trend Line Chart
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/paymentApproval"
                onClick={() => handleItemClick('Payment Approval')}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeItem === 'Payment Approval' ? 'bg-accent text-white' : 'hover:bg-gray-100'
                }`}
              >
                <FaGift className={`text-lg ${activeItem === 'Payment Approval' ? 'text-white' : 'text-accent'}`} />
                <span className={`${activeItem === 'Payment Approval' ? 'text-white font-semibold' : 'text-textPrimary'}`}>
                  Payment Approval
                </span>
              </Link>
            </li>
            <li className="nav-item">
                <Link to="/dashboard" className="nav-links hover:text-gray-300">
                Dashboard
                </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
