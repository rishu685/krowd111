import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "👋 Hi! I'm your Krowd11 AI assistant. I'm here to help you with campaign creation, donations, platform features, and fundraising tips. How can I assist you today?",
            timestamp: new Date().toISOString()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus();
        }
    }, [isOpen, isMinimized]);

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            role: 'user',
            content: inputMessage,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputMessage,
                    conversationHistory: messages.slice(-5) // Send last 5 messages for context
                })
            });

            const data = await response.json();
            
            if (data.success) {
                const assistantMessage = {
                    role: 'assistant',
                    content: data.response,
                    timestamp: new Date().toISOString()
                };
                setMessages(prev => [...prev, assistantMessage]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                role: 'assistant',
                content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment, or feel free to explore our platform features in the meantime!",
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const quickQuestions = [
        "How do I create a successful campaign?",
        "What fees does the platform charge?",
        "How do payments and withdrawals work?",
        "Tips for promoting my campaign?",
        "How to build trust with donors?"
    ];

    const handleQuickQuestion = (question) => {
        setInputMessage(question);
        inputRef.current?.focus();
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-50"
                title="Chat with AI Assistant"
            >
                <MessageCircle className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className={`fixed bottom-6 right-6 bg-[#1c1c24] border border-[#3a3a43] rounded-xl shadow-2xl z-50 transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#3a3a43] bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] rounded-t-xl">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Krowd11 AI Assistant</h3>
                        {isTyping && !isMinimized && (
                            <p className="text-white/80 text-xs">AI is typing...</p>
                        )}
                    </div>
                </div>
                
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="text-white/80 hover:text-white transition-colors p-1"
                        title={isMinimized ? "Expand chat" : "Minimize chat"}
                    >
                        {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/80 hover:text-white transition-colors p-1"
                        title="Close chat"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        message.role === 'user' 
                                            ? 'bg-gradient-to-r from-[#4f46e5] to-[#7c3aed]' 
                                            : 'bg-[#2c2c34]'
                                    }`}>
                                        {message.role === 'user' ? 
                                            <User className="w-4 h-4 text-white" /> : 
                                            <Bot className="w-4 h-4 text-[#4f46e5]" />
                                        }
                                    </div>
                                    
                                    <div className={`px-3 py-2 rounded-lg ${
                                        message.role === 'user'
                                            ? 'bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white'
                                            : 'bg-[#2c2c34] text-white'
                                    }`}>
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                        <span className="text-xs opacity-70 block mt-1">
                                            {new Date(message.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-start space-x-2">
                                    <div className="w-8 h-8 bg-[#2c2c34] rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-[#4f46e5]" />
                                    </div>
                                    <div className="bg-[#2c2c34] text-white px-3 py-2 rounded-lg">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-[#4f46e5] rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-[#4f46e5] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-[#4f46e5] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Questions */}
                    {messages.length <= 1 && (
                        <div className="px-4 pb-2">
                            <p className="text-[#808191] text-xs mb-2">Quick questions:</p>
                            <div className="flex flex-wrap gap-1">
                                {quickQuestions.slice(0, 3).map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickQuestion(question)}
                                        className="text-xs bg-[#2c2c34] text-[#4f46e5] px-2 py-1 rounded hover:bg-[#3c3c44] transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 border-t border-[#3a3a43]">
                        <div className="flex items-center space-x-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me about campaigns, donations, or platform features..."
                                className="flex-1 bg-[#2c2c34] text-white px-3 py-2 rounded-lg border border-[#3a3a43] focus:border-[#4f46e5] outline-none text-sm"
                                disabled={isTyping}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isTyping}
                                className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatAssistant;