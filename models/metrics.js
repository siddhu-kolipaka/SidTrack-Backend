import mongoose from "mongoose";

const metricSchema = new mongoose.Schema({
  pageViews: { type: Number, default: 0 },
  pageVisits: { type: Number, default: 0 },
  uniqueVisits: { type: Number, default: 0 },
  users: { type: Number, default: 0 },
});

const metrics = mongoose.model("metrics", metricSchema);

export default metrics;
