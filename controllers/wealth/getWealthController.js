import Wealth from "../../models/wealth.js";

const getWealth = async (req, res) => {
  try {
    const { email } = req.user;
    const wealth = await Wealth.find({ email }).sort({ date: 1 });

    return res.status(200).json({ wealth });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default getWealth;
