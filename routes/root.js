import express from "express";
const router = express.Router();

router.route("/").get((req, res) => {
  return res.json({ message: "message from get req on /" });
});

export default router;
