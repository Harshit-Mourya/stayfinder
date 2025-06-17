import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import listingReducer from "../slices/listingSlice";
import bookingReducer from "../slices/bookingSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingReducer,
    bookings: bookingReducer,
  },
});
