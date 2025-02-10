import registeredUsers from "../../models/registeredUsers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import generateAccessToken from "../../utils/auth/generateAccessToken.js";
dotenv.config();

const getNewAccessToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies || !cookies.jwt)
      return res.status(401).json({ message: "No jwt cookie found" });

    const refreshToken = cookies.jwt;

    const user = await registeredUsers.findOne({
      refreshToken: refreshToken,
      isBlacklisted: false,
    });

    // this database check is to still know that the refresh token belongs to a valid user who isnt blacklisted/blocked/logged out.
    // If you dont want the blacklist feature, you can remove this database check to make the JWT fully stateless.

    if (!user)
      return res
        .status(403)
        .json({ message: "No user with that refresh token found" });

    // To check the refresh token has correct signature and is not expired
    await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_STAMP,
      (err, decodedInfoFromKey) => {
        if (
          err ||
          user.username !== decodedInfoFromKey.username ||
          user.email !== decodedInfoFromKey.email
        )
          return res
            .status(403)
            .json({ message: "Wrong/Expired refreshToken" });

        const accessToken = generateAccessToken(user);
        return res.status(201).json({ accessToken });
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default getNewAccessToken;
