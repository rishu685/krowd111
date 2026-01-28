// Netlify Function for AI Chat Assistant
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI with API key from environment variables
let genAI;
try {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✅ Gemini AI initialized for Netlify function');
  }
} catch (error) {
  console.error('❌ Error initializing Gemini AI:', error.message);
}

// Fallback responses for when API is unavailable
const fallbackResponses = {
  campaign_creation: [
    "🚀 **Creating a successful campaign involves several key elements:**\n\n✅ **Clear, compelling title** - Make it memorable and specific\n✅ **Detailed description** - Tell your story authentically\n✅ **Realistic funding goal** - Research similar campaigns\n✅ **Attractive rewards/perks** - Give donors value\n✅ **High-quality images/videos** - Visual content drives engagement\n✅ **Regular updates** - Keep supporters engaged\n✅ **Social media promotion** - Share across platforms\n✅ **Personal network first** - Start with friends and family\n\n💡 **Pro tip:** Launch with 30% funding already secured to build momentum!",
    
    "💡 **Campaign Success Formula:**\n\n🎯 **Story First** - People donate to causes they connect with emotionally\n📊 **Smart Goal Setting** - Aim for 110% of actual needs (fees + extras)\n📅 **Timeline Planning** - 30-45 days is optimal for most campaigns\n🎁 **Reward Tiers** - Offer 3-5 meaningful reward levels\n📱 **Multi-channel Marketing** - Email, social media, press outreach\n🔄 **Momentum Building** - Front-load friends/family support\n\n**Remember:** First 48 hours and last 48 hours are crucial!"
  ],
  
  donation_help: [
    "💰 **Donation Process Made Simple:**\n\n1️⃣ **Browse Campaigns** - Find causes you care about\n2️⃣ **Choose Amount** - Any amount helps, even $5 makes a difference\n3️⃣ **Select Rewards** - Pick perks if available\n4️⃣ **Secure Checkout** - We use encrypted payment processing\n5️⃣ **Get Updates** - Receive progress updates from creators\n\n🔒 **Safe & Secure:** Your payment info is protected with bank-level encryption\n📧 **Stay Informed:** Get email updates on campaign progress\n🎁 **Claim Rewards:** Receive your perks when campaigns succeed",
    
    "🤝 **Making Your Donation Count:**\n\n✨ **Research First** - Read the full campaign story\n💝 **Consider Rewards** - Some campaigns offer cool perks\n📢 **Spread the Word** - Share campaigns you believe in\n⭐ **Leave Encouragement** - Comments motivate creators\n🔔 **Follow Progress** - Enable notifications for updates\n\n**Your support creates real change in the world! 🌟**"
  ],
  
  platform_features: [
    "🌟 **Krowd11 Platform Features:**\n\n🚀 **For Campaign Creators:**\n• Easy campaign setup wizard\n• Real-time analytics dashboard\n• Built-in social sharing tools\n• Secure payment processing\n• Supporter communication tools\n• Mobile-optimized campaigns\n\n💝 **For Supporters:**\n• Discover trending campaigns\n• Secure donation processing\n• Real-time campaign updates\n• Social sharing integration\n• Personal donation history\n• Reward/perk management",
    
    "⚡ **What Makes Krowd11 Special:**\n\n🛡️ **Security First** - Bank-level encryption for all transactions\n🌍 **Global Reach** - Support campaigns worldwide\n📱 **Mobile Ready** - Optimized for all devices\n💬 **Community Driven** - Built-in messaging and updates\n📊 **Transparent** - Real-time funding progress\n🎯 **Smart Matching** - AI-powered campaign discovery\n\n**Join thousands of creators and supporters making dreams reality!**"
  ]
};

// Enhanced fallback response system
const getFallbackResponse = (message) => {
  const msg = message.toLowerCase();
  
  if (msg.includes('campaign') && (msg.includes('create') || msg.includes('start') || msg.includes('launch') || msg.includes('successful'))) {
    return fallbackResponses.campaign_creation[Math.floor(Math.random() * fallbackResponses.campaign_creation.length)];
  }
  
  if (msg.includes('donat') || msg.includes('fund') || msg.includes('support') || msg.includes('contribute')) {
    return fallbackResponses.donation_help[Math.floor(Math.random() * fallbackResponses.donation_help.length)];
  }
  
  if (msg.includes('feature') || msg.includes('platform') || msg.includes('how') || msg.includes('what')) {
    return fallbackResponses.platform_features[Math.floor(Math.random() * fallbackResponses.platform_features.length)];
  }
  
  // Default comprehensive response
  return "🎯 **I'm here to help with Krowd11!**\n\n**I can assist you with:**\n🚀 **Campaign Creation** - Tips for successful fundraising\n💰 **Donation Process** - How to support amazing projects\n📊 **Platform Features** - Everything Krowd11 offers\n🎁 **Rewards & Perks** - Managing campaign incentives\n📈 **Marketing Tips** - Growing your campaign reach\n\n**What specific aspect would you like help with? Just ask! 😊**";
};

// Main chat function
const generateResponse = async (message, conversationHistory = []) => {
  console.log(`🤖 Generating AI response for: ${message.substring(0, 100)}...`);
  
  try {
    if (!genAI) {
      console.log('🔄 Gemini AI not available, using fallback response');
      return getFallbackResponse(message);
    }

    // Use Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build context from conversation history
    let context = "You are an AI assistant for Krowd11, a crowdfunding platform. ";
    context += "Help users with campaign creation, donations, platform features, and fundraising tips. ";
    context += "Be helpful, encouraging, and provide actionable advice. Use emojis and formatting to make responses engaging. ";
    
    if (conversationHistory.length > 0) {
      context += "\nConversation history:\n";
      conversationHistory.slice(-5).forEach(msg => {
        context += `${msg.role}: ${msg.content}\n`;
      });
    }
    
    context += `\nUser question: ${message}`;

    const result = await model.generateContent(context);
    const response = await result.response;
    const text = response.text();

    console.log(`✅ Generated AI response: ${text.substring(0, 100)}...`);
    return text;
    
  } catch (error) {
    console.error('❌ Gemini API Error:', error.message);
    console.log('🔄 Using fallback response system');
    return getFallbackResponse(message);
  }
};

// Netlify Function Handler
exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { message, conversationHistory = [] } = JSON.parse(event.body);
    
    console.log('📩 Received message:', message);
    console.log('💬 Conversation history length:', conversationHistory.length);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    const response = await generateResponse(message, conversationHistory);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        response,
        timestamp: new Date().toISOString()
      }),
    };

  } catch (error) {
    console.error('❌ Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        response: getFallbackResponse('help')
      }),
    };
  }
};