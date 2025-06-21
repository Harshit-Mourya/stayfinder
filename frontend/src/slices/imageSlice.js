// src/slices/imageSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// Async thunk to upload image(s)
export const uploadImages = createAsyncThunk(
  "images/uploadImages",
  async (files, { rejectWithValue }) => {
    try {
      const uploaded = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file); // must match backend field

        const res = await axiosInstance.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        uploaded.push(res.data); // { url, public_id }
      }

      return uploaded;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Upload failed");
    }
  }
);

const imageSlice = createSlice({
  name: "images",
  initialState: {
    uploading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state) => {
        state.uploading = false;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      });
  },
});

export default imageSlice.reducer;
