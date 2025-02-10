import mongoose from "mongoose";

const trackerTransactionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  note: { type: String, required: true },
});

const TrackerTransaction = mongoose.model(
  "TrackerTransaction",
  trackerTransactionSchema
);

export default TrackerTransaction;
