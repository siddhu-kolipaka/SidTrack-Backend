import express from "express";
const router = express.Router();

import verifyAccessToken from "../../../middlewares/verifyAccessTokenJWT.js";
import getTransactions from "../../../controllers/stock/getTransactionsController.js";
import addTransaction from "../../../controllers/stock/addTransactionController.js";
import deleteTransaction from "../../../controllers/stock/deleteTransactionController.js";
import getPortfolio from "../../../controllers/stock/getPortfolioController.js";

router.use(verifyAccessToken);

router.get("/transactions", getTransactions);
router.post("/add-transaction", addTransaction);
router.delete("/delete-transaction", deleteTransaction);

router.get("/portfolio", getPortfolio);
export default router;
