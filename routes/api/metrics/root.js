import express from "express";
import getMetrics from "../../../controllers/metrics/getMetricsController.js";
import updateMetrics from "../../../controllers/metrics/updateMetricsController.js";
const router = express.Router();

router.get("/", getMetrics);
router.post("/", updateMetrics);

export default router;
