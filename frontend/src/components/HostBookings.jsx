import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostBookings } from "../slices/bookingSlice";

const HostBookings = () => {
  const dispatch = useDispatch();

  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchHostBookings());
  }, [dispatch]);

  const hostBookings = bookings.filter(
    (booking) => booking.listing?.host === user?._id
  );

  return (
    <div>
      <h2>Bookings on Your Listings</h2>
      {hostBookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {hostBookings.map((booking) => (
            <li key={booking._id}>
              <p>
                Listing: <strong>{booking.listing?.title}</strong>
              </p>
              <p>
                Booked from <strong>{booking.checkIn}</strong> to{" "}
                <strong>{booking.checkOut}</strong>
              </p>
              <p>Total Price: ₹{booking.totalPrice}</p>
              <p>Booked by: {booking.user?.name || "Unknown"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HostBookings;
