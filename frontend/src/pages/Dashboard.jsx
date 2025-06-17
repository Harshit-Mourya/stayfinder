import { useSelector } from "react-redux";
import useFetchHostListings from "../hooks/useFetchHostListings";
import { useEffect } from "react";
import ListingCard from "../components/ListingCard.jsx";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { listings, loading, error } = useFetchHostListings();

  useEffect(() => {
    console.log("User role:", user?.role);
  }, [user]);

  if (!user || loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name || "Host"} 👋</h2>
      <p>Email: {user.email}</p>
      <p>Host ID: {user._id}</p>
      <h3>Your Listings</h3>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
