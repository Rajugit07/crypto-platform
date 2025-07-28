import express from "express";
import { getCryptoPrices } from "../controllers/crypto.controller.js";
// import isAuthenticated from "../middleware/isAuthenticate.js";

const router = express.Router();

router.route("/price").get( getCryptoPrices);

export default router;
