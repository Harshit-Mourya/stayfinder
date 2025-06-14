import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

// POST /api/bookings - Create a booking
export const createBooking = async (req, res, next) => {
  try {
    const { listing, checkIn, checkOut, totalPrice } = req.body;

    const newBooking = new Booking({
      user: req.user.id,
      listing,
      checkIn,
      checkOut,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/user - Get bookings by logged-in user
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "listing"
    );
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

    const bookings = await Booking.find({
      listing: { $in: listingIds },
    }).populate("user listing");
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
