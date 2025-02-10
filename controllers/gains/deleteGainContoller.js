import gains from "../../models/gains.js";

const deleteGain = async (req, res) => {
  try {
    const { _id } = req.query;

    const gain = await gains.findOneAndDelete({
      _id,
    });

    if (!gain) {
      return res.status(404).json({ message: "P&L not found" });
    }

    return res.status(200).json({ message: "P&L deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default deleteGain;
