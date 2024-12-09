import registeredUsers from "../../models/registeredUsers.js";

const handleUserLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.jwt) return res.sendStatus(204);

  const user = await registeredUsers.findOne({ refreshToken: cookies.jwt });
  if (user) {
    user.refreshToken = undefined;
    await user.save();
  }

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
