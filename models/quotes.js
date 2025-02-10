import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  stockSymbol: { type: String, required: true, unique: true, index: true },
  currentPrice: { type: Number, default: 0 },
  previousClosePrice: { type: Number, default: 0 },
  currency: { type: String, default: "INR" },
  lastUpdated: { type: Date, default: Date.now },
});

const Quote = mongoose.model("quote", quoteSchema);

export default Quote;
