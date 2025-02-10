import gains from "../../models/gains.js";

const getGains = async (req, res) => {
  try {
    const { from, to } = req.query;
    const userEmail = req.user.email;

    const gainList = await gains
      .find({
        email: userEmail,
        date: { $gte: from, $lte: to },
      })
      .sort({ date: 1 });

    return res.status(200).json(gainList);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default getGains;
