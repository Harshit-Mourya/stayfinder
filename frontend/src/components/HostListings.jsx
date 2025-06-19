import { useSelector } from "react-redux";
import ListingCard from "./ListingCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchHostListings, deleteListing } from "../slices/listingSlice";

const HostListings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHostListings());
  }, [dispatch]);

  const { listings, loading } = useSelector((state) => state.listings);
  const { user } = useSelector((state) => state.auth);

  const handleDelete = (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      dispatch(deleteListing(listingId));
    }
  };

  if (loading) return <p>Loading your listings...</p>;
  if (listings.length === 0) return <p>No listings found.</p>;

  return (
    <div>
      <h2>Your Listings</h2>
      <ul>
        {listings.map((listing) => (
          <li key={listing._id}>
            <ListingCard listing={listing} />
            <button onClick={() => navigate(`/editlisting/${listing._id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(listing._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostListings;
