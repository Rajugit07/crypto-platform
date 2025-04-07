import express from "express";
import { getCryptoSearch } from "../controllers/crypto.search.js";
import isAuthenticated from "../middleware/isAuthenticate.js";

const router = express.Router();

router.route("/search").get(isAuthenticated, getCryptoSearch);

export default router;
