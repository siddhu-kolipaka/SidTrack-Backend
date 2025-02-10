import TrackerTransaction from "../../models/trackerTransaction.js";

const getTransactions = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { from, to } = req.query;

    const transactions = await TrackerTransaction.find({
      email: userEmail,
      date: { $gte: from, $lte: to },
    }).sort({ date: -1 });

    return res.status(200).json({ transactions });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default getTransactions;
