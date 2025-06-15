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

const listingSlice = createSlice({
  name: "listings",
  initialState: {
    listings: [],
    loading: false,
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
      });
  },
});

export default listingSlice.reducer;
