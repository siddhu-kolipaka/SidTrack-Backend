import registeredUsers from "../../models/registeredUsers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateAccessToken from "../../services/generateAccessToken.js";
dotenv.config();

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies || !cookies.jwt)
      return res.status(401).json({ message: "No cookie found" });

    const refreshToken = cookies.jwt;
    const user = await registeredUsers.findOne({ refreshToken: refreshToken });
    if (!user)
      return res
        .status(403)
        .json({ message: "No user with that refresh token found" });

    await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_STAMP,
      (err, decodedInfoFromKey) => {
        if (
          err ||
          user.username !== decodedInfoFromKey.username ||
          user.email !== decodedInfoFromKey.email
        )
          return res.sendStatus(403);

        const accessToken = generateAccessToken(user);
        return res.json({ accessToken });
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default handleRefreshToken;
