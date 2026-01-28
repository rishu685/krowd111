import React, { useState } from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle, Target } from 'lucide-react';

const CampaignAnalyzer = ({ campaignData, onAnalysisComplete }) => {
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState(null);

    const analyzeCampaign = async () => {
        if (!campaignData) {
            setError('Campaign data is required for analysis');
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            // Use Netlify function in production, local API in development
            const apiUrl = window.location.hostname === 'localhost' 
                ? '/api/chat/analyze-campaign' 
                : '/.netlify/functions/analyze-campaign';
                
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(campaignData)
            });

            const data = await response.json();
            
            // Handle both local API response format and Netlify function format
            if (data.analysis || data.success) {
                setAnalysis(data.analysis);
                onAnalysisComplete?.(data.analysis);
            } else {
                throw new Error(data.error || 'Analysis failed');
            }
        } catch (err) {
            console.error('Campaign analysis error:', err);
            setError('Failed to analyze campaign. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 8) return 'text-green-400';
        if (score >= 6) return 'text-yellow-400';
        return 'text-red-400';
    };

    const parseAnalysis = (analysisText) => {
        // Simple parsing logic - you can enhance this based on AI response format
        const lines = analysisText.split('\n');
        const parsed = {
            titleScore: null,
            suggestions: [],
            successProbability: null
        };

        lines.forEach(line => {
            if (line.includes('Title effectiveness') || line.includes('score')) {
                const match = line.match(/(\d+(?:\.\d+)?)/);
                if (match) parsed.titleScore = parseFloat(match[1]);
            }
            if (line.includes('Success probability') || line.includes('%')) {
                const match = line.match(/(\d+(?:\.\d+)?)%?/);
                if (match) parsed.successProbability = parseFloat(match[1]);
            }
            if (line.startsWith('-') || line.startsWith('•') || line.match(/^\d+\./)) {
                parsed.suggestions.push(line.replace(/^[-•\d\.]\s*/, ''));
            }
        });

        return parsed;
    };

    const parsedAnalysis = analysis ? parseAnalysis(analysis) : null;

    return (
        <div className="bg-[#1c1c24] border border-[#3a3a43] rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold">AI Campaign Analysis</h3>
                        <p className="text-[#808191] text-sm">Get insights to optimize your campaign</p>
                    </div>
                </div>

                <button
                    onClick={analyzeCampaign}
                    disabled={isAnalyzing || !campaignData}
                    className="bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                >
                    {isAnalyzing ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Analyzing...</span>
                        </>
                    ) : (
                        <>
                            <TrendingUp className="w-4 h-4" />
                            <span>Analyze Campaign</span>
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {analysis && (
                <div className="space-y-4">
                    {/* Quick Metrics */}
                    {parsedAnalysis && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {parsedAnalysis.titleScore && (
                                <div className="bg-[#2c2c34] p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#808191] text-sm">Title Score</span>
                                        <Target className="w-4 h-4 text-[#4f46e5]" />
                                    </div>
                                    <p className={`text-2xl font-bold ${getScoreColor(parsedAnalysis.titleScore)}`}>
                                        {parsedAnalysis.titleScore}/10
                                    </p>
                                </div>
                            )}

                            {parsedAnalysis.successProbability && (
                                <div className="bg-[#2c2c34] p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#808191] text-sm">Success Rate</span>
                                        <TrendingUp className="w-4 h-4 text-[#4f46e5]" />
                                    </div>
                                    <p className={`text-2xl font-bold ${getScoreColor(parsedAnalysis.successProbability / 10)}`}>
                                        {parsedAnalysis.successProbability}%
                                    </p>
                                </div>
                            )}

                            <div className="bg-[#2c2c34] p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-[#808191] text-sm">Suggestions</span>
                                    <CheckCircle className="w-4 h-4 text-[#4f46e5]" />
                                </div>
                                <p className="text-2xl font-bold text-[#4f46e5]">
                                    {parsedAnalysis.suggestions.length}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Full Analysis */}
                    <div className="bg-[#2c2c34] p-4 rounded-lg">
                        <h4 className="text-white font-semibold mb-3">Detailed Analysis</h4>
                        <div className="text-[#808191] text-sm whitespace-pre-wrap">
                            {analysis}
                        </div>
                    </div>

                    {/* Action Items */}
                    {parsedAnalysis?.suggestions.length > 0 && (
                        <div className="bg-[#2c2c34] p-4 rounded-lg">
                            <h4 className="text-white font-semibold mb-3">Recommended Actions</h4>
                            <ul className="space-y-2">
                                {parsedAnalysis.suggestions.slice(0, 5).map((suggestion, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-[#808191] text-sm">{suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {!analysis && !isAnalyzing && !error && (
                <div className="text-center py-8">
                    <Brain className="w-12 h-12 text-[#4f46e5] mx-auto mb-3" />
                    <p className="text-[#808191] mb-4">
                        Click "Analyze Campaign" to get AI-powered insights and suggestions for your campaign.
                    </p>
                    <p className="text-[#606070] text-sm">
                        Our AI will analyze your title, description, funding goal, and provide actionable recommendations.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CampaignAnalyzer;