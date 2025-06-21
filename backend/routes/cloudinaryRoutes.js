import express from "express";
import { v2 as cloudinary } from "cloudinary";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/signature", verifyToken, (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({ timestamp, signature });
});

export default router;
