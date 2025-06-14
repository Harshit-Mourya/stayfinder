import express from "express";
import {
  createBooking,
  getUserBookings,
  getHostBookings,
} from "../controllers/bookingController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/user", verifyToken, getUserBookings);
router.get("/host", verifyToken, getHostBookings);

export default router;
