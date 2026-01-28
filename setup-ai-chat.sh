#!/bin/bash

echo "🚀 Setting up Krowd11 AI Chat Assistant..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the krowd11 root directory"
    exit 1
fi

# Create .env file in server directory if it doesn't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env file..."
    cp server/.env.example server/.env
    echo "✅ Created server/.env file from template"
else
    echo "✅ server/.env file already exists"
fi

echo ""
echo "🔧 Setup Instructions:"
echo ""
echo "1. Get your Google Gemini API key:"
echo "   👉 Visit: https://makersuite.google.com/app/apikey"
echo "   👉 Create a new API key"
echo ""
echo "2. Update your API key in server/.env file:"
echo "   👉 Open: server/.env"
echo "   👉 Replace 'your_gemini_api_key_here' with your actual API key"
echo ""
echo "3. Install dependencies (if not already done):"
echo "   👉 npm install (in root directory)"
echo "   👉 cd client && npm install"
echo "   👉 cd ../server && npm install"
echo ""
echo "4. Start the application:"
echo "   👉 npm run dev (from root directory)"
echo ""
echo "🤖 AI Chat Assistant Features:"
echo "   ✨ Campaign creation guidance"
echo "   ✨ Donor support and FAQ"
echo "   ✨ Platform feature explanations"
echo "   ✨ Fundraising best practices"
echo "   ✨ Campaign analysis and optimization"
echo ""
echo "🎯 The chat assistant will appear as a floating button in the bottom-right corner"
echo "   of your application once you start the development server."
echo ""
echo "Happy fundraising! 🎉"