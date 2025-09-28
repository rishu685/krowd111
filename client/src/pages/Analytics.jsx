import React, { useState } from 'react';
import { CustomButton } from '../components';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Mock analytics data
  const analytics = {
    totalCampaigns: 42,
    totalRaised: '$127,350',
    totalDonors: 1247,
    successRate: 78,
    avgDonation: '$102',
    topCategories: [
      { name: 'Education', amount: '$45,230', campaigns: 12 },
      { name: 'Healthcare', amount: '$38,920', campaigns: 8 },
      { name: 'Environment', amount: '$25,100', campaigns: 15 },
      { name: 'Community', amount: '$18,100', campaigns: 7 }
    ],
    recentActivity: [
      { type: 'donation', amount: '$250', campaign: 'Help Build School', time: '2 hours ago' },
      { type: 'campaign_created', campaign: 'Save the Forest', time: '4 hours ago' },
      { type: 'donation', amount: '$100', campaign: 'Medical Aid Fund', time: '6 hours ago' },
      { type: 'milestone', campaign: 'Clean Water Project', milestone: '50% funded', time: '1 day ago' }
    ]
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 mb-6">
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Analytics Dashboard
          </h1>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mt-4">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                timeRange === range 
                  ? 'bg-[#1dc071] text-white' 
                  : 'bg-[#3a3a43] text-gray-300'
              }`}
            >
              {range === '7d' && 'Last 7 Days'}
              {range === '30d' && 'Last 30 Days'}
              {range === '90d' && 'Last 90 Days'}
              {range === '1y' && 'Last Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#1c1c24] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Total Campaigns</h3>
          <p className="text-3xl font-bold text-white">{analytics.totalCampaigns}</p>
          <p className="text-[#1dc071] text-sm mt-2">↑ 12% from last month</p>
        </div>
        
        <div className="bg-[#1c1c24] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Total Raised</h3>
          <p className="text-3xl font-bold text-white">{analytics.totalRaised}</p>
          <p className="text-[#1dc071] text-sm mt-2">↑ 24% from last month</p>
        </div>
        
        <div className="bg-[#1c1c24] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Total Donors</h3>
          <p className="text-3xl font-bold text-white">{analytics.totalDonors.toLocaleString()}</p>
          <p className="text-[#1dc071] text-sm mt-2">↑ 8% from last month</p>
        </div>
        
        <div className="bg-[#1c1c24] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-2">Success Rate</h3>
          <p className="text-3xl font-bold text-white">{analytics.successRate}%</p>
          <p className="text-[#f89e36] text-sm mt-2">↓ 3% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top Categories */}
        <div className="bg-[#1c1c24] p-6 rounded-lg">
          <h3 className="text-white font-semibold text-lg mb-4">Top Categories</h3>
          <div className="space-y-4">
            {analytics.topCategories.map((category, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{category.name}</p>
                  <p className="text-gray-400 text-sm">{category.campaigns} campaigns</p>
                </div>
                <div className="text-right">
                  <p className="text-[#1dc071] font-semibold">{category.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1c1c24] p-6 rounded-lg">
          <h3 className="text-white font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-2 ${
                  activity.type === 'donation' ? 'bg-[#1dc071]' :
                  activity.type === 'campaign_created' ? 'bg-[#8c6dfd]' :
                  'bg-[#f89e36]'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white text-sm">
                    {activity.type === 'donation' && `New donation of ${activity.amount} to ${activity.campaign}`}
                    {activity.type === 'campaign_created' && `New campaign created: ${activity.campaign}`}
                    {activity.type === 'milestone' && `${activity.campaign} reached ${activity.milestone}`}
                  </p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-[#1c1c24] p-6 rounded-lg">
        <h3 className="text-white font-semibold text-lg mb-4">Funding Trends</h3>
        <div className="h-64 bg-[#2c2f36] rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;