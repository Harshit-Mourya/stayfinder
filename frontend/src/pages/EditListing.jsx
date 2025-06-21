import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateListing, fetchListingById } from "../slices/listingSlice";
import { toast } from "react-toastify";
import ImageUpload from "../components/ImageUpload.jsx";

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
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        images: selectedListing.images || [],
      });
    }
  }, [selectedListing]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const updatedData = { ...formData, price: Number(formData.price) };
      const result = await dispatch(updateListing({ id, updatedData }));

      if (updateListing.fulfilled.match(result)) {
        toast.success("Listing updated successfully!");
        navigate("/dashboard");
      } else {
        toast.error(result.payload || "Failed to update listing!");
      }
    } catch (error) {
      // Handle unexpected errors here
      toast.error("An unexpected error occurred!");
      console.error("Update listing error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !selectedListing) {
    return (
      <div className="w-full text-center my-5">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Edit Listing
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            disabled={isSubmitting || loading}
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            disabled={isSubmitting || loading}
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            disabled={isSubmitting || loading}
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            disabled={isSubmitting || loading}
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <ImageUpload
              images={formData.images}
              setImages={(newImages) =>
                setFormData((prev) => ({ ...prev, images: newImages }))
              }
              disabled={isSubmitting || loading}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Update Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
