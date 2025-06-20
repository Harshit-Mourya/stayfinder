import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingById } from "../slices/listingSlice";
import useTotalPrice from "../hooks/useTotalPrice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: listingId } = useParams(); // listingId from URL

  const listing = useSelector((state) => state.listings.selectedListing);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const totalPrice = useTotalPrice(checkIn, checkOut, listing?.price);

  const { error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchListingById(listingId));
  }, [dispatch, listingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error("Check-out date must be after check-in date!");
      return;
    }

    navigate("/payment", {
      state: {
        listing: listingId,
        title: listing?.title,
        image: listing?.images?.[0],
        checkIn,
        checkOut,
        totalPrice,
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Book This Listing
        </h2>

        {listing && (
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
            <img
              src={listing.images?.[0]}
              alt={listing.title}
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Check-in Date:</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Check-out Date:</label>
            <input
              type="date"
              min={checkIn || new Date().toISOString().split("T")[0]}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <p className="text-gray-700 font-medium">
            Total Price: ₹{totalPrice}
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Proceed to payment{" "}
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
