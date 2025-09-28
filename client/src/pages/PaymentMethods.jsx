import React, { useState } from 'react';
import { CustomButton } from '../components';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('crypto');
  const [paymentData, setPaymentData] = useState({
    amount: '',
    campaignId: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
    bankAccount: '',
    routingNumber: ''
  });

  const handleInputChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    console.log('Processing payment with method:', selectedMethod, paymentData);
    // Payment processing logic here
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Payment Methods
        </h1>
      </div>

      <div className="w-full mt-[20px]">
        {/* Payment Method Selection */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setSelectedMethod('crypto')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedMethod === 'crypto' 
                ? 'bg-[#1dc071] text-white' 
                : 'bg-[#3a3a43] text-gray-300'
            }`}
          >
            Cryptocurrency
          </button>
          <button
            onClick={() => setSelectedMethod('card')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedMethod === 'card' 
                ? 'bg-[#1dc071] text-white' 
                : 'bg-[#3a3a43] text-gray-300'
            }`}
          >
            Credit/Debit Card
          </button>
          <button
            onClick={() => setSelectedMethod('paypal')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedMethod === 'paypal' 
                ? 'bg-[#1dc071] text-white' 
                : 'bg-[#3a3a43] text-gray-300'
            }`}
          >
            PayPal
          </button>
          <button
            onClick={() => setSelectedMethod('bank')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedMethod === 'bank' 
                ? 'bg-[#1dc071] text-white' 
                : 'bg-[#3a3a43] text-gray-300'
            }`}
          >
            Bank Transfer
          </button>
        </div>

        {/* Payment Forms */}
        {selectedMethod === 'crypto' && (
          <div className="bg-[#2c2f36] p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-4">Cryptocurrency Payment</h3>
            <p className="text-gray-300 mb-4">Connect your wallet to pay with cryptocurrency</p>
            <CustomButton
              btnType="button"
              title="Connect Wallet"
              styles="bg-[#8c6dfd] w-full"
              handleClick={() => console.log('Connect wallet')}
            />
          </div>
        )}

        {selectedMethod === 'card' && (
          <div className="bg-[#2c2f36] p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-4">Credit/Debit Card Payment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentData.cardNumber}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentData.cvv}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={paymentData.email}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
              />
            </div>
            <CustomButton
              btnType="button"
              title="Pay with Card"
              styles="bg-[#1dc071] w-full mt-4"
              handleClick={handlePayment}
            />
          </div>
        )}

        {selectedMethod === 'paypal' && (
          <div className="bg-[#2c2f36] p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-4">PayPal Payment</h3>
            <input
              type="email"
              name="paypalEmail"
              placeholder="PayPal Email"
              value={paymentData.paypalEmail}
              onChange={handleInputChange}
              className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none mb-4"
            />
            <CustomButton
              btnType="button"
              title="Pay with PayPal"
              styles="bg-[#0070ba] w-full"
              handleClick={handlePayment}
            />
          </div>
        )}

        {selectedMethod === 'bank' && (
          <div className="bg-[#2c2f36] p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-4">Bank Transfer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="bankAccount"
                placeholder="Account Number"
                value={paymentData.bankAccount}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
              />
              <input
                type="text"
                name="routingNumber"
                placeholder="Routing Number"
                value={paymentData.routingNumber}
                onChange={handleInputChange}
                className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
              />
            </div>
            <CustomButton
              btnType="button"
              title="Initiate Transfer"
              styles="bg-[#1dc071] w-full mt-4"
              handleClick={handlePayment}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;