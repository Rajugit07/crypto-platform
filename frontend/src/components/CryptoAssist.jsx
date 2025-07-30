import axios from "axios";
import React, { useState } from "react";
import { Send, Square, Trash2, MessageCircle, Bot, User, Zap } from "lucide-react";

const CryptoList = () => {
    const [input, setInput] = useState("");
    const [conversation, setConversation] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingInterval, setTypingInterval] = useState(null);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    // Function to simulate typing effect
    const typeText = (text, callback) => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            setConversation((prev) => {
                const updatedConversation = [...prev];
                updatedConversation[
                    updatedConversation.length - 1
                ] = `AI: ${text.substring(0, currentIndex + 1)}`;
                return updatedConversation;
            });

            currentIndex++;

            if (currentIndex === text.length) {
                clearInterval(interval);
                callback();
            }
        }, 20);

        setTypingInterval(interval);
    };

    // Function to stop the typing effect
    const stopTyping = () => {
        if (typingInterval) {
            clearInterval(typingInterval);
            setIsTyping(false);
            setTypingInterval(null);
        }
    };

    // Function to handle the prompt and send request to the backend
    const promptHandler = async () => {
        if (!input.trim()) return;

        stopTyping();

        try {
            setConversation((prev) => [...prev, `User: ${input}`]);
            setInput("");
            setIsTyping(true);

            const res = await axios.post(
                `${apiUrl}/api/chat`,
                { input },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            typeText(res.data.reply, () => {
                setIsTyping(false);
            });
        } catch (error) {
            console.log(error);
            setIsTyping(false);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            promptHandler();
        }
    };

    // Function to clear the conversation history
    const clearConversation = () => {
        setConversation([]);
        stopTyping();
    };

    // Format conversation for better display
    const formatConversation = () => {
        return conversation.map((message, index) => {
            const isUser = message.startsWith('User:');
            const content = message.replace(/^(User:|AI:)\s*/, '');

            return (
                <div
                    key={index}
                    className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {!isUser && (
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                    )}
                    <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                            isUser
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                                : 'bg-black/40 backdrop-blur-lg border border-purple-500/30 text-gray-200'
                        } shadow-lg`}
                    >
                        <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                            {content}
                        </p>
                    </div>
                    {isUser && (
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-15">
            <div className="flex flex-col items-center justify-center w-full max-w-6xl">
                {/* Title Section */}
                <div className="text-center mb-8 lg:mb-12">
                    <div className="inline-flex items-center mb-6 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                            <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            CryptoChat AI
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 leading-tight">
                        Chat With AI
                        <br />
                        <span className="relative text-3xl sm:text-4xl lg:text-5xl">
                            Assistant
                            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg animate-pulse"></div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Get instant answers about cryptocurrency, market analysis, and trading insights powered by AI
                    </p>
                </div>

                {/* Chat Container */}
                <div className="w-full max-w-4xl mb-6 lg:mb-10">
                    <div className="relative bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 overflow-hidden">
                        <div className="h-[50vh] sm:h-[55vh] lg:h-[60vh] p-4 sm:p-6 overflow-y-auto scrollbar-hide">
                            {conversation.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
                                        <MessageCircle className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                        Start a conversation
                                    </h3>
                                    <p className="text-gray-400 max-w-md">
                                        Ask me anything about cryptocurrency, market trends, or trading strategies!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {formatConversation()}
                                </div>
                            )}
                        </div>

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-black/60 backdrop-blur-lg px-4 py-2 rounded-full border border-purple-500/30">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-xs text-gray-300">AI is thinking...</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Section */}
                <div className="w-full max-w-4xl">
                    {/* Input Field */}
                    <div className="relative mb-6">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Ask me about crypto markets, prices, or trading..."
                                className="w-full border border-purple-500/30 rounded-2xl outline-none px-6 py-4 sm:py-5 text-sm sm:text-base bg-black/30 backdrop-blur-lg text-white placeholder-gray-400 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300 pr-14 sm:pr-6"
                                value={input}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                disabled={isTyping}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>

                            {/* Send button inside input on mobile */}
                            <button
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-purple-400 hover:text-cyan-400 transition-colors sm:hidden disabled:opacity-50"
                                onClick={promptHandler}
                                disabled={isTyping || !input.trim()}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Button Layout */}
                    <div className="hidden sm:flex gap-4 justify-center">
                        <button
                            className="group relative flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            onClick={promptHandler}
                            disabled={isTyping || !input.trim()}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isTyping ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                                Send Message
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                        </button>

                        {/* Stop button appears only when AI is typing */}
                        {isTyping && (
                            <button
                                className="flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-red-500/80 backdrop-blur-lg rounded-xl text-white font-semibold shadow-lg hover:bg-red-500 transition-all duration-300 border border-red-500/30"
                                onClick={stopTyping}
                            >
                                <Square className="w-4 h-4" />
                                Stop
                            </button>
                        )}

                        {/* Clear button */}
                        <button
                            className="flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl text-gray-300 font-semibold shadow-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
                            onClick={clearConversation}
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear Chat
                        </button>
                    </div>

                    {/* Mobile Button Layout */}
                    <div className="sm:hidden flex flex-col gap-3">
                        {/* Stop button appears only when AI is typing */}
                        {isTyping && (
                            <button
                                className="flex items-center justify-center gap-2 w-full py-4 bg-red-500/80 backdrop-blur-lg rounded-xl text-white font-semibold shadow-lg active:bg-red-500 transition-all duration-300 border border-red-500/30"
                                onClick={stopTyping}
                            >
                                <Square className="w-4 h-4" />
                                Stop AI Response
                            </button>
                        )}

                        {/* Clear button */}
                        <button
                            className="flex items-center justify-center gap-2 w-full py-4 bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl text-gray-300 font-semibold shadow-lg active:bg-purple-500/10 transition-all duration-300"
                            onClick={clearConversation}
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear Conversation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoList;
