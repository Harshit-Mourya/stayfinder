import { useSelector } from "react-redux";
import ListingCard from "./ListingCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchListings } from "../slices/listingSlice";

const HostListings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const { listings, loading } = useSelector((state) => state.listings);
  const { user } = useSelector((state) => state.auth);

  const hostListings = listings.filter(
    (listing) => listing.host._id === user?._id
  );

  if (loading) return <p>Loading your listings...</p>;
  if (hostListings.length === 0) return <p>No listings found.</p>;

  return (
    <div>
      <h2>Your Listings</h2>
      <ul>
        {hostListings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </ul>
    </div>
  );
};

export default HostListings;
