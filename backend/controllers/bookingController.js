import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

// POST /api/bookings - Create a booking
export const createBooking = async (req, res, next) => {
  try {
    const { listing, checkIn, checkOut, totalPrice } = req.body;

    if (new Date(checkOut) <= new Date(checkIn)) {
      return res
        .status(400)
        .json({ message: "Check-out must be after check-in." });
    }

    const overlappingBooking = await Booking.findOne({
      listing,
      $or: [{ checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        message: "The listing is already booked for the selected dates.",
      });
    }

    const newBooking = new Booking({
      user: req.user.id,
      listing,
      checkIn,
      checkOut,
      totalPrice,
    });

    await newBooking.save();
    await newBooking.populate([
      { path: "listing", select: "title images price host" },
    ]);

    console.log("newBooking: ", newBooking);

    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/user - Get bookings by logged-in user
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({
        path: "listing",
        select: "host title images price",
      })
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/host - Get bookings for listings hosted by logged-in user
export const getHostBookings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ host: req.user.id });
    const listingIds = listings.map((listing) => listing._id);

    if (listingIds.length === 0) {
      return res.status(200).json([]);
    }

    const bookings = await Booking.find({
      listing: { $in: listingIds },
    })
      .populate([
        { path: "user", select: "name email" },
        { path: "listing", select: "title images price host" },
      ])
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
