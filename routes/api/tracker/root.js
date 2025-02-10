import express from "express";
const router = express.Router();
import verifyAccessToken from "../../../middlewares/verifyAccessTokenJWT.js";
import addTransaction from "../../../controllers/tracker/addTransactionController.js";
import getTransactions from "../../../controllers/tracker/getTransactionsController.js";
import deleteTransaction from "../../../controllers/tracker/deleteTransactionController.js";

router.use(verifyAccessToken);

router.get("/get-transactions", getTransactions);
router.post("/add-transaction", addTransaction);
router.delete("/delete-transaction", deleteTransaction);

export default router;
