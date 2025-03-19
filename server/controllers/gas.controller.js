import axios from "axios";
import config from "../config/keys.js";

//api base url
const ETHERSCAN_API_URL = "https://api.etherscan.io/api";

// 
export const getGasPrice = async (req, res) => {
    try {
        const response = await axios.get(`${ETHERSCAN_API_URL}`, {
            params: {
                module: "gastracker",
                action: "gasoracle",
                apikey: config.etherscanApiKey,
            },
        });
        return res.json(response.data);
    } catch (error) {
        console.error("Error fetching gas prices:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
