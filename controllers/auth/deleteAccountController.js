import registeredUsers from "../../models/registeredUsers.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const handleUserDelete = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!password)
      return res.status(400).json({ message: "Password is needed to delete" });

    const user = await registeredUsers.findOne({ email, username });
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error();

    await registeredUsers.findOneAndDelete({ username, email });

    const { jwt } = req.cookies;
    if (jwt) {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    return res.status(200).json({
      message: `${user.username} deleted`,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default handleUserDelete;