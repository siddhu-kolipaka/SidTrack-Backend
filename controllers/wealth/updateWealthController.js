import Wealth from "../../models/wealth.js";

const updateWealth = async (req, res) => {
  try {
    const { email } = req.user;
    const { date, wealth } = req.body;

    const item = await Wealth.findOne({ email, date });
    if (item) {
      item.wealth = wealth;
      await item.save();
    } else {
      const newItem = new Wealth({ email, date, wealth });
      newItem.save();
    }
    return res.status(201).json({ message: "update successful" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default updateWealth;
