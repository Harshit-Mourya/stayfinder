import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createListing } from "../slices/listingSlice";
import ImageUpload from "../components/ImageUpload.jsx";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [],
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.listings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isSubmitting) return; // Prevent multiple submits
    setIsSubmitting(true);

    if (!formData.images.length) {
      setError("Please upload at least one image");
      toast.error("Please upload at least one image");
      setIsSubmitting(false);
      return;
    }

    try {
      const resultAction = await dispatch(createListing(formData));

      if (createListing.fulfilled.match(resultAction)) {
        toast.success("Listing created successfully!");
        navigate("/dashboard");
      } else {
        const msg = resultAction.payload || "Failed to create listing";
        toast.error(msg);
        setError(msg);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setError("Unexpected error occurred.");
      console.error("CreateListing error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create a New Listing
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            disabled={loading || isSubmitting}
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            disabled={loading || isSubmitting}
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            disabled={loading || isSubmitting}
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            disabled={loading || isSubmitting}
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <ImageUpload
            images={formData.images}
            setImages={(newImages) =>
              setFormData((prev) => ({ ...prev, images: newImages }))
            }
            disabled={loading || isSubmitting}
          />

          {/* <input
            type="text"
            disabled={loading || isSubmitting}
            name="images"
            placeholder="Image URL"
            value={formData.images}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, images: [e.target.value] }))
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}

          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            {isSubmitting ? "Creating..." : "Create Listing"}
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
