import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import HostListings from "../components/HostListings.jsx";
import HostBookings from "../components/HostBookings.jsx";
import UserBookings from "../components/UserBookings.jsx";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("listings");

  useEffect(() => {
    if (user?.role !== "host") {
      setActiveTab("my-bookings"); // for normal user by default
    }
  }, [user]);

  if (!user) return <p>Loading...</p>;

  const isHost = user.role === "host";

  return (
    <div className="dashboard-container p-4">
      <h2 className="text-xl font-bold mb-2">Welcome, {user.name}</h2>
      <p className="mb-1">Email: {user.email}</p>
      <p className="mb-4">Your ID: {user._id}</p>

      {/* Mini tab-style navbar */}
      <div className="flex gap-4 mb-6">
        {isHost && (
          <>
            <button
              onClick={() => setActiveTab("listings")}
              className={`px-4 py-2 rounded ${
                activeTab === "listings"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              My Listings
            </button>

            <button
              onClick={() => setActiveTab("host-bookings")}
              className={`px-4 py-2 rounded ${
                activeTab === "host-bookings"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Bookings on My Listings
            </button>
          </>
        )}

        <button
          onClick={() => setActiveTab("my-bookings")}
          className={`px-4 py-2 rounded ${
            activeTab === "my-bookings"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          My Bookings
        </button>
      </div>

      {/* Content rendering based on tab */}
      <div>
        {activeTab === "listings" && isHost && <HostListings />}
        {activeTab === "host-bookings" && isHost && <HostBookings />}
        {activeTab === "my-bookings" && <UserBookings />}
      </div>
    </div>
  );
};

export default Dashboard;
