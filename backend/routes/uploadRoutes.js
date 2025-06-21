import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/cloudinaryUpload.js";
import { uploadImage, deleteImage } from "../controllers/imageController.js";

const router = express.Router();

router.post("/", verifyToken, upload.single("image"), uploadImage);

router.delete("/", verifyToken, deleteImage);

export default router;
