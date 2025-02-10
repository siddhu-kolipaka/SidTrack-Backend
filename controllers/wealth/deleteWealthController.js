import Wealth from "../../models/wealth.js";

const deleteWealth = async (req, res) => {
  try {
    const { email } = req.user;
    const { date } = req.query;

    await Wealth.findOneAndDelete({ email, date });

    return res.status(200).json({ message: "deleted" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default deleteWealth;
