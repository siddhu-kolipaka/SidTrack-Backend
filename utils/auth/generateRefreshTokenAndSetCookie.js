import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import registeredUsers from "../../models/registeredUsers.js";
dotenv.config();

const generateRefreshTokenAndSetCookie = async (res, user) => {
  const refreshToken = jwt.sign(
    { username: user.username, email: user.email },
    process.env.REFRESH_TOKEN_SECRET_STAMP,
    { expiresIn: "1d" }
  );

  const User = await registeredUsers.findOne({
    username: user.username,
    email: user.email,
  });
  User.refreshToken = refreshToken;
  await User.save();
  // storing jwt token in httpOnly cookie so that hackers cannot access it using javascript
  return res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export default generateRefreshTokenAndSetCookie;
