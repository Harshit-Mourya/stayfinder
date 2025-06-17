import { useSelector } from "react-redux";
import useFetchHostListings from "../hooks/useFetchHostListings";
import { useEffect, useState } from "react";
import HostBookings from "../components/HostBookings.jsx";
import UserBookings from "../components/UserBookings.jsx";
import HostListings from "../components/HostListings.jsx";

const Dashboard = () => {
  const [showPersonalBookings, setShowPersonalBookings] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const { listings, loading, error } = useFetchHostListings();

  const toggleView = () => {
    setShowPersonalBookings((prev) => !prev);
  };

  useEffect(() => {
    console.log("User role:", user?.role);
  }, [user]);

  if (!user || loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name || "Host"}</h2>
      <p>Email: {user.email}</p>
      <p>Your ID: {user._id}</p>

      {user.role === "host" ? (
        <>
          <button onClick={toggleView}>
            {showPersonalBookings ? "My Listings" : "My Bookings"}
          </button>

          {showPersonalBookings ? (
            <UserBookings />
          ) : (
            <>
              <h3>Your Listings</h3>
              <HostListings />

              <HostBookings />
            </>
          )}
        </>
      ) : (
        <>
          <h3>Your Bookings</h3>
          <UserBookings />
        </>
      )}
    </div>
  );
};

export default Dashboard;
