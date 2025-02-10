import registeredUsers from "../../models/registeredUsers.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const handleUserDelete = async (req, res) => {
  try {
    const { password } = req.body;
    const enteredEmail = req.body.email;
    const { username, email } = req.user;

    if (enteredEmail !== email)
      return res
        .status(400)
        .json({ message: "Entered email did not match to the logged in user" });

    if (!password)
      return res.status(400).json({ message: "Password is needed to delete" });

    const user = await registeredUsers.findOne({ email, username });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong Password" });

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
