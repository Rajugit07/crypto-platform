import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cryptoRoute from "./routes/crypto.route.js";
import etherscanGasPrice from "./routes/gas.route.js";
import chatRoute from "./routes/ai.chat.route.js";
import newsRoute from "./routes/crypto.news.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express(express.json());
const PORT = 8080;

//middleware
app.use(cookieParser());
app.use(express.json());

const corsOption = {
    origin: "http://localhost:5173/",
    credential: true,
};

app.use(cors(corsOption));

//api
app.use("/api/user", userRoute); //User API
app.use("/api/crypto", cryptoRoute); //Crypto Price API
app.use("/api/etherscan", etherscanGasPrice); //Etherscan Gas Price API
app.use("/api/chat", chatRoute); //AI Chat API
app.use("/api/news", newsRoute); //Crypto News API

//connect db and server
app.listen(PORT, () => {
    connectDB(); //databases connect.
    console.log(`SERVER IS RUNNING ON ${PORT}`);
});
