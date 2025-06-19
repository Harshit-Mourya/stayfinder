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

  const userBookings = bookings;

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

  if (userBookings.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10 text-lg">
        You haven&#39;t made any bookings yet.
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600 text-center">
        Your Bookings
      </h2>

      {loading && (
        <div className="w-full text-center mt-10">
          <p className="text-xl font-semibold text-gray-700 animate-pulse">
            <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading your
            bookings...
          </p>
        </div>
      )}

      <ul className="space-y-6">
        {userBookings.map((booking) => (
          <li
            key={booking._id}
            className="bg-white shadow rounded-lg p-5 border border-gray-200"
          >
            <p className="text-lg font-semibold text-gray-800 mb-2">
              <i className="fa-solid fa-house-user mr-2 text-blue-500"></i>
              {booking.listing?.title}
            </p>

            <p className="text-base text-gray-700 mb-1">
              <i className="fa-solid fa-calendar-days mr-2 text-gray-500"></i>
              <span className="font-medium">From:</span>{" "}
              {new Date(booking.checkIn).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              <i className="fa-solid fa-arrow-right-long mx-2"></i>
              <span className="font-medium">To:</span>{" "}
              {new Date(booking.checkOut).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>

            <p className="text-base text-gray-700">
              <i className="fa-solid fa-money-bill mr-2 text-green-600"></i>
              <span className="font-medium">Total:</span> ₹{booking.totalPrice}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBookings;
