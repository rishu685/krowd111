// AI Chat Service for Gemini Integration
const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiChatService {
    constructor() {
        // Initialize Gemini AI
        this.apiKey = process.env.GEMINI_API_KEY;
        
        if (!this.apiKey || this.apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
            console.error('❌ Gemini API key not found. Please set GEMINI_API_KEY in .env file');
            this.isConfigured = false;
            return;
        }
        
        try {
            this.genAI = new GoogleGenerativeAI(this.apiKey);
            this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
            this.isConfigured = true;
            console.log('✅ Gemini AI Chat Service initialized successfully');
            console.log('🔑 API Key (first 20 chars):', this.apiKey.substring(0, 20) + '...');
        } catch (error) {
            console.error('❌ Failed to initialize Gemini AI:', error.message);
            this.isConfigured = false;
        }
        
        // System prompt for crowdfunding context
        this.systemPrompt = `You are an AI assistant for Krowd11, a crowdfunding platform. Your role is to help users with:

1. Campaign creation guidance (titles, descriptions, funding goals)
2. Donor support and questions about campaigns
3. Platform features explanation
4. Fundraising best practices and tips
5. Security and trust-related concerns
6. General crowdfunding advice

Keep responses helpful, concise, and focused on crowdfunding. If asked about topics outside crowdfunding, politely redirect to platform-related help.

Current platform features:
- Create and manage campaigns
- Donate to campaigns
- Analytics dashboard
- Payment methods integration
- Admin panel for oversight
- Profile management

Always be encouraging and supportive, as users may be dealing with personal or urgent fundraising needs.`;
    }

    async generateResponse(userMessage, conversationHistory = []) {
        // Check if service is properly configured
        if (!this.isConfigured) {
            console.log('⚠️ Gemini service not configured, using fallback');
            return this.getFallbackResponse(userMessage);
        }

        try {
            console.log('🤖 Generating AI response for:', userMessage.substring(0, 50) + '...');
            
            // Build conversation context
            const contextMessages = conversationHistory
                .slice(-3) // Keep last 3 messages for context
                .filter(msg => msg && msg.role && msg.content)
                .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
                .join('\n');

            const prompt = `${this.systemPrompt}

${contextMessages ? `Recent conversation:\n${contextMessages}\n` : ''}User question: ${userMessage}

Please provide a helpful, friendly response focused on crowdfunding:`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            console.log('✅ AI response generated successfully');
            return text;
        } catch (error) {
            console.error('❌ Gemini API Error:', error.message);
            if (error.message.includes('API_KEY')) {
                console.error('🔑 API Key issue - please check your GEMINI_API_KEY');
            }
            return this.getFallbackResponse(userMessage);
        }
    }

    getFallbackResponse(userMessage) {
        console.log('🔄 Using fallback response system');
        
        const message = userMessage.toLowerCase();
        
        // Enhanced fallback responses with more specific guidance
        if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
            return "👋 Hi there! I'm here to help you succeed with your crowdfunding journey on Krowd11. I can assist with campaign creation, donation guidance, platform features, and fundraising best practices. What would you like to know?";
        }
        
        if (message.includes('campaign') && message.includes('create')) {
            return "🚀 Creating a successful campaign involves several key elements:\n\n✅ **Clear, compelling title** - Make it specific and emotional\n✅ **Detailed story** - Explain the problem and your solution\n✅ **Realistic funding goal** - Research similar campaigns\n✅ **High-quality images/video** - Visual content is crucial\n✅ **Regular updates** - Keep supporters engaged\n✅ **Social sharing** - Leverage your network\n\nWould you like specific tips on any of these areas?";
        }
        
        if (message.includes('title') || message.includes('headline')) {
            return "✨ **Great campaign titles:**\n• Be specific about your cause\n• Include emotional words\n• Mention the impact\n• Keep it under 60 characters\n\n**Examples:**\n• 'Help Sarah Fight Cancer - Emergency Medical Fund'\n• 'Solar Panels for Rural School - Clean Energy for Kids'\n• 'Wheelchair Ramp for Elderly Community Center'\n\nWhat's your campaign about?";
        }
        
        if (message.includes('goal') || message.includes('target') || message.includes('amount')) {
            return "🎯 **Setting your funding goal:**\n\n📊 Research similar campaigns in your category\n💰 Calculate actual costs (include fees ~3-5%)\n⚡ Consider setting a slightly lower goal to build momentum\n🔥 You can always exceed your goal!\n\n**Tips:**\n• $5,000-$10,000 goals often perform well\n• Break down costs for transparency\n• Explain exactly how funds will be used";
        }
        
        if (message.includes('promote') || message.includes('share') || message.includes('marketing')) {
            return "📢 **Campaign promotion strategies:**\n\n🌟 **Start with your inner circle** - family, friends, colleagues\n📱 **Social media** - Facebook, Twitter, Instagram, LinkedIn\n📧 **Email outreach** - personal messages work better\n📰 **Local media** - contact newspapers, blogs, radio\n🤝 **Community groups** - relevant organizations, forums\n💌 **Thank and update** - keep supporters engaged\n\nWhich channel would you like to focus on first?";
        }
        
        if (message.includes('fee') || message.includes('cost') || message.includes('charge')) {
            return "💳 **Krowd11 Platform Fees:**\n\n• Platform fee: 2.9% + $0.30 per transaction\n• Payment processing is handled securely\n• No hidden fees or setup costs\n• Fees are only charged on successful donations\n• You keep 97%+ of donations after fees\n\n**Why fees exist:** They help maintain the platform, security, customer support, and payment processing. Most donors expect and understand these standard rates.";
        }
        
        if (message.includes('trust') || message.includes('credible') || message.includes('legitimate')) {
            return "🛡️ **Building trust with donors:**\n\n✅ **Complete your profile** - real photo, full name, verification\n✅ **Tell your story authentically** - be personal and honest\n✅ **Provide documentation** - photos, receipts, medical records\n✅ **Regular updates** - show progress and transparency\n✅ **Thank donors publicly** - build community\n✅ **Link social media** - show you're a real person\n✅ **Start with smaller goals** - prove you can deliver\n\nTrust is the foundation of successful crowdfunding!";
        }
        
        if (message.includes('donate') || message.includes('donation') || message.includes('give')) {
            return "❤️ **Making donations on Krowd11:**\n\n• Browse campaigns by category or search\n• Read the full campaign story\n• Check campaign updates and progress\n• Donate securely with card or digital wallet\n• Get email receipts automatically\n• Follow campaigns for updates\n• Share campaigns you support\n\n**Donor tip:** Even small donations help! Many successful campaigns are funded by lots of small contributions rather than a few large ones.";
        }
        
        if (message.includes('withdraw') || message.includes('payout') || message.includes('money')) {
            return "💸 **Withdrawing your funds:**\n\n✅ Funds are available after campaign milestones\n✅ Bank transfers typically take 2-5 business days\n✅ You'll need to verify your identity first\n✅ Provide tax information as required\n✅ Keep records for tax purposes\n\n**Important:** Use funds exactly as described in your campaign to maintain trust with donors.";
        }
        
        // Default comprehensive response
        return "🤝 I'm here to help with your crowdfunding success! Here's what I can assist with:\n\n🎯 **Campaign Creation:** titles, descriptions, goals, images\n💰 **Fundraising Tips:** promotion, social sharing, donor engagement\n🛡️ **Trust & Security:** verification, transparency, best practices\n💳 **Platform Features:** payments, fees, withdrawals, analytics\n❓ **General Support:** campaign management, donor questions\n\nJust ask me anything specific about crowdfunding - I'm here to help you succeed! 🚀";
    }

    async analyzeCampaign(campaignData) {
        try {
            const analysisPrompt = `Analyze this crowdfunding campaign and provide suggestions for improvement:

Campaign Title: ${campaignData.title}
Description: ${campaignData.description}
Funding Goal: $${campaignData.target}
Category: ${campaignData.category}

Please provide:
1. Title effectiveness (1-10 score)
2. Description quality assessment
3. Funding goal reasonability
4. Suggestions for improvement
5. Success probability estimate

Keep suggestions practical and actionable.`;

            const result = await this.model.generateContent(analysisPrompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Campaign analysis error:', error);
            return "I'd be happy to review your campaign! For a strong campaign: use clear, compelling titles; detailed descriptions explaining the need and impact; realistic funding goals; and high-quality images. Consider adding updates and engaging with your supporters regularly.";
        }
    }
}

module.exports = GeminiChatService;