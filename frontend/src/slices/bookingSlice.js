import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// Create Booking
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/bookings", bookingData);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Booking failed"
      );
    }
  }
);

// Get bookings for the user
export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/bookings/user");

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch user bookings");
    }
  }
);

// Get bookings for listings owned by the host
export const fetchHostBookings = createAsyncThunk(
  "bookings/fetchHostBookings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/bookings/host");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch host bookings");
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    userBookings: [],
    hostBookings: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearBookingStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userBookings.push(action.payload); // Push to userBookings
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Host Bookings
      .addCase(fetchHostBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHostBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.hostBookings = action.payload;
      })
      .addCase(fetchHostBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingStatus } = bookingSlice.actions;

export default bookingSlice.reducer;
