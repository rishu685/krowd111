import React, { useState, useEffect } from 'react';
import { CustomButton } from '../components';

const Withdraw = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [withdrawData, setWithdrawData] = useState({
    amount: '',
    method: 'bank',
    accountDetails: '',
    reason: ''
  });

  // Mock withdrawal history
  useEffect(() => {
    setWithdrawals([
      {
        id: 1,
        amount: '$1,250.00',
        method: 'Bank Transfer',
        status: 'Completed',
        date: '2024-01-15',
        transactionId: 'TXN123456789'
      },
      {
        id: 2,
        amount: '$750.00',
        method: 'PayPal',
        status: 'Pending',
        date: '2024-01-20',
        transactionId: 'TXN987654321'
      }
    ]);
  }, []);

  const handleInputChange = (e) => {
    setWithdrawData({
      ...withdrawData,
      [e.target.name]: e.target.value
    });
  };

  const handleWithdraw = () => {
    console.log('Processing withdrawal:', withdrawData);
    // Add withdrawal processing logic
  };

  return (
    <div className="w-full">
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 mb-6">
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Withdraw Funds
          </h1>
        </div>

        <div className="w-full mt-[20px]">
          {/* Account Balance */}
          <div className="bg-[#2c2f36] p-6 rounded-lg mb-6">
            <h3 className="text-white font-semibold mb-2">Available Balance</h3>
            <p className="text-3xl font-bold text-[#1dc071]">$2,847.50</p>
            <p className="text-gray-400 text-sm">Last updated: January 21, 2024</p>
          </div>

          {/* Withdrawal Form */}
          <div className="bg-[#2c2f36] p-6 rounded-lg mb-6">
            <h3 className="text-white font-semibold mb-4">Request Withdrawal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-white block mb-2">Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={withdrawData.amount}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
                />
              </div>
              
              <div>
                <label className="text-white block mb-2">Withdrawal Method</label>
                <select
                  name="method"
                  value={withdrawData.method}
                  onChange={handleInputChange}
                  className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="crypto">Cryptocurrency</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-white block mb-2">Account Details</label>
              <textarea
                name="accountDetails"
                placeholder="Enter your account details (account number, email, wallet address, etc.)"
                value={withdrawData.accountDetails}
                onChange={handleInputChange}
                rows="3"
                className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none resize-none"
              />
            </div>

            <div className="mb-4">
              <label className="text-white block mb-2">Reason (Optional)</label>
              <input
                type="text"
                name="reason"
                placeholder="Reason for withdrawal"
                value={withdrawData.reason}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
              />
            </div>

            <CustomButton
              btnType="button"
              title="Request Withdrawal"
              styles="bg-[#1dc071] w-full"
              handleClick={handleWithdraw}
            />
          </div>
        </div>
      </div>

      {/* Withdrawal History */}
      <div className="bg-[#1c1c24] rounded-[10px] sm:p-10 p-4">
        <h2 className="font-epilogue font-bold text-[18px] text-white mb-6">Withdrawal History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-[#3a3a43]">
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3 px-2">Amount</th>
                <th className="text-left py-3 px-2">Method</th>
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-left py-3 px-2">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="border-b border-[#2c2f36]">
                  <td className="py-3 px-2">{withdrawal.date}</td>
                  <td className="py-3 px-2 font-semibold">{withdrawal.amount}</td>
                  <td className="py-3 px-2">{withdrawal.method}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      withdrawal.status === 'Completed' 
                        ? 'bg-[#1dc071] text-white' 
                        : 'bg-[#f89e36] text-white'
                    }`}>
                      {withdrawal.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-400">{withdrawal.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;