import express from "express";
const router = express.Router();

import verifyAccessToken from "../../../middlewares/verifyAccessTokenJWT.js";
import getWealth from "../../../controllers/wealth/getWealthController.js";
import updateWealth from "../../../controllers/wealth/updateWealthController.js";
import deleteWealth from "../../../controllers/wealth/deleteWealthController.js";

router.use(verifyAccessToken);

router.get("/", getWealth);
router.post("/", updateWealth);
router.delete("/", deleteWealth);

export default router;
