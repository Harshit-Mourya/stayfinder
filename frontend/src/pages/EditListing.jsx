import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateListing, fetchListingById } from "../slices/listingSlice";

const EditListing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedListing, loading } = useSelector((state) => state.listings);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [""],
  });

  // Fetch the listing on mount
  useEffect(() => {
    dispatch(fetchListingById(id));
  }, [dispatch, id]);

  // Set form data when selected listing is fetched
  useEffect(() => {
    if (selectedListing) {
      setFormData({
        title: selectedListing.title || "",
        description: selectedListing.description || "",
        price: selectedListing.price || "",
        location: selectedListing.location || "",
        images: selectedListing.images || "",
      });
    }
  }, [selectedListing]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e, index) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      price: Number(formData.price),
    };
    dispatch(updateListing({ id, updatedData })).then(() => {
      navigate("/dashboard");
    });
  };

  if (loading || !selectedListing) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Listing</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <div>
          <label>Image URLs:</label>
          {formData.images.map((img, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Image URL ${index + 1}`}
              value={img}
              onChange={(e) => handleImageChange(e, index)}
              style={{ marginBottom: "0.5rem" }}
            />
          ))}
          <button type="button" onClick={addImageField}>
            + Add another image
          </button>
        </div>
        <button type="submit">Update Listing</button>
      </form>
    </div>
  );
};

export default EditListing;
