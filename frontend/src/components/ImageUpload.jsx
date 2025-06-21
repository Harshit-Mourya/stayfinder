import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadImages } from "../slices/imageSlice";

const ImageUpload = ({ images, setImages, disabled = false }) => {
  const dispatch = useDispatch();
  const { uploading } = useSelector((state) => state.images);

  const safeImages = Array.isArray(images) ? images : [];

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      const resultAction = await dispatch(uploadImages(files));

      if (uploadImages.fulfilled.match(resultAction)) {
        const newImages = resultAction.payload;
        setImages([...safeImages, ...newImages]);
        toast.success("Image(s) uploaded!");
      } else {
        toast.error(resultAction.payload);
      }
    } catch (err) {
      toast.error("Unexpected upload error!");
      console.error("Upload error:", err);
    } finally {
      e.target.value = null;
    }
  };

  const handleDelete = (index) => {
    const updated = [...safeImages];
    updated.splice(index, 1);
    setImages(updated);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Upload Images
      </label>

      <input
        type="file"
        accept="image/*"
        multiple
        disabled={disabled || uploading}
        onChange={handleImageUpload}
        className="w-full"
      />

      {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}

      {safeImages.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-2">
          {safeImages.map((img, index) => (
            <div
              key={index}
              className="relative w-24 h-24 rounded overflow-hidden border"
            >
              <img
                src={img.url}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="absolute top-1 right-1 text-white bg-black bg-opacity-60 p-1 rounded"
                title="Remove"
              >
                <i className="fa-solid fa-trash text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
