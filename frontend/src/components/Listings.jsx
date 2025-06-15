import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../slices/listingSlice";
import ListingCard from "./ListingCard";

const Listings = () => {
  const dispatch = useDispatch();
  const { listings, loading, error } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="listings-grid">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

export default Listings;
