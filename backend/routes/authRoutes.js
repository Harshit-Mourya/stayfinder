import express from "express";
import {
  registerUser,
  loginUser,
  autoLogin,
} from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";
import User from "../models/User.js";

const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", registerUser);

// @route   POST /api/auth/login
router.post("/login", loginUser);

router.get("/me", verifyToken, autoLogin);

export default router;
