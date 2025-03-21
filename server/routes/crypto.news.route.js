import express from "express";
import { getCryptoNews } from "../controllers/crypto.news.controller.js";
import isAuthenticated from "../middleware/isAuthenticate.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getCryptoNews);

export default router;
