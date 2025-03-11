import metrics from "../../models/metrics.js";

const updateMetrics = async (req, res) => {
  try {
    const { type } = req.body;
    if (type == "pageVisits") {
      await metrics.findOneAndUpdate(
        {},
        { $inc: { pageVisits: 1 } },
        { new: true }
      );
      await metrics.findOneAndUpdate(
        {},
        { $inc: { pageViews: 1 } },
        { new: true }
      );
    } else if (type == "pageViews") {
      await metrics.findOneAndUpdate(
        {},
        { $inc: { pageViews: 1 } },
        { new: true }
      );
    } else if (type == "uniqueVisits") {
      await metrics.findOneAndUpdate(
        {},
        { $inc: { uniqueVisits: 1 } },
        { new: true }
      );
    }

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export default updateMetrics;
