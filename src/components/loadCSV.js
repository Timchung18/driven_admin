import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

function CsvViewer() {
  const [data, setData] = useState([]);
  const [columnSums, setColumnSums] = useState({
    overdue_fine_amount: 0,
    fine_amount: 0,
    amount_paid: 0,
    overdue_fine_count: 0,
    distinct_tickets: 0,
    installments_with_completion: 0,
  });
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    axios.get('/joined_tickets_installments.csv')
      .then((response) => {
        Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data;
            setData(parsedData);
            calculateSums(parsedData);
          },
        });
      })
      .catch((error) => console.error('Error fetching the CSV file:', error));
  }, []);

  const calculateSums = (parsedData) => {
    if (parsedData.length === 0) return;

    let sums = {
      overdue_fine_amount: 0,
      fine_amount: 0,
      amount_paid: 0,
      overdue_fine_count: 0,
      distinct_tickets: new Set(),
      installments_with_completion: 0,
    };

    parsedData.forEach((row) => {
      if (!isNaN(row.overdue_fine_amount) && row.overdue_fine_amount !== '') {
        sums.overdue_fine_amount += parseFloat(row.overdue_fine_amount);
      }
      if (!isNaN(row.fine_amount) && row.fine_amount !== '') {
        sums.fine_amount += parseFloat(row.fine_amount);
      }
      if (!isNaN(row.amount_paid) && row.amount_paid !== '') {
        sums.amount_paid += parseFloat(row.amount_paid);
      }
      if (parseFloat(row.overdue_fine_amount) > 0) {
        sums.overdue_fine_count += 1;
      }
      if (row.ticket_number) {
        sums.distinct_tickets.add(row.ticket_number);
      }
      if (row.completion_date) {
        sums.installments_with_completion += 1;
      }
    });

    setColumnSums({
      overdue_fine_amount: sums.overdue_fine_amount,
      fine_amount: sums.fine_amount,
      amount_paid: sums.amount_paid,
      overdue_fine_count: sums.overdue_fine_count,
      distinct_tickets: sums.distinct_tickets.size,
      installments_with_completion: sums.installments_with_completion,
    });
  };

  const handleSort = (column) => {
    const order = (sortColumn === column && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      const aNum = parseFloat(aValue);
      const bNum = parseFloat(bValue);
      const aVal = isNaN(aNum) ? aValue : aNum;
      const bVal = isNaN(bNum) ? bValue : bNum;

      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const exportToCsv = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'exported_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Tables</h3>
      <button
        onClick={exportToCsv}
        className="mb-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
      >
        Export as CSV
      </button>

      {/* Styled Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Overdue Fine Amount Card */}
        <div className="bg-white rounded-lg shadow p-4 border">
          <div className="text-gray-500 text-sm">Overdue Fine Amount</div>
          <div className="text-2xl font-semibold text-gray-800">${columnSums.overdue_fine_amount.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Total Overdue Fines</div>
        </div>

        {/* Fine Amount Card */}
        <div className="bg-white rounded-lg shadow p-4 border">
          <div className="text-gray-500 text-sm">Fine Amount</div>
          <div className="text-2xl font-semibold text-gray-800">${columnSums.fine_amount.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Total Fines Issued</div>
        </div>

        {/* Amount Paid Card */}
        <div className="bg-white rounded-lg shadow p-4 border">
          <div className="text-gray-500 text-sm">Amount Paid</div>
          <div className="text-2xl font-semibold text-gray-800">${columnSums.amount_paid.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Total Paid Amount</div>
        </div>

        {/* Overdue Fine Count Card */}
        <div className="bg-white rounded-lg shadow p-4 border">
          <div className="text-gray-500 text-sm">Overdue Fines</div>
          <div className="text-2xl font-semibold text-gray-800">{columnSums.overdue_fine_count}</div>
          <div className="text-sm text-gray-500">Total Overdue Fines</div>
        </div>

        {/* Distinct Tickets Card */}
        <div className="bg-white rounded-lg shadow p-4 border">
          <div className="text-gray-500 text-sm">Distinct Tickets</div>
          <div className="text-2xl font-semibold text-gray-800">{columnSums.distinct_tickets}</div>
          <div className="text-sm text-gray-500">Unique Ticket Numbers</div>
        </div>

        {/* Completed Payments Card */}
        <div className="bg-white rounded-lg shadow p-4 border">
          <div className="text-gray-500 text-sm">Completed Payments</div>
          <div className="text-2xl font-semibold text-gray-800">{columnSums.installments_with_completion}</div>
          <div className="text-sm text-gray-500">Completed Installments</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="text-gray-600 text-xs uppercase border-b">
              {Object.keys(data[0] || {}).map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                >
                  {key} {sortColumn === key ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {Object.values(row).map((value, idx) => (
                  <td key={idx} className="px-4 py-4 text-gray-800 text-sm">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CsvViewer;
