import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateAccessToken = (user) => {
  const accessToken = jwt.sign(
    { username: user.username, email: user.email },
    process.env.ACCESS_TOKEN_SECRET_STAMP,
    { expiresIn: "1m" }
  );

  return accessToken;
};

export default generateAccessToken;
