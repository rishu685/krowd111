import React, { useState, useEffect } from 'react';
import { CustomButton } from '../components';
import { useStateContext } from '../context';
import toast from 'react-hot-toast';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('crypto');
  const [isLoading, setIsLoading] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(null);
  const { connect, address, donate } = useStateContext();
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

  // Check network status when wallet is connected
  useEffect(() => {
    const checkNetwork = async () => {
      if (window.ethereum && address) {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId === '0x5') {
            setNetworkStatus('✅ Goerli Testnet');
          } else {
            setNetworkStatus('❌ Wrong Network (Switch to Goerli)');
          }
        } catch (error) {
          setNetworkStatus('❓ Network Unknown');
        }
      } else {
        setNetworkStatus(null);
      }
    };

    checkNetwork();

    // Listen for network changes
    if (window.ethereum) {
      window.ethereum.on('chainChanged', checkNetwork);
      return () => {
        window.ethereum.removeListener('chainChanged', checkNetwork);
      };
    }
  }, [address]);

  const handlePayment = async () => {
    if (selectedMethod === 'crypto') {
      // Validate crypto payment fields
      if (!paymentData.campaignId || !paymentData.amount) {
        toast.error('Please fill in both Campaign ID and Amount fields');
        return;
      }

      if (!address) {
        toast.error('Please connect your wallet first');
        return;
      }

      // Check if we're on the correct network (Goerli)
      if (window.ethereum) {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId !== '0x5') { // Goerli chain ID
            const switchToGoerli = window.confirm('You need to switch to Goerli testnet. Switch now?');
            if (switchToGoerli) {
              try {
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x5' }], // Goerli
                });
              } catch (switchError) {
                if (switchError.code === 4902) {
                  // Network doesn't exist, add it
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                      chainId: '0x5',
                      chainName: 'Goerli Testnet',
                      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                      rpcUrls: ['https://goerli.infura.io/v3/'],
                      blockExplorerUrls: ['https://goerli.etherscan.io/']
                    }]
                  });
                }
              }
            } else {
              toast.error('Please switch to Goerli testnet to continue');
              return;
            }
          }
        } catch (error) {
          console.error('Network check error:', error);
        }
      }

      // Validate amount is a positive number
      const amount = parseFloat(paymentData.amount);
      if (isNaN(amount) || amount <= 0) {
        toast.error('Please enter a valid amount greater than 0');
        return;
      }

      try {
        setIsLoading(true);
        toast.loading('Processing your donation...', { id: 'donation' });
        
        await donate(paymentData.campaignId, paymentData.amount);
        
        toast.success('Donation successful! Thank you for your contribution.', { id: 'donation' });
        
        // Clear form after successful donation
        setPaymentData({
          ...paymentData,
          campaignId: '',
          amount: ''
        });
      } catch (error) {
        console.error('Donation error:', error);
        if (error.message.includes('user rejected')) {
          toast.error('Transaction was rejected by user', { id: 'donation' });
        } else if (error.message.includes('insufficient funds')) {
          toast.error('Insufficient funds in your wallet', { id: 'donation' });
        } else {
          toast.error('Donation failed. Please check your wallet and try again.', { id: 'donation' });
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Processing payment with method:', selectedMethod, paymentData);
      // Other payment methods logic here
      toast.error('This payment method is not yet implemented');
    }
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
            
            {address ? (
              <div>
                <div className="mb-4 p-3 bg-[#1c1c24] rounded-lg border border-[#1dc071]">
                  <p className="text-[#1dc071] text-sm mb-1">✅ Wallet Connected</p>
                  <p className="text-white font-mono text-sm break-all">{address}</p>
                  {networkStatus && (
                    <p className="text-xs mt-2 font-semibold">{networkStatus}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="text-white block mb-2">Campaign ID *</label>
                  <input
                    type="text"
                    name="campaignId"
                    placeholder="Enter campaign ID to donate to"
                    value={paymentData.campaignId}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="text-white block mb-2">Amount (ETH) *</label>
                  <input
                    type="text"
                    name="amount"
                    placeholder="0.0"
                    value={paymentData.amount}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 bg-[#1c1c24] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
                  />
                </div>
                
                <CustomButton
                  btnType="button"
                  title={isLoading ? "Processing..." : "Donate with Crypto"}
                  styles={`${isLoading ? 'bg-[#808080]' : 'bg-[#1dc071]'} w-full`}
                  handleClick={handlePayment}
                  disabled={isLoading}
                />
                
                <div className="mt-4 p-3 bg-[#1c1c24] rounded-lg border border-[#3a3a43]">
                  <h4 className="text-[#1dc071] text-sm font-semibold mb-2">ℹ️ How to find Campaign ID</h4>
                  <p className="text-gray-300 text-xs">
                    Go to the campaign details page, and the campaign ID will be displayed in the URL or campaign information section.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <CustomButton
                  btnType="button"
                  title="🦊 Connect MetaMask"
                  styles="bg-[#f6851b] hover:bg-[#e76f00] w-full mb-3"
                  handleClick={async () => {
                    try {
                      // Check if MetaMask is installed
                      if (typeof window.ethereum === 'undefined') {
                        toast.error('MetaMask is not installed! Please install MetaMask browser extension.');
                        window.open('https://metamask.io/download/', '_blank');
                        return;
                      }

                      // Make sure we're requesting to connect to MetaMask specifically
                      if (window.ethereum.isMetaMask) {
                        toast.loading('Connecting to MetaMask...', { id: 'wallet-connection' });
                        await connect();
                        toast.success('MetaMask connected successfully!', { id: 'wallet-connection' });
                      } else {
                        toast.error('Please use MetaMask to connect');
                      }
                    } catch (error) {
                      console.error('Connection error:', error);
                      toast.error('Failed to connect to MetaMask. Please try again.', { id: 'wallet-connection' });
                    }
                  }}
                />
                
                {/* Alternative connection button for other wallets */}
                <CustomButton
                  btnType="button"
                  title="🔗 Connect Other Wallet"
                  styles="bg-[#8c6dfd] w-full"
                  handleClick={() => {
                    connect();
                  }}
                />
                
                <div className="mt-4 p-3 bg-[#1c1c24] rounded-lg border border-[#3a3a43]">
                  <h4 className="text-[#f6851b] text-sm font-semibold mb-2">🦊 MetaMask Setup</h4>
                  <div className="text-gray-300 text-xs space-y-1">
                    <p>• Make sure MetaMask extension is installed</p>
                    <p>• Switch to <span className="text-[#1dc071] font-semibold">Goerli Testnet</span></p>
                    <p>• Have some Goerli ETH for transactions</p>
                    <p>• Get test ETH from <a href="https://goerlifaucet.com/" target="_blank" className="text-[#8c6dfd] underline">Goerli Faucet</a></p>
                  </div>
                </div>
              </div>
            )}
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