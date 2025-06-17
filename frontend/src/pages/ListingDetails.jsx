import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingById } from "../slices/listingSlice";

const ListingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedListing, loading, error } = useSelector(
    (state) => state.listings
  );

  useEffect(() => {
    dispatch(fetchListingById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedListing) return <p>Listing not found.</p>;

  return (
    <div className="listing-details">
      <h2>{selectedListing.title}</h2>
      <p>{selectedListing.description}</p>
      <p>Location: {selectedListing.location}</p>
      <p>Price: ₹{selectedListing.price} per night</p>
      {selectedListing.images?.length > 0 && (
        <img
          src={selectedListing.images[0]}
          alt={selectedListing.title}
          style={{ width: "300px", height: "200px", objectFit: "cover" }}
        />
      )}

      <Link to={`/book/${selectedListing._id}`}>
        <button>Book Now</button>
      </Link>
    </div>
  );
};

export default ListingDetails;
