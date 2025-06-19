import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../slices/bookingSlice";
import { fetchListingById } from "../slices/listingSlice";
import useTotalPrice from "../hooks/useTotalPrice";

import { useNavigate, useParams } from "react-router-dom";

const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: listingId } = useParams(); // listingId from URL

  const listing = useSelector((state) => state.listings.selectedListing);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const totalPrice = useTotalPrice(checkIn, checkOut, listing?.price);

  const { loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchListingById(listingId));
  }, [dispatch, listingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(checkIn) >= new Date(checkOut)) {
      alert("Check-out date must be after check-in date!");
      return;
    }

    const resultAction = await dispatch(
      createBooking({ listing: listingId, checkIn, checkOut, totalPrice })
    );

    if (createBooking.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    } else {
      console.error("Booking failed:", resultAction.payload);
    }
  };

  return (
    <div className="booking-form">
      <h2>Book This Listing</h2>

      {listing && (
        <div className="listing-preview">
          <h3>{listing.title}</h3>
          <img
            src={listing.images?.[0]}
            alt={listing.title}
            style={{ width: "300px", objectFit: "cover", borderRadius: "8px" }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="checkin">Check-in Date:</label>
        <input
          id="checkin"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
        <label htmlFor="checkout">Check-out Date:</label>
        <input
          id="checkout"
          type="date"
          min={checkIn || new Date().toISOString().split("T")[0]}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
        <p>Total Price: ₹{totalPrice}</p>

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
