import mongoose from "mongoose";

const wealthSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: Date, required: true },
  wealth: { type: Number, required: true },
});

const Wealth = mongoose.model("Wealth", wealthSchema);

export default Wealth;
