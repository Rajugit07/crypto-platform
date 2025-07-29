import axios from "axios";
import React, { useState } from "react";
import { FiSend, FiTrash2, FiSquare } from "react-icons/fi";

const CryptoList = () => {
    const [input, setInput] = useState("");
    const [conversation, setConversation] = useState([]); // Store conversation history
    const [isTyping, setIsTyping] = useState(false); // Track typing state
    const [typingInterval, setTypingInterval] = useState(null); // Track typing interval ID
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
                clearInterval(interval); // Stop typing effect when done
                callback(); // Callback to change typing status
            }
        }, 20); // Adjust speed of typing by changing the interval

        setTypingInterval(interval); // Save interval ID
    };

    // Function to stop the typing effect
    const stopTyping = () => {
        if (typingInterval) {
            clearInterval(typingInterval); // Stop the typing interval
            setIsTyping(false); // Reset typing state
            setTypingInterval(null); // Reset interval ID
        }
    };

    // Function to handle the prompt and send request to the backend
    const promptHandler = async () => {
        if (!input.trim()) return; // Don't send empty messages

        stopTyping(); // Stop typing immediately if a new request is made

        try {
            // Add the user's input to the conversation
            setConversation((prev) => [...prev, `User: ${input}`]);
            setInput(""); // Clear input field

            // Simulate AI typing by setting isTyping to true
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
            // Simulate typing the AI response
            typeText(res.data.reply, () => {
                setIsTyping(false); // Reset typing status
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
        setConversation([]); // Reset conversation history
        stopTyping(); // Stop any ongoing typing
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 lg:py-15">
            <div className="flex flex-col items-center justify-center w-full max-w-6xl">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-center mb-6 lg:mb-10 text-white">
                    Chat With AI
                </h1>

                {/* Chat Container */}
                <div className="w-full max-w-4xl mb-6 lg:mb-10 bg">
                    <div className="relative">
                        <textarea
                            className="w-full h-[50vh] sm:h-[55vh] lg:h-[60vh] text-sm sm:text-base lg:text-xl border border-zinc-800 outline-none p-4 sm:p-6 shadow-lg scrollbar-hide rounded-2xl bg-black resize-none focus:border-zinc-600 transition-colors"
                            value={conversation.join("\n")} // Display conversation history
                            readOnly
                            placeholder="Your conversation will appear here..."
                        />

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-xs text-gray-600">AI is typing...</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Section */}
                <div className="w-full max-w-4xl">
                    {/* Input Field */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="How can I help you..."
                            className="w-full border border-zinc-800 rounded-xl outline-none px-4 py-3 sm:py-4 text-sm sm:text-base shadow-lg focus:border-zinc-600 transition-colors pr-12"
                            value={input}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            disabled={isTyping}
                        />
                        {/* Send button inside input on mobile */}
                        <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-zinc-600 hover:text-black transition-colors sm:hidden"
                            onClick={promptHandler}
                            disabled={isTyping || !input.trim()}
                        >
                            <FiSend className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Desktop Button Layout */}
                    <div className="hidden sm:flex gap-3 lg:gap-5 justify-center">
                        <button
                            className="flex items-center gap-2 px-6 lg:px-8 py-2 lg:py-3 bg-black rounded-md text-white shadow-xl cursor-pointer hover:opacity-50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={promptHandler}
                            disabled={isTyping || !input.trim()}
                        >
                            <FiSend className="w-4 h-4" />
                            Send
                        </button>

                        {/* Stop button appears only when AI is typing */}
                        {isTyping && (
                            <button
                                className="flex items-center gap-2 px-6 lg:px-8 py-2 lg:py-3 bg-red-500 rounded-md text-white shadow-xl cursor-pointer hover:opacity-80 transition duration-300"
                                onClick={stopTyping}
                            >
                                <FiSquare className="w-4 h-4" />
                                Stop
                            </button>
                        )}

                        {/* Clear button to reset conversation */}
                        <button
                            className="flex items-center gap-2 px-6 lg:px-8 py-2 lg:py-3 bg-gray-500 rounded-md text-white shadow-xl cursor-pointer hover:opacity-80 transition duration-300"
                            onClick={clearConversation}
                        >
                            <FiTrash2 className="w-4 h-4" />
                            Clear
                        </button>
                    </div>

                    {/* Mobile Button Layout */}
                    <div className="sm:hidden flex flex-col gap-3">
                        {/* Stop button appears only when AI is typing */}
                        {isTyping && (
                            <button
                                className="flex items-center justify-center gap-2 w-full py-3 bg-red-500 rounded-xl text-white shadow-xl cursor-pointer active:opacity-80 transition duration-300"
                                onClick={stopTyping}
                            >
                                <FiSquare className="w-4 h-4" />
                                Stop AI
                            </button>
                        )}

                        {/* Clear button to reset conversation */}
                        <button
                            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-500 rounded-xl text-white shadow-xl cursor-pointer active:opacity-80 transition duration-300"
                            onClick={clearConversation}
                        >
                            <FiTrash2 className="w-4 h-4" />
                            Clear Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoList;
