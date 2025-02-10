import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: Date, required: true },
  stockSymbol: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  action: { type: String, enum: ["BUY", "SELL"], required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
