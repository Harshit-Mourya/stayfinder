import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBooking } from "../slices/bookingSlice";
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const bookingDetails = location.state;

  useEffect(() => {
    if (!bookingDetails) {
      toast.error("Missing booking details. Redirecting...");
      navigate("/");
    }
  }, [bookingDetails, navigate]);

  const handlePayment = async () => {
    const success = Math.random() > 0.2;

    if (!success) {
      toast.error("Payment failed. Please try again.");
      return navigate(`/book/${bookingDetails.listing}`);
    }

    // simulate: payment succeeded, now try booking
    const resultAction = await dispatch(
      createBooking({
        listing: bookingDetails.listing,
        checkIn: bookingDetails.checkIn,
        checkOut: bookingDetails.checkOut,
        totalPrice: bookingDetails.totalPrice,
      })
    );

    if (createBooking.fulfilled.match(resultAction)) {
      toast.success("Payment successful! Booking confirmed.");
      navigate("/dashboard");
    } else {
      toast.error(
        "Payment captured but booking failed! Please contact support."
      );
      navigate(`/book/${bookingDetails.listing}`);
    }
  };

  if (!bookingDetails) return null;

  const { title, image, checkIn, checkOut, totalPrice } = bookingDetails;

  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Confirm Payment
        </h2>
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover rounded"
            />
          )}
        </div>
        <p className="mb-2">
          <strong>Check-in:</strong> {checkIn}
        </p>
        <p className="mb-2">
          <strong>Check-out:</strong> {checkOut}
        </p>
        <p className="mb-4">
          <strong>Total Price:</strong> ₹{totalPrice}
        </p>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
        >
          Pay ₹{totalPrice}
        </button>
      </div>
    </div>
  );
};

export default Payment;
