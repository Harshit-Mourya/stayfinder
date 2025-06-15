import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [""],
    availableDates: [],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosInstance.post("/listings", {
        ...formData,
        price: Number(formData.price),
        availableDates: formData.availableDates
          .split(",")
          .map((date) => new Date(date.trim())),
      });

      console.log("Created listing:", res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create listing");
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
        <input
          type="text"
          name="availableDates"
          placeholder="Available Dates (comma-separated)"
          onChange={handleChange}
        />

        <button type="submit">Create Listing</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreateListing;
