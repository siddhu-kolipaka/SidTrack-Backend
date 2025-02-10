import TrackerTransaction from "../../models/trackerTransaction.js";

const addTransaction = async (req, res) => {
  const { type, category, amount, date, note } = req.body;
  const userEmail = req.user.email;
  try {
    const newTransaction = new TrackerTransaction({
      type,
      category,
      amount,
      note,
      date,
      email: userEmail,
    });

    await newTransaction.save();

    return res.status(201).json({
      message: "Transaction added successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

export default addTransaction;
