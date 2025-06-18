import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings } from "../slices/bookingSlice";

const UserBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const userBookings = bookings.filter((booking) => booking.user === user?._id);

  return (
    <div>
      <h2>Your Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && userBookings.length === 0 ? (
        <p>You haven't made any bookings yet.</p>
      ) : (
        <ul>
          {userBookings.map((booking) => (
            <li key={booking._id}>
              <p>
                Listing: <strong>{booking.listing?.title}</strong>
              </p>
              <p>
                From <strong>{booking.checkIn}</strong> to{" "}
                <strong>{booking.checkOut}</strong>
              </p>
              <p>Total: ₹{booking.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBookings;
