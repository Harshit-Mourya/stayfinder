import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchListings = createAsyncThunk(
  "listings/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/listings");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch listings");
    }
  }
);

export const createListing = createAsyncThunk(
  "listings/createListing",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/listings", {
        ...formData,
        price: Number(formData.price),
        availableDates: formData.availableDates
          .split(",")
          .map((date) => new Date(date.trim())),
        images: Array.isArray(formData.images)
          ? formData.images
          : [formData.images],
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create listing"
      );
    }
  }
);

const listingSlice = createSlice({
  name: "listings",
  initialState: {
    listings: [],
    loading: false,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listings.push(action.payload);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default listingSlice.reducer;
