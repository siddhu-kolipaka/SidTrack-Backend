import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  stockSymbol: { type: String, required: true, index: true },
  qty: { type: Number, default: 0 },
  purchasePrice: { type: Number, default: 0 },
  currentPrice: { type: Number, default: 0 },
  previousClosePrice: { type: Number, default: 0 },
  gain: { type: Number, default: 0 },
  worth: { type: Number, default: 0 },
  investment: { type: Number, default: 0 },
  purchaseDate: { type: Date, required: true },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
