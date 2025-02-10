import Transaction from "../../models/transaction.js";

const getTransactions = async (req, res) => {
  try {
    const { from, to } = req.query;

    const userEmail = req.user.email;

    const transactions = await Transaction.find({
      email: userEmail,
      date: { $gte: from, $lte: to },
    }).sort({ date: 1 });

    return res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

export default getTransactions;
