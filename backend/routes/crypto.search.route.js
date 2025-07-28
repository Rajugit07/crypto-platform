import express from "express";
import { getCryptoSearch } from "../controllers/crypto.search.js";
// import isAuthenticated from "../middleware/isAuthenticate.js";

const router = express.Router();

router.route("/search").get( getCryptoSearch);

export default router;
