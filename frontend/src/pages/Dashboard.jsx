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

  if (!user) {
    return (
      <div className="w-full text-center my-5">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading...
        </p>
      </div>
    );
  }
  const isHost = user.role === "host";

  return (
    <div className="dashboard-container p-4">
      <h2 className="text-2xl text-center font-bold mb-4">
        Welcome, {user.name}
      </h2>

      <div className="flex justify-between gap-6 mb-6 flex-wrap mt-5 sm:justify-center w-full sm:w-auto">
        {isHost && (
          <>
            <button
              onClick={() => setActiveTab("listings")}
              className={`px-4 py-2 rounded-md    flex-1 sm:flex-none   sm:text-base ${
                activeTab === "listings"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              My Listings
            </button>

            <button
              onClick={() => setActiveTab("host-bookings")}
              className={`px-4 py-2 rounded-md flex-1 sm:flex-none  sm:text-base ${
                activeTab === "host-bookings"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Bookings on My Listings
            </button>
          </>
        )}

        <button
          onClick={() => setActiveTab("my-bookings")}
          className={`px-4 py-2 rounded-md flex-1 sm:flex-none   sm:text-base ${
            !isHost ? "hidden" : ""
          } ${
            activeTab === "my-bookings"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          My Bookings
        </button>
      </div>

      <div>
        {activeTab === "listings" && isHost && <HostListings />}
        {activeTab === "host-bookings" && isHost && <HostBookings />}
        {activeTab === "my-bookings" && <UserBookings />}
      </div>
    </div>
  );
};

export default Dashboard;
