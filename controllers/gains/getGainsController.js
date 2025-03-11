import gains from "../../models/gains.js";

const getGains = async (req, res) => {
  try {
    const { from, to } = req.query;
    const userEmail = req.user.email;
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }
    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const aggregatedGains = await gains.aggregate([
      {
        $match: {
          email: userEmail,
          date: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          },
          totalGain: { $sum: "$gain" },
          totalQty: { $sum: "$qty" },
          records: { $push: "$$ROOT" },
        },
      },
      {
        $addFields: { date: "$_id.date" },
      },
      { $sort: { date: 1 } },
      {
        $project: {
          _id: 0,
          date: 1,
          totalGain: 1,
          totalQty: 1,
          records: 1,
        },
      },
    ]);
    if (aggregatedGains.length === 0) {
      return res
        .status(200)
        .json({ message: "No data found for the given criteria" });
    }
    return res.status(200).json(aggregatedGains);
  } catch (err) {
    console.error("Error in getGains:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default getGains;
