import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { createListing } from "../slices/listingSlice";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [""],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error: createError } = useSelector((state) => state.listings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const resultAction = await dispatch(createListing(formData));

    if (createListing.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    } else {
      setError(resultAction.payload || "Failed to create listing");
    }
  };

  return (
    <div className="create-listing">
      <h2>Create a New Listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />
        <input
          type="text"
          name="images"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <button type="submit">Create Listing</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreateListing;
