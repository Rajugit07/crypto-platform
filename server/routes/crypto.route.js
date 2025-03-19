import express from "express";
import { getCryptoPrices } from "../controllers/crypto.controller.js";

const router = express.Router();

router.route("/price").get(getCryptoPrices);

export default router;
