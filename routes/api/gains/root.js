import express from "express";
const router = express.Router();

import verifyAccessToken from "../../../middlewares/verifyAccessTokenJWT.js";
import getGains from "../../../controllers/gains/getGainsController.js";
import deleteGain from "../../../controllers/gains/deleteGainContoller.js";

router.use(verifyAccessToken);

router.get("/", getGains);
router.delete("/", deleteGain);

export default router;
