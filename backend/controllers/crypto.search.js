import axios from "axios";
import config from "../config/keys.js";

//base url
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

// Controller to fetch cryptocurrency prices
export const getCryptoSearch = async (req, res) => {
    try {
        const { coin } = req.query; //user input

        const response = await axios.get(`${COINGECKO_API_URL}/search`, {
            params: {
                query: coin,
            },
            headers: {
                accept: "application/json",
                x_cg_api_key: config.coingecko, // API key
            },
        });
        return res.json(response.data);
    } catch (error) {
        console.error("Error fetching crypto prices:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
