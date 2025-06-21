import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingById } from "../slices/listingSlice";
import MapView from "../components/MapView";

const ListingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedListing, loading, error } = useSelector(
    (state) => state.listings
  );

  useEffect(() => {
    dispatch(fetchListingById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="w-full text-center my-5">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading listing
          details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center mt-10">
        <p className="text-xl font-semibold text-red-600">
          <i className="fa-solid fa-xmark mr-2 text-red-600"></i>
          {error}
        </p>
      </div>
    );
  }

  if (!selectedListing) {
    return (
      <div className="w-full text-center mt-10">
        <p className="text-lg text-gray-600">
          <i className="fa-solid fa-triangle-exclamation mr-2 text-yellow-600"></i>
          Listing not found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        {selectedListing.title}
      </h2>
      <p className="text-gray-600 mb-2">{selectedListing.description}</p>
      <p className="text-gray-700 mb-1">
        <strong>
          <i className="fa-solid fa-location-dot mr-2 text-blue-600"></i>
          Location:&nbsp;
        </strong>
        {selectedListing.location}
      </p>
      <p className="text-green-600 font-semibold mb-4">
        ₹{selectedListing.price}
        <span className="text-gray-500"> / night</span>
      </p>

      {selectedListing.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {selectedListing.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Listing image ${index + 1}`}
              className="w-full h-60 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      {selectedListing.latitude && selectedListing.longitude && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            <i className="fa-solid fa-map-location-dot mr-2 text-blue-600"></i>
            View on Map
          </h3>
          <MapView
            lat={selectedListing.latitude}
            lng={selectedListing.longitude}
          />
        </div>
      )}

      <Link to={`/book/${selectedListing._id}`}>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Book Now
        </button>
      </Link>
    </div>
  );
};

export default ListingDetails;
