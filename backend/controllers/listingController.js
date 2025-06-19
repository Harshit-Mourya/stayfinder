import Listing from "../models/Listing.js";

// @desc    Create a new listing
// @route   POST /api/listings
// @access  Private (host only)
export const createListing = async (req, res, next) => {
  try {
    const { title, description, price, location, images, availableDates } =
      req.body;

    const newListing = new Listing({
      title,
      description,
      price,
      location,
      images, // array of image URLs
      availableDates, // array of Dates
      host: req.user.id, // comes from verifyToken
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find().populate("host", "name email");
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

// @desc    Get listing by ID
// @route   GET /api/listings/:id
// @access  Public
export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "host",
      "name email"
    );
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

export const getHostListings = async (req, res, next) => {
  try {
    const hostId = req.user.id;
    const listings = await Listing.find({ host: hostId });
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};

// PUT /api/listings/:id - Update listing
export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.host.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/listings/:id - Delete listing
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.host.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted" });
  } catch (error) {
    next(error);
  }
};
