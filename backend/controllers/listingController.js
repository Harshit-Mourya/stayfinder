import Listing from "../models/Listing.js";
import Booking from "../models/Booking.js";

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
    const { search, location, minPrice, maxPrice, checkIn, checkOut } =
      req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let listings = await Listing.find(filter).populate("host", "name email");

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const conflictingBookings = await Booking.find({
        $or: [
          {
            checkIn: { $lt: checkOutDate },
            checkOut: { $gt: checkInDate },
          },
        ],
      });

      const bookedListingIds = conflictingBookings.map((b) =>
        b.listing.toString()
      );

      listings = listings.filter(
        (listing) => !bookedListingIds.includes(listing._id.toString())
      );
    }

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
