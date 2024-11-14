import React, { useEffect, useState } from 'react';

// Mock data for payment plans
const mockPaymentPlans = [
  { id: 1, user: 'Alice Johnson', amount: 300, status: 'Pending', paymentType: 'Pay in Full' },
  { id: 2, user: 'Bob Smith', amount: 150, status: 'Pending', paymentType: 'Pay in Four' },
  { id: 3, user: 'Carol Williams', amount: 500, status: 'Approved', paymentType: 'Pay in Full' },
  { id: 4, user: 'David Brown', amount: 200, status: 'Pending', paymentType: 'Pay in Four' },
  { id: 5, user: 'Emily Davis', amount: 450, status: 'Pending', paymentType: 'Pay in Full' },
  { id: 6, user: 'Frank White', amount: 350, status: 'Approved', paymentType: 'Pay in Four' },
  { id: 7, user: 'Grace Lee', amount: 250, status: 'Pending', paymentType: 'Pay in Full' },
  { id: 8, user: 'Hannah Taylor', amount: 400, status: 'Pending', paymentType: 'Pay in Four' },
];

function PaymentApprovalDashboard() {
  const [paymentPlans, setPaymentPlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);

  useEffect(() => {
    // Use mock data for testing instead of fetching from an API
    setPaymentPlans(mockPaymentPlans);
  }, []);

  const handleSelectPlan = (planId) => {
    setSelectedPlans((prevSelected) =>
      prevSelected.includes(planId)
        ? prevSelected.filter(id => id !== planId)
        : [...prevSelected, planId]
    );
  };

  const handlePaymentTypeChange = (planId, newType) => {
    setPaymentPlans((prevPlans) =>
      prevPlans.map(plan =>
        plan.id === planId ? { ...plan, paymentType: newType } : plan
      )
    );
  };

  const approvePlan = (planId) => {
    setPaymentPlans((prevPlans) =>
      prevPlans.map(plan => plan.id === planId ? { ...plan, status: 'Approved' } : plan)
    );
  };

  const approveSelectedPlans = () => {
    setPaymentPlans((prevPlans) =>
      prevPlans.map(plan =>
        selectedPlans.includes(plan.id) ? { ...plan, status: 'Approved' } : plan
      )
    );
    setSelectedPlans([]); // Clear selected plans after approval
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Payment Approval Dashboard</h2>
        <button
          onClick={approveSelectedPlans}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md disabled:bg-gray-300"
          disabled={selectedPlans.length === 0}
        >
          Approve Selected
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="text-gray-600 text-xs uppercase border-b">
              <th className="px-4 py-3 text-left">Select</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Plan Amount</th>
              <th className="px-4 py-3 text-left">Payment Type</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentPlans.map((plan) => (
              <tr key={plan.id} className="border-b hover:bg-gray-50">
                {/* Select Checkbox */}
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                    checked={selectedPlans.includes(plan.id)}
                    onChange={() => handleSelectPlan(plan.id)}
                    disabled={plan.status === 'Approved'}
                  />
                </td>

                {/* User and Date */}
                <td className="px-4 py-4">
                  <div className="text-gray-800 font-medium">{plan.user}</div>
                </td>

                {/* Plan Amount */}
                <td className="px-4 py-4 text-gray-800 font-medium">
                  ${plan.amount}
                </td>

                {/* Payment Type */}
                <td className="px-4 py-4">
                  <select
                    value={plan.paymentType}
                    onChange={(e) => handlePaymentTypeChange(plan.id, e.target.value)}
                    disabled={plan.status === 'Approved'}
                    className="text-sm text-gray-600 bg-gray-100 border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="Pay in Full">Pay in Full</option>
                    <option value="Pay in Four">Pay in Four</option>
                  </select>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-md ${
                      plan.status === 'Approved'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {plan.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  {plan.status !== 'Approved' && (
                    <button
                      onClick={() => approvePlan(plan.id)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentApprovalDashboard;
