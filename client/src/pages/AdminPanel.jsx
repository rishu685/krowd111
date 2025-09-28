import React, { useState } from 'react';
import { CustomButton } from '../components';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  
  // Mock admin data
  const adminData = {
    campaigns: [
      { id: 1, title: 'Help Build School', creator: 'John Doe', status: 'Active', raised: '$25,000', target: '$50,000' },
      { id: 2, title: 'Medical Aid Fund', creator: 'Jane Smith', status: 'Pending', raised: '$8,500', target: '$20,000' },
      { id: 3, title: 'Save the Forest', creator: 'Mike Johnson', status: 'Completed', raised: '$75,000', target: '$75,000' }
    ],
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', campaigns: 3, totalRaised: '$45,000', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', campaigns: 1, totalRaised: '$8,500', status: 'Active' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', campaigns: 2, totalRaised: '$85,000', status: 'Suspended' }
    ],
    payments: [
      { id: 1, campaign: 'Help Build School', donor: 'Anonymous', amount: '$500', method: 'Credit Card', status: 'Completed' },
      { id: 2, campaign: 'Medical Aid Fund', donor: 'Sarah Wilson', amount: '$250', method: 'PayPal', status: 'Pending' },
      { id: 3, campaign: 'Save the Forest', donor: 'Tom Brown', amount: '$1,000', method: 'Crypto', status: 'Completed' }
    ]
  };

  const handleAction = (action, item) => {
    console.log(`${action} action for:`, item);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 mb-6">
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Admin Panel
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mt-4">
          {['campaigns', 'users', 'payments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize ${
                activeTab === tab 
                  ? 'bg-[#1dc071] text-white' 
                  : 'bg-[#3a3a43] text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Content */}
      <div className="bg-[#1c1c24] rounded-[10px] sm:p-10 p-4">
        {activeTab === 'campaigns' && (
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">Campaign Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-[#3a3a43]">
                    <th className="text-left py-3 px-2">Title</th>
                    <th className="text-left py-3 px-2">Creator</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Progress</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-[#2c2f36]">
                      <td className="py-3 px-2 font-semibold">{campaign.title}</td>
                      <td className="py-3 px-2">{campaign.creator}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          campaign.status === 'Active' ? 'bg-[#1dc071] text-white' :
                          campaign.status === 'Pending' ? 'bg-[#f89e36] text-white' :
                          'bg-[#8c6dfd] text-white'
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">{campaign.raised} / {campaign.target}</td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleAction('approve', campaign)}
                            className="text-[#1dc071] hover:underline text-sm"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleAction('suspend', campaign)}
                            className="text-[#f89e36] hover:underline text-sm"
                          >
                            Suspend
                          </button>
                          <button 
                            onClick={() => handleAction('delete', campaign)}
                            className="text-red-500 hover:underline text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-[#3a3a43]">
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Email</th>
                    <th className="text-left py-3 px-2">Campaigns</th>
                    <th className="text-left py-3 px-2">Total Raised</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.users.map((user) => (
                    <tr key={user.id} className="border-b border-[#2c2f36]">
                      <td className="py-3 px-2 font-semibold">{user.name}</td>
                      <td className="py-3 px-2">{user.email}</td>
                      <td className="py-3 px-2">{user.campaigns}</td>
                      <td className="py-3 px-2">{user.totalRaised}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'Active' ? 'bg-[#1dc071] text-white' : 'bg-red-500 text-white'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleAction('activate', user)}
                            className="text-[#1dc071] hover:underline text-sm"
                          >
                            Activate
                          </button>
                          <button 
                            onClick={() => handleAction('suspend', user)}
                            className="text-[#f89e36] hover:underline text-sm"
                          >
                            Suspend
                          </button>
                          <button 
                            onClick={() => handleAction('ban', user)}
                            className="text-red-500 hover:underline text-sm"
                          >
                            Ban
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">Payment Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-[#3a3a43]">
                    <th className="text-left py-3 px-2">Campaign</th>
                    <th className="text-left py-3 px-2">Donor</th>
                    <th className="text-left py-3 px-2">Amount</th>
                    <th className="text-left py-3 px-2">Method</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-[#2c2f36]">
                      <td className="py-3 px-2">{payment.campaign}</td>
                      <td className="py-3 px-2">{payment.donor}</td>
                      <td className="py-3 px-2 font-semibold">{payment.amount}</td>
                      <td className="py-3 px-2">{payment.method}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === 'Completed' ? 'bg-[#1dc071] text-white' : 'bg-[#f89e36] text-white'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleAction('process', payment)}
                            className="text-[#1dc071] hover:underline text-sm"
                          >
                            Process
                          </button>
                          <button 
                            onClick={() => handleAction('refund', payment)}
                            className="text-[#f89e36] hover:underline text-sm"
                          >
                            Refund
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;