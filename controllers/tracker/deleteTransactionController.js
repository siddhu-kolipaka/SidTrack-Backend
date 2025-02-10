import TrackerTransaction from "../../models/trackerTransaction.js";

const deleteTransaction = async (req, res) => {
  try {
    const { _id } = req.query;

    await TrackerTransaction.findOneAndDelete({
      _id,
    });

    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default deleteTransaction;
