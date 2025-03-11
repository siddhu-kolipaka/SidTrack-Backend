import metrics from "../../models/metrics.js";
import registeredUsers from "../../models/registeredUsers.js";

const getMetrics = async (req, res) => {
  try {
    const totalUsers = await registeredUsers.countDocuments();
    const data = await metrics.findOneAndUpdate(
      {},
      { users: totalUsers },
      { new: true }
    );

    return res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export default getMetrics;
