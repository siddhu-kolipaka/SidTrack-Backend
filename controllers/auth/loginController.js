import registeredUsers from "../../models/registeredUsers.js";
import generateAccessToken from "../../utils/auth/generateAccessToken.js";
import generateRefreshTokenAndSetCookie from "../../utils/auth/generateRefreshTokenAndSetCookie.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Both email and password are needed to login" });

  const user = await registeredUsers.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: `No user with ${email} found` });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    await generateRefreshTokenAndSetCookie(res, user);
    // Keep access token in frontend state management store only so that no one can login by changing in local storage or cookie
    const accessToken = await generateAccessToken(user);
    user.lastLogin = Date.now();
    await user.save();
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
        refreshToken: undefined,
        isBlacklisted: undefined,
        __v: undefined,
        _id: undefined,
        roles: undefined,
      },
      accessToken,
    });
  } else {
    return res
      .status(400)
      .json({ message: `Wrong email or password to login.` });
  }
};

export default handleUserLogin;
