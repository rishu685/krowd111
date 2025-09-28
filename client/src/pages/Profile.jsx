import React, { useState, useEffect } from 'react';
import { DisplayCampaigns, CustomButton } from '../components';
import { useStateContext } from '../context';
import { avatar, avatarnone } from '../assets';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [activeTab, setActiveTab] = useState('campaigns');
  const [userStats, setUserStats] = useState({
    totalCampaigns: 0,
    totalRaised: 0,
    totalDonations: 0,
    successfulCampaigns: 0
  });

  const { address, contract, getUserCampaigns } = useStateContext();

  // Mock user data - in a real app, this would come from the backend
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    bio: 'Passionate about making a positive impact in the world through crowdfunding.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    social: {
      twitter: '@johndoe',
      linkedin: 'linkedin.com/in/johndoe'
    }
  };

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const data = await getUserCampaigns();
      setCampaigns(data);
      
      // Calculate user stats
      const stats = {
        totalCampaigns: data.length,
        totalRaised: data.reduce((sum, campaign) => sum + campaign.amountCollected, 0),
        totalDonations: data.reduce((sum, campaign) => sum + (campaign.donators?.length || 0), 0),
        successfulCampaigns: data.filter(campaign => campaign.amountCollected >= campaign.target).length
      };
      setUserStats(stats);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  const mockDonationHistory = [
    { id: 1, campaign: 'Help Build School', amount: 250, date: '2024-01-15' },
    { id: 2, campaign: 'Medical Aid Fund', amount: 100, date: '2024-01-20' },
    { id: 3, campaign: 'Clean Ocean Initiative', amount: 500, date: '2024-01-25' }
  ];

  const mockWithdrawals = [
    { id: 1, amount: 1250, method: 'Bank Transfer', status: 'Completed', date: '2024-01-10' },
    { id: 2, amount: 750, method: 'PayPal', status: 'Pending', date: '2024-01-22' }
  ];

  return (
    <div className="w-full">
      {/* Profile Header */}
      <div className="bg-[#1c1c24] rounded-[10px] p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-[#2c2f36] flex items-center justify-center">
            <img 
              src={address ? avatar : avatarnone} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="font-epilogue font-bold text-[28px] text-white mb-2">
              {userData.name}
            </h1>
            <p className="font-epilogue text-[16px] text-[#808191] mb-3">
              {userData.bio}
            </p>
            <div className="flex flex-wrap gap-4 text-[14px] text-[#808191]">
              <span>📍 {userData.location}</span>
              <span>📅 Joined {userData.joinDate}</span>
              <span>🌐 {userData.website}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <span className="text-[#1dc071]">{userData.social.twitter}</span>
              <span className="text-[#8c6dfd]">{userData.social.linkedin}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <CustomButton
              btnType="button"
              title="Edit Profile"
              styles="bg-[#3a3a43] min-w-[120px]"
              handleClick={() => console.log('Edit profile')}
            />
            <CustomButton
              btnType="button"
              title="Share Profile"
              styles="bg-[#1dc071] min-w-[120px]"
              handleClick={() => console.log('Share profile')}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#1c1c24] p-6 rounded-[10px]">
          <h3 className="font-epilogue font-semibold text-[16px] text-[#808191] mb-2">Total Campaigns</h3>
          <p className="font-epilogue font-bold text-[24px] text-white">{userStats.totalCampaigns}</p>
        </div>
        <div className="bg-[#1c1c24] p-6 rounded-[10px]">
          <h3 className="font-epilogue font-semibold text-[16px] text-[#808191] mb-2">Total Raised</h3>
          <p className="font-epilogue font-bold text-[24px] text-white">
            ${userStats.totalRaised.toLocaleString()}
          </p>
        </div>
        <div className="bg-[#1c1c24] p-6 rounded-[10px]">
          <h3 className="font-epilogue font-semibold text-[16px] text-[#808191] mb-2">Total Donations</h3>
          <p className="font-epilogue font-bold text-[24px] text-white">{userStats.totalDonations}</p>
        </div>
        <div className="bg-[#1c1c24] p-6 rounded-[10px]">
          <h3 className="font-epilogue font-semibold text-[16px] text-[#808191] mb-2">Success Rate</h3>
          <p className="font-epilogue font-bold text-[24px] text-white">
            {userStats.totalCampaigns > 0 ? Math.round((userStats.successfulCampaigns / userStats.totalCampaigns) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#1c1c24] rounded-[10px] p-6 mb-6">
        <div className="flex gap-2 mb-6">
          {['campaigns', 'donations', 'withdrawals', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-epilogue font-semibold capitalize ${
                activeTab === tab 
                  ? 'bg-[#1dc071] text-white' 
                  : 'bg-[#3a3a43] text-[#808191] hover:bg-[#2c2f36]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'campaigns' && (
          <DisplayCampaigns 
            title="My Campaigns"
            isLoading={isLoading}
            campaigns={campaigns}
          />
        )}

        {activeTab === 'donations' && (
          <div>
            <h3 className="font-epilogue font-bold text-[18px] text-white mb-4">Donation History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-[#3a3a43]">
                    <th className="text-left py-3 px-2">Campaign</th>
                    <th className="text-left py-3 px-2">Amount</th>
                    <th className="text-left py-3 px-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDonationHistory.map((donation) => (
                    <tr key={donation.id} className="border-b border-[#2c2f36]">
                      <td className="py-3 px-2">{donation.campaign}</td>
                      <td className="py-3 px-2 font-semibold">${donation.amount}</td>
                      <td className="py-3 px-2">{donation.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'withdrawals' && (
          <div>
            <h3 className="font-epilogue font-bold text-[18px] text-white mb-4">Withdrawal History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="border-b border-[#3a3a43]">
                    <th className="text-left py-3 px-2">Amount</th>
                    <th className="text-left py-3 px-2">Method</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockWithdrawals.map((withdrawal) => (
                    <tr key={withdrawal.id} className="border-b border-[#2c2f36]">
                      <td className="py-3 px-2 font-semibold">${withdrawal.amount}</td>
                      <td className="py-3 px-2">{withdrawal.method}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          withdrawal.status === 'Completed' ? 'bg-[#1dc071] text-white' : 'bg-[#f89e36] text-white'
                        }`}>
                          {withdrawal.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">{withdrawal.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h3 className="font-epilogue font-bold text-[18px] text-white mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue={userData.name}
                  className="w-full py-3 px-4 bg-[#2c2f36] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  className="w-full py-3 px-4 bg-[#2c2f36] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Bio</label>
                <textarea
                  defaultValue={userData.bio}
                  rows="3"
                  className="w-full py-3 px-4 bg-[#2c2f36] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Location</label>
                <input
                  type="text"
                  defaultValue={userData.location}
                  className="w-full py-3 px-4 bg-[#2c2f36] text-white rounded-lg border border-[#3a3a43] focus:border-[#1dc071] outline-none"
                />
              </div>
              <CustomButton
                btnType="button"
                title="Save Changes"
                styles="bg-[#1dc071] mt-4"
                handleClick={() => console.log('Save settings')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;