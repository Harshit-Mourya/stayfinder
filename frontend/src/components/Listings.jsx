import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../slices/listingSlice";
import ListingCard from "./ListingCard";
import { useLocation } from "react-router-dom";

const Listings = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { listings, loading, error } = useSelector((state) => state.listings);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = {
      search: params.get("search") || "",
      location: params.get("location") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      checkIn: params.get("checkIn") || "",
      checkOut: params.get("checkOut") || "",
    };

    dispatch(fetchListings(query || "")); // "" fetches all listings
  }, [location.search, dispatch]);

  if (loading) {
    return (
      <div className="w-full text-center my-5">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading listing...
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Explore Listings
      </h1>
      <div className="listings-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default Listings;
