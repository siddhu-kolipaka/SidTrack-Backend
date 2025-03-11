import gains from "../../models/gains.js";

const addGain = async (req, res) => {
  try {
    const { stockSymbol, qty, sellPrice, gain, date } = req.body;
    const email = req.user.email;

    const newGain = new gains({
      email,
      stockSymbol,
      qty,
      sellPrice,
      gain,
      date: new Date(date),
    });

    await newGain.save();

    return res.status(201).json(newGain);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default addGain;
