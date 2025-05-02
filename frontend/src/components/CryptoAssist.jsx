import axios from "axios";
import React, { useState } from "react";

const CryptoList = () => {
    const [input, setInput] = useState("");
    const [conversation, setConversation] = useState([]); // Store conversation history
    const [isTyping, setIsTyping] = useState(false); // Track typing state
    const [typingInterval, setTypingInterval] = useState(null); // Track typing interval ID
    const apiUrl = import.meta.env.REACT_APP_API_BASE_URL;

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
        }
    };

    // Function to clear the conversation history
    const clearConversation = () => {
        setConversation([]); // Reset conversation history
    };

    return (
        <div className="w-full pb-15 flex items-center justify-center mt-15">
            <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="text-6xl">Chat With AI</h1>
                <div className="mt-10 mb-10">
                    <textarea
                        cols={110}
                        rows={15}
                        className="text-xl border border-zinc-800 outline-none p-6 shadow scrollbar-hide rounded-2xl"
                        value={conversation.join("\n")} // Display conversation history
                        readOnly
                    ></textarea>
                </div>
                {isTyping && <p>AI is typing...</p>}{" "}
                {/* Display "typing..." when AI is typing */}

                    <input
                        type="text"
                        placeholder="How can I help you..."
                        className="w-[30%] m-5 border border-zinc-800 rounded-md outline-none px-2 py-3 shadow-2xl"
                        value={input}
                        onChange={handleChange}
                    />


               <div className="flex gap-5">
               <button
                        className="px-8 py-2 bg-black rounded-md mt-2 text-white shadow-xl cursor-pointer hover:opacity-50 transition duration-300"
                        onClick={promptHandler}
                    >
                        Send
                    </button>
                    {/* Stop button appears only when AI is typing */}
                    {isTyping && (
                        <button
                            className="px-8 py-2 bg-red-500 rounded-md mt-2 text-white shadow-xl cursor-pointer"
                            onClick={stopTyping}
                        >
                            Stop
                        </button>
                    )}
                    {/* Clear button to reset conversation */}
                    <button
                        className="px-8 py-2 bg-gray-500 rounded-md mt-2 text-white shadow-xl cursor-pointer"
                        onClick={clearConversation}
                    >
                        Clear
                    </button>
               </div>
                </div>
        </div>
    );
};

export default CryptoList;
