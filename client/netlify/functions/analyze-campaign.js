// Netlify Function for AI Campaign Analysis
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
let genAI;
try {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✅ Gemini AI initialized for campaign analysis function');
  }
} catch (error) {
  console.error('❌ Error initializing Gemini AI:', error.message);
}

// Fallback analysis
const getFallbackAnalysis = (campaignData) => {
  const { title, description, goal, category } = campaignData;
  
  return {
    overallScore: 75,
    strengths: [
      "Clear campaign structure",
      "Defined funding goal",
      "Relevant category selection"
    ],
    improvements: [
      "Add more compelling storytelling elements",
      "Include detailed budget breakdown",
      "Add social proof and testimonials",
      "Create urgency with timeline",
      "Expand marketing strategy"
    ],
    suggestions: [
      "🎯 **Title Optimization**: Make it more specific and action-oriented",
      "📝 **Story Enhancement**: Add personal connection and emotional appeal", 
      "💰 **Goal Justification**: Break down how funds will be used",
      "📸 **Visual Content**: Add high-quality images or videos",
      "🎁 **Reward Structure**: Create compelling incentive tiers",
      "📱 **Social Strategy**: Plan multi-channel promotion approach"
    ],
    recommendedActions: [
      "Revise campaign title for maximum impact",
      "Expand story with personal details",
      "Add budget transparency section",
      "Create reward/perk structure",
      "Develop launch marketing plan"
    ]
  };
};

// AI Campaign Analysis
const analyzeCampaign = async (campaignData) => {
  console.log('🔍 Analyzing campaign data...');
  
  try {
    if (!genAI) {
      console.log('🔄 Using fallback analysis');
      return getFallbackAnalysis(campaignData);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `As a crowdfunding expert, analyze this campaign and provide detailed feedback:

Campaign Title: ${campaignData.title}
Description: ${campaignData.description}
Funding Goal: $${campaignData.goal}
Category: ${campaignData.category}

Please provide:
1. Overall score (1-100)
2. Top 3 strengths
3. Top 5 areas for improvement
4. Specific actionable suggestions
5. Recommended next actions

Format as JSON with keys: overallScore, strengths, improvements, suggestions, recommendedActions`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON, fallback if it fails
    try {
      const analysis = JSON.parse(text);
      console.log('✅ AI analysis generated successfully');
      return analysis;
    } catch (parseError) {
      console.log('🔄 AI response not JSON, using structured fallback');
      return getFallbackAnalysis(campaignData);
    }
    
  } catch (error) {
    console.error('❌ Campaign analysis error:', error.message);
    return getFallbackAnalysis(campaignData);
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
    const campaignData = JSON.parse(event.body);
    
    console.log('📊 Received campaign analysis request');

    if (!campaignData.title || !campaignData.description) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Title and description are required' }),
      };
    }

    const analysis = await analyzeCampaign(campaignData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        analysis,
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
        analysis: getFallbackAnalysis({ title: 'Campaign', description: 'Description', goal: 1000, category: 'General' })
      }),
    };
  }
};