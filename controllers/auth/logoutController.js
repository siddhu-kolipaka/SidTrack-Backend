import registeredUsers from "../../models/registeredUsers.js";

const handleUserLogout = async (req, res) => {
  const { username, email } = req.body;

  const user = await registeredUsers.findOne({ username, email });
  if (user) {
    user.refreshToken = undefined;
    await user.save();
  }

  const cookies = req.cookies;
  if (!cookies || !cookies.jwt)
    return res.status(204).json({ message: "Cleared cookies" });

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

export default handleUserLogout;
