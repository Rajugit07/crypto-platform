import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY; // Get API key from environment variables

// Check if API Key exists
if (!apiKey) {
    console.error("GEMINI_API_KEY environment variable not set.");
    process.exit(1); // Exit the process if the API key is missing
}

const genAI = new GoogleGenerativeAI(apiKey); //Initialize Gemini AI
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use the appropriate model

//Configure Response Behavior
const generationConfig = {
    temperature: 0.3, //More focused, logical, and consistent responses
    topP: 0.7, //More diverse responses with a mix of high and medium probability words
    topK: 20, // More creative responses
    maxOutputTokens: 3000, //  Detailed response
    responseMimeType: "text/plain", //  Simple text response.
};

export const chatWithAi = async (req, res) => {
    try {
        const userInput = req.body.input; // user input

        if (!userInput) {
            return res.status(400).json({ error: "Missing input parameter." });
        }

        //Create AI Chat Session:
        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [{ text: "hello\n" }],
                },
                {
                    role: "model",
                    parts: [{ text: "Hello! How can I help you today?\n" }],
                },
            ],
        });

        //Send User Input to AI & Get Response:
        const result = await chatSession.sendMessage(userInput);
        const responseText = result.response.text();

        res.json({ reply: responseText }); // Use 'reply' for consistency
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({
            error: "Error processing request",
            details: error.message, // Include the error message
        });
    }
};
