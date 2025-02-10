import Transaction from "../../models/transaction.js";

const deleteTransaction = async (req, res) => {
  try {
    const { _id } = req.query;

    const transaction = await Transaction.findOneAndDelete({
      _id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

export default deleteTransaction;
