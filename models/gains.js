import mongoose from "mongoose";

const gainsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  stockSymbol: { type: String, required: true, index: true },
  qty: { type: Number, default: 0 },
  sellPrice: { type: Number, default: 0 },
  gain: { type: Number, default: 0 },
  date: { type: Date, required: true },
});

const gains = mongoose.model("gains", gainsSchema);

export default gains;
