import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchListings = createAsyncThunk(
  "listings/fetchAll",
  async (query = {}, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      Object.entries(query).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      const res = await axiosInstance.get(`/listings?${params.toString()}`);
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

export const fetchListingById = createAsyncThunk(
  "listings/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/listings/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch listing");
    }
  }
);

export const fetchHostListings = createAsyncThunk(
  "listings/fetchHostListings",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/listings/host");

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch host listings");
    }
  }
);

export const updateListing = createAsyncThunk(
  "listings/updateListing",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/listings/${id}`, updatedData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to update listing");
    }
  }
);

export const deleteListing = createAsyncThunk(
  "listings/deleteListing",
  async (listingId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/listings/${listingId}`);
      return listingId; // returning the ID so we can remove it from the state
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to delete listing");
    }
  }
);

const listingSlice = createSlice({
  name: "listings",
  initialState: {
    listings: [],
    selectedListing: null,

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
      .addCase(fetchListingById.pending, (state) => {
        state.loading = true;
        state.selectedListing = null;
      })
      .addCase(fetchListingById.fulfilled, (state, action) => {
        state.selectedListing = action.payload;
        state.loading = false;
      })
      .addCase(fetchListingById.rejected, (state, action) => {
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
      })
      .addCase(fetchHostListings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHostListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchHostListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = state.listings.filter(
          (listing) => listing._id !== action.payload
        );
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.listings.findIndex((l) => l._id === updated._id);
        if (index !== -1) {
          state.listings[index] = updated;
        }
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default listingSlice.reducer;
