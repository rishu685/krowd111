import React, { useState, useEffect } from 'react';
import { Hero, DisplayCampaigns, CustomButton } from '../components';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🎯' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'environment', name: 'Environment', icon: '🌱' },
    { id: 'community', name: 'Community', icon: '🤝' },
    { id: 'emergency', name: 'Emergency', icon: '🚨' },
    { id: 'animals', name: 'Animals', icon: '🐾' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'arts', name: 'Arts & Culture', icon: '🎨' }
  ];

  // Mock data - in a real app, this would come from the backend
  useEffect(() => {
    const mockCampaigns = [
      {
        id: 1,
        title: 'Help Build School in Rural Area',
        description: 'Building a school for underprivileged children in remote villages',
        target: 50000,
        amountCollected: 25000,
        owner: '0x123...abc',
        category: 'education',
        image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop',
        daysLeft: 45
      },
      {
        id: 2,
        title: 'Medical Aid for Cancer Patients',
        description: 'Emergency medical assistance for families battling cancer',
        target: 30000,
        amountCollected: 18500,
        owner: '0x456...def',
        category: 'healthcare',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
        daysLeft: 23
      },
      {
        id: 3,
        title: 'Clean Ocean Initiative',
        description: 'Help us clean the oceans and protect marine life',
        target: 75000,
        amountCollected: 45000,
        owner: '0x789...ghi',
        category: 'environment',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        daysLeft: 67
      },
      {
        id: 4,
        title: 'Community Center Renovation',
        description: 'Renovating our local community center for everyone to enjoy',
        target: 25000,
        amountCollected: 12000,
        owner: '0xabc...123',
        category: 'community',
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop',
        daysLeft: 31
      }
    ];

    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setFilteredCampaigns(mockCampaigns);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter campaigns based on category and search term
  useEffect(() => {
    let filtered = campaigns;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(campaign => campaign.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCampaigns(filtered);
  }, [campaigns, selectedCategory, searchTerm]);

  return (
    <div>
      <Hero />
      
      {/* Search Bar */}
      <div className="w-full flex justify-center mt-8 mb-6">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-4 px-6 pr-12 bg-[#1c1c24] text-white rounded-[10px] border border-[#3a3a43] focus:border-[#1dc071] outline-none text-[16px]"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="w-full mb-8">
        <h2 className="font-epilogue font-semibold text-[18px] text-white text-left mb-4">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-[10px] font-epilogue font-medium text-[14px] transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#1dc071] text-white'
                  : 'bg-[#1c1c24] text-[#808191] hover:bg-[#2c2f36]'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1c1c24] p-6 rounded-[10px]">
          <h3 className="font-epilogue font-semibold text-[16px] text-[#808191] mb-2">Active Campaigns</h3>
          <p className="font-epilogue font-bold text-[24px] text-white">{campaigns.length}</p>
        </div>
        <div className="bg-[#1c1c24] p-6 rounded-[10px]">
          <h3 className="font-epilogue font-semibold text-[16px] text-[#808191] mb-2">Total Raised</h3>
          <p className="font-epilogue font-bold text-[24px] text-white">
            ${campaigns.reduce((sum, c) => sum + c.amountCollected, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-[#1c1c24] p-6 rounded-[10px]">
          <h3 className="font-epilogue font-semibold text-[16px] text-[#808191] mb-2">Success Rate</h3>
          <p className="font-epilogue font-bold text-[24px] text-white">78%</p>
        </div>
        <div className="bg-[#1c1c24] p-6 rounded-[10px]">
          <h3 className="font-epilogue font-semibold text-[16px] text-[#808191] mb-2">Total Backers</h3>
          <p className="font-epilogue font-bold text-[24px] text-white">1,247</p>
        </div>
      </div>

      {/* Campaign Display */}
      <DisplayCampaigns 
        title={`${selectedCategory === 'all' ? 'All' : categories.find(c => c.id === selectedCategory)?.name} Campaigns (${filteredCampaigns.length})`}
        isLoading={isLoading}
        campaigns={filteredCampaigns}
      />

      {/* Call to Action */}
      <div className="bg-[#1c1c24] rounded-[10px] p-8 mt-8 text-center">
        <h3 className="font-epilogue font-bold text-[24px] text-white mb-4">
          Ready to Make a Difference?
        </h3>
        <p className="font-epilogue text-[16px] text-[#808191] mb-6 max-w-2xl mx-auto">
          Join thousands of people who are already creating positive change in the world. 
          Start your own campaign or support existing ones.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <CustomButton
            btnType="button"
            title="Start a Campaign"
            styles="bg-[#1dc071] min-w-[150px]"
            handleClick={() => window.location.href = '/create-campaign'}
          />
          <CustomButton
            btnType="button"
            title="Explore All Campaigns"
            styles="bg-[#8c6dfd] min-w-[150px]"
            handleClick={() => window.location.href = '/all-campaigns'}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;