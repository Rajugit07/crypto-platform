import axios from "axios";
import config from "../config/keys.js";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

// Controller to fetch cryptocurrency prices
export const getCryptoPrices = async (req, res) => {
    try {
        const { coinId, currency } = req.query; //user input

        const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
            params: {
                ids: coinId,
                vs_currencies: currency,
                include_market_cap: "true",
                include_24hr_vol: "true",
                include_24hr_change: "true",
                include_last_updated_at: "true",
                x_cg_api_key: config.coingecko, // API key
            },
        });
        return res.json(response.data);
    } catch (error) {
        console.error("Error fetching crypto prices:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
