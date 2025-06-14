import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
} from "../controllers/listingController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createListing);
router.get("/", getAllListings);
router.get("/:id", getListingById);

export default router;
