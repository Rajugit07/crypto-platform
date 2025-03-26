import axios from "axios";
import config from "../config/keys.js";

const NEWS_DATA_API_URL = "https://newsdata.io/api/1/news";

export const getCryptoNews = async (req, res) => {
    try {
        const { q: coin, apikey } = req.query; // Get 'apikey' from the request

        const apiKeyToUse = apikey || config.cryptoNewsApiKey; // Use the provided key or fallback

        const { data } = await axios.get(NEWS_DATA_API_URL, {
            params: {
                apikey: apiKeyToUse,
                q: coin,
            },
        });

        res.json(data);
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        if (error.response && error.response.status === 401) {
            res.status(401).json({ message: "Invalid API key" });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};
