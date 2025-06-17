import { useState } from "react";
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

  const { status, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchListingById(listingId));
  }, [dispatch, listingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
        <p>Total Price: ₹{totalPrice}</p>

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Booking..." : "Book Now"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
