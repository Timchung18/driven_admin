import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Papa from 'papaparse';

function TicketsTable() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [sortColumn, setSortColumn] = useState('ticket_number'); // Default column
  const [sortOrder, setSortOrder] = useState('asc'); // Default order

  // Aggregated stats
  const [stats, setStats] = useState({
    totalInstallmentAmount: 0,
    uniqueTickets: 0,
    totalPaymentAmount: 0,
    totalOverdueFees: 0,
  });

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          ticket_id, ticket_number, amount, status,
          payment_plans (
            plan_id, plan_type, amount_paid, approval_status, due_date, overdue_fees, initial_charge, payment_status,
            installments (
              installment_id, installment_number, due_date, initial_amount, status, overdue_fees,
              payments (payment_id, amount_paid, payment_date)
            )
          )
        `);

      if (error) {
        console.error('Error fetching tickets:', error);
        setError(error.message);
      } else {
        setTickets(flattenData(data));
        
        calculateStats(data);
      }
      setLoading(false);
    };

    const calculateStats = (tickets) => {
      const uniqueTicketNumbers = new Set();
      let totalInstallmentAmount = 0;
      let totalPaymentAmount = 0;
      let totalOverdueFees = 0;

      tickets.forEach((ticket) => {
        uniqueTicketNumbers.add(ticket.ticket_number);

        ticket.payment_plans?.forEach((plan) => {
          plan.installments?.forEach((installment) => {
            if (installment.initial_amount) {
              totalInstallmentAmount += parseFloat(installment.initial_amount);
            }
            if (installment.overdue_fees) {
              totalOverdueFees += parseFloat(installment.overdue_fees);
            }
            installment.payments?.forEach((payment) => {
              if (payment.amount_paid) {
                totalPaymentAmount += parseFloat(payment.amount_paid);
              }
            });
          });
        });
      });

      setStats({
        totalInstallmentAmount,
        uniqueTickets: uniqueTicketNumbers.size,
        totalPaymentAmount,
        totalOverdueFees,
      });
      
    };

    const flattenData = (tickets) => {
      const flattened = [];
      tickets.forEach((ticket) => {
        const hasPlans = ticket.payment_plans?.length > 0;

        if (!hasPlans) {
          flattened.push({ ...ticket, plan_type: 'N/A', installments: [], payments: [] });
        } else {
          ticket.payment_plans.forEach((plan) => {
            const hasInstallments = plan.installments?.length > 0;

            if (!hasInstallments) {
              flattened.push({
                ...ticket,
                plan_type: plan.plan_type,
                approval_status: plan.approval_status,
                installments: [],
                payments: [],
              });
            } else {
              plan.installments.forEach((installment) => {
                const hasPayments = installment.payments?.length > 0;

                if (!hasPayments) {
                  flattened.push({
                    ...ticket,
                    plan_type: plan.plan_type,
                    approval_status: plan.approval_status,
                    installment_number: installment.installment_number,
                    installment_due_date: installment.due_date,
                    installment_amount: installment.initial_amount,
                    installment_overdue_fees: installment.overdue_fees,
                    installment_status: installment.status,
                    payment_amount: 'N/A',
                    payment_date: 'N/A',
                  });
                } else {
                  installment.payments.forEach((payment) => {
                    flattened.push({
                      ...ticket,
                      plan_type: plan.plan_type,
                      approval_status: plan.approval_status,
                      installment_number: installment.installment_number,
                      installment_due_date: installment.due_date,
                      installment_amount: installment.initial_amount,
                      installment_overdue_fees: installment.overdue_fees,
                      installment_status: installment.status,
                      payment_amount: payment.amount_paid,
                      payment_date: payment.payment_date,
                    });
                  });
                }
              });
            }
          });
        }
      });
      console.log(flattened);
      return flattened;
    };

    fetchTickets();
  }, []);

  const exportToCSV = () => {
    const csv = Papa.unparse(
      tickets.map((ticket) => ({
        TicketNumber: ticket.ticket_number || 'N/A',
        TicketAmount: typeof ticket.amount === 'number' ? `$${ticket.amount.toFixed(2)}` : 'N/A',
        TicketStatus: ticket.status || 'N/A',
        PlanType: ticket.plan_type || 'N/A',
        PlanStatus: ticket.approval_status || 'N/A',
        InstallmentNumber: ticket.installment_number || 'N/A',
        InstallmentDueDate: (ticket.installment_due_date && ticket.installment_due_date !== "N/A")
          ? new Date(ticket.installment_due_date).toLocaleDateString()
          : 'N/A',
        InstallmentAmount:
          typeof ticket.installment_amount === 'number'
            ? `$${ticket.installment_amount.toFixed(2)}`
            : 'N/A',
        InstallmentOverdueFees:
          typeof ticket.installment_overdue_fees === 'number'
            ? `$${ticket.installment_overdue_fees.toFixed(2)}`
            : 'N/A',
        InstallmentStatus: ticket.installment_status || 'N/A',
        PaymentAmount:
          typeof ticket.payment_amount === 'number'
            ? `$${ticket.payment_amount.toFixed(2)}`
            : 'N/A',
        PaymentDate: 
        (ticket.payment_date && ticket.payment_date !== "N/A")
          ? new Date(ticket.payment_date).toLocaleDateString()
          : 'N/A',
      }))
    );
  
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tickets_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (column) => {
    const sorted = [...tickets].sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];
  
      // Helper function to check for null, undefined, or "N/A" values
      const isNullOrNA = (value) =>
        value === null || value === undefined || value === 'N/A';
  
      // Handle null, undefined, or "N/A" values as the lowest
      if (isNullOrNA(aValue)) aValue = -Infinity; // Lowest value
      if (isNullOrNA(bValue)) bValue = -Infinity; // Lowest value
  
      // Handle numeric columns
      if (
        ['amount', 'installment_overdue_fees', 'installment_amount', 'payment_amount'].includes(column)
      ) {
        aValue = isNullOrNA(a[column]) ? -Infinity : parseFloat(a[column]) || 0;
        bValue = isNullOrNA(b[column]) ? -Infinity : parseFloat(b[column]) || 0;
      }
  
      // Handle string columns
      if (['ticket_number', 'ticket_status', 'plan_type', 'plan_status', 'installment_status'].includes(column)) {
        aValue = isNullOrNA(a[column]) ? 'zzz' : String(a[column]).toLowerCase(); // "zzz" ensures it is treated as the lowest
        bValue = isNullOrNA(b[column]) ? 'zzz' : String(b[column]).toLowerCase();
      }
  
      // Handle date columns
      if (['installment_due_date', 'payment_date'].includes(column)) {
        aValue = isNullOrNA(a[column]) ? -Infinity : new Date(a[column]).getTime();
        bValue = isNullOrNA(b[column]) ? -Infinity : new Date(b[column]).getTime();
      }
  
      // Sorting logic
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0; // If equal, no change in order
    });
  
    // Log sorted values for debugging
    console.log(
      `Sorted values for column "${column}":`,
      sorted.map((ticket) => ticket[column])
    );
  
    setTickets(sorted);
    setSortColumn(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  if (loading) return <div>Loading tickets...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Tickets and Related Information</h2>
      <button
        onClick={exportToCSV}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Export to CSV
      </button>

      {/* Display Aggregated Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">Total Installment Amount</h3>
          <p className="text-xl font-bold text-gray-800">${stats.totalInstallmentAmount.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">Unique Tickets</h3>
          <p className="text-xl font-bold text-gray-800">{stats.uniqueTickets}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">Total Payment Amount</h3>
          <p className="text-xl font-bold text-gray-800">${stats.totalPaymentAmount.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">Total Overdue Fees</h3>
          <p className="text-xl font-bold text-gray-800">${stats.totalOverdueFees.toFixed(2)}</p>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
  <tr>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('ticket_number')}>
      Ticket Number {sortColumn === 'ticket_number' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('amount')}>
      Ticket Amount {sortColumn === 'amount' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('status')}>
      Ticket Status {sortColumn === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('plan_type')}>
      Plan Type {sortColumn === 'plan_type' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('approval_status')}>
      Plan Status {sortColumn === 'approval_status' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('installment_number')}>
      Installment # {sortColumn === 'installment_number' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('installment_due_date')}>
      Installment Due Date {sortColumn === 'installment_due_date' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('installment_amount')}>
      Installment Amount {sortColumn === 'installment_amount' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('installment_overdue_fees')}>
      Installment Overdue Fees {sortColumn === 'installment_overdue_fees' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('installment_status')}>
      Installment Status {sortColumn === 'installment_status' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('payment_amount')}>
      Payment Amount {sortColumn === 'payment_amount' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('payment_date')}>
      Payment Date {sortColumn === 'payment_date' && (sortOrder === 'asc' ? '▲' : '▼')}
    </th>
  </tr>
</thead>

          <tbody>
  {tickets.map((ticket, index) => (
    <tr key={index} className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 text-sm text-gray-800">{ticket.ticket_number}</td>
      <td className="px-4 py-3 text-sm text-gray-800">
        {typeof ticket.amount === 'number' ? `$${ticket.amount.toFixed(2)}` : 'N/A'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-800">{ticket.status || 'N/A'}</td>
      <td className="px-4 py-3 text-sm text-gray-800">{ticket.plan_type || 'N/A'}</td>
      <td className="px-4 py-3 text-sm text-gray-800">{ticket.approval_status || 'N/A'}</td>
      <td className="px-4 py-3 text-sm text-gray-800">{ticket.installment_number || 'N/A'}</td>
      <td className="px-4 py-3 text-sm text-gray-800">
        {(ticket.installment_due_date && ticket.installment_due_date !== "N/A") ? new Date(ticket.installment_due_date).toLocaleDateString() : 'N/A'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-800">
        {typeof ticket.installment_amount === 'number'
          ? `$${ticket.installment_amount.toFixed(2)}`
          : 'N/A'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-800">
        {typeof ticket.installment_overdue_fees === 'number'
          ? `$${ticket.installment_overdue_fees.toFixed(2)}`
          : 'N/A'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-800">{ticket.installment_status || 'N/A'}</td>
      <td className="px-4 py-3 text-sm text-gray-800">
        {typeof ticket.payment_amount === 'number'
          ? `$${ticket.payment_amount.toFixed(2)}`
          : 'N/A'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-800">
        {ticket.payment_date && ticket.payment_date !== "N/A" ? new Date(ticket.payment_date).toLocaleDateString() : 'N/A'}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default TicketsTable;
