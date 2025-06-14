import { useSelector } from "react-redux";
import useFetchHostListings from "../hooks/useFetchHostListings";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { listings, loading, error } = useFetchHostListings();

  if (!user || loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username || user.name || "Host"} 👋</h2>
      <p>Email: {user.email}</p>
      <p>Host ID: {user._id}</p>
      <h3>Your Listings</h3>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <li key={listing._id}>
              <strong>{listing.title}</strong> — ₹{listing.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
