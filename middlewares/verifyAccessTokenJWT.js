import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No authorization header found" });

  const tokenFromHeader = authHeader.split(" ")[1];

  await jwt.verify(
    tokenFromHeader,
    process.env.ACCESS_TOKEN_SECRET_STAMP,
    (err, decodedInfoFromKey) => {
      if (err)
        return res
          .status(403)
          .json({ message: "access token is wrong/expired" });
      req.body.username = decodedInfoFromKey.username;
      req.body.email = decodedInfoFromKey.email;
      next();
    }
  );
};
export default verifyJWT;
