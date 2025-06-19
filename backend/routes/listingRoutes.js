import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  getHostListings,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createListing);
router.get("/host", verifyToken, getHostListings);
router.get("/", getAllListings);
router.get("/:id", getListingById);
router.put("/:id", verifyToken, updateListing);
router.delete("/:id", verifyToken, deleteListing);

export default router;
