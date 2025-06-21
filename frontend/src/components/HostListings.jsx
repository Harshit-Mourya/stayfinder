import { useSelector } from "react-redux";
import ListingCard from "./ListingCard";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { fetchHostListings, deleteListing } from "../slices/listingSlice";

const HostListings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHostListings());
  }, [dispatch]);

  const { listings, loading, error } = useSelector((state) => state.listings);

  const handleDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      const resultAction = await dispatch(deleteListing(listingId));

      if (deleteListing.fulfilled.match(resultAction)) {
        toast.success("Listing deleted successfully!", {
          autoClose: 3000,
        });
      } else {
        toast.error(resultAction.payload || "Failed to delete listing!");
      }
    }
  };

  if (listings.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10 text-lg">
        You haven&#39;t created any listings yet.
        <br />
        <Link
          to="/createlisting"
          className="text-blue-600 hover:underline font-medium ml-1"
        >
          Click here
        </Link>
        &nbsp;to create one.
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
    <div className="px-4 md:px-8 mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600 text-center">
        Your Listings
      </h2>
      {loading && (
        <div className="w-full text-center my-5">
          <p className="text-xl font-semibold text-gray-700 animate-pulse">
            <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading
            listings...
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className=" bg-transparent flex flex-col justify-between"
          >
            <ListingCard listing={listing} />

            <div className="mt-3 px-2 pb-2 flex gap-4">
              <button
                onClick={() => navigate(`/editlisting/${listing._id}`)}
                className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(listing._id)}
                className="px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostListings;
