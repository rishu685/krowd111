// server/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock database
let campaigns = [
  {
    id: 1,
    title: 'Help Build School',
    description: 'Building a school for underprivileged children',
    target: 50000,
    raised: 25000,
    creator: 'John Doe',
    category: 'Education',
    status: 'active',
    created_at: new Date().toISOString(),
    image: 'https://via.placeholder.com/400x300'
  },
  {
    id: 2,
    title: 'Medical Aid Fund',
    description: 'Emergency medical assistance for families in need',
    target: 20000,
    raised: 8500,
    creator: 'Jane Smith',
    category: 'Healthcare',
    status: 'active',
    created_at: new Date().toISOString(),
    image: 'https://via.placeholder.com/400x300'
  }
];

let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    walletAddress: '0x123...',
    campaigns: 3,
    totalRaised: 45000,
    status: 'active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    walletAddress: '0x456...',
    campaigns: 1,
    totalRaised: 8500,
    status: 'active'
  }
];

let payments = [
  {
    id: 1,
    campaignId: 1,
    donor: 'Anonymous',
    amount: 500,
    method: 'credit_card',
    status: 'completed',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    campaignId: 2,
    donor: 'Sarah Wilson',
    amount: 250,
    method: 'paypal',
    status: 'pending',
    created_at: new Date().toISOString()
  }
];

let withdrawals = [
  {
    id: 1,
    userId: 1,
    amount: 1250,
    method: 'bank_transfer',
    status: 'completed',
    created_at: new Date().toISOString(),
    processed_at: new Date().toISOString()
  }
];

// Routes

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Krowd11 Backend API is running!', version: '1.0.0' });
});

// Campaign routes
app.get('/api/campaigns', (req, res) => {
  const { category, status, search } = req.query;
  let filteredCampaigns = campaigns;

  if (category) {
    filteredCampaigns = filteredCampaigns.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }

  if (status) {
    filteredCampaigns = filteredCampaigns.filter(c => c.status === status);
  }

  if (search) {
    filteredCampaigns = filteredCampaigns.filter(c => 
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filteredCampaigns);
});

app.get('/api/campaigns/:id', (req, res) => {
  const campaign = campaigns.find(c => c.id === parseInt(req.params.id));
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }
  res.json(campaign);
});

app.post('/api/campaigns', (req, res) => {
  const { title, description, target, creator, category } = req.body;
  
  if (!title || !description || !target || !creator) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newCampaign = {
    id: campaigns.length + 1,
    title,
    description,
    target: parseFloat(target),
    raised: 0,
    creator,
    category: category || 'Other',
    status: 'active',
    created_at: new Date().toISOString(),
    image: 'https://via.placeholder.com/400x300'
  };

  campaigns.push(newCampaign);
  res.status(201).json(newCampaign);
});

app.put('/api/campaigns/:id', (req, res) => {
  const campaignIndex = campaigns.findIndex(c => c.id === parseInt(req.params.id));
  if (campaignIndex === -1) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  campaigns[campaignIndex] = { ...campaigns[campaignIndex], ...req.body };
  res.json(campaigns[campaignIndex]);
});

app.delete('/api/campaigns/:id', (req, res) => {
  const campaignIndex = campaigns.findIndex(c => c.id === parseInt(req.params.id));
  if (campaignIndex === -1) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  campaigns.splice(campaignIndex, 1);
  res.json({ message: 'Campaign deleted successfully' });
});

// User routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email, walletAddress } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    walletAddress: walletAddress || null,
    campaigns: 0,
    totalRaised: 0,
    status: 'active'
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Payment routes
app.get('/api/payments', (req, res) => {
  res.json(payments);
});

app.post('/api/payments', (req, res) => {
  const { campaignId, donor, amount, method, paymentData } = req.body;
  
  if (!campaignId || !amount || !method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Find the campaign
  const campaign = campaigns.find(c => c.id === parseInt(campaignId));
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const newPayment = {
    id: payments.length + 1,
    campaignId: parseInt(campaignId),
    donor: donor || 'Anonymous',
    amount: parseFloat(amount),
    method,
    status: 'pending',
    created_at: new Date().toISOString(),
    paymentData
  };

  payments.push(newPayment);

  // Update campaign raised amount (simulate successful payment)
  setTimeout(() => {
    campaign.raised += parseFloat(amount);
    newPayment.status = 'completed';
  }, 2000);

  res.status(201).json(newPayment);
});

// Withdrawal routes
app.get('/api/withdrawals', (req, res) => {
  res.json(withdrawals);
});

app.post('/api/withdrawals', (req, res) => {
  const { userId, amount, method, accountDetails } = req.body;
  
  if (!userId || !amount || !method || !accountDetails) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newWithdrawal = {
    id: withdrawals.length + 1,
    userId: parseInt(userId),
    amount: parseFloat(amount),
    method,
    accountDetails,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  withdrawals.push(newWithdrawal);
  res.status(201).json(newWithdrawal);
});

// Analytics routes
app.get('/api/analytics', (req, res) => {
  const totalCampaigns = campaigns.length;
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalUsers = users.length;
  const completedCampaigns = campaigns.filter(c => c.raised >= c.target).length;
  const successRate = totalCampaigns > 0 ? Math.round((completedCampaigns / totalCampaigns) * 100) : 0;

  const analytics = {
    totalCampaigns,
    totalRaised,
    totalUsers,
    successRate,
    avgDonation: payments.length > 0 ? Math.round(payments.reduce((sum, p) => sum + p.amount, 0) / payments.length) : 0,
    recentPayments: payments.slice(-5).reverse(),
    topCategories: campaigns.reduce((acc, campaign) => {
      const category = campaign.category;
      if (!acc[category]) {
        acc[category] = { name: category, amount: 0, campaigns: 0 };
      }
      acc[category].amount += campaign.raised;
      acc[category].campaigns += 1;
      return acc;
    }, {})
  };

  res.json(analytics);
});

// Admin routes
app.get('/api/admin/overview', (req, res) => {
  res.json({
    campaigns: campaigns.slice(0, 10),
    users: users.slice(0, 10),
    payments: payments.slice(0, 10),
    stats: {
      totalCampaigns: campaigns.length,
      totalUsers: users.length,
      totalPayments: payments.length,
      totalWithdrawals: withdrawals.length
    }
  });
});

app.put('/api/admin/campaigns/:id/status', (req, res) => {
  const { status } = req.body;
  const campaignIndex = campaigns.findIndex(c => c.id === parseInt(req.params.id));
  
  if (campaignIndex === -1) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  campaigns[campaignIndex].status = status;
  res.json(campaigns[campaignIndex]);
});

app.put('/api/admin/users/:id/status', (req, res) => {
  const { status } = req.body;
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users[userIndex].status = status;
  res.json(users[userIndex]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/campaigns');
  console.log('- POST /api/campaigns');
  console.log('- GET /api/users');
  console.log('- POST /api/payments');
  console.log('- GET /api/analytics');
  console.log('- GET /api/admin/overview');
});