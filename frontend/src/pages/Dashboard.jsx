import { useSelector } from "react-redux";
import useFetchHostListings from "../hooks/useFetchHostListings";
import { useEffect } from "react";

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
            <li key={listing._id}>
              <h4>{listing.title}</h4>
              <p>{listing.description}</p>

              <p>{listing.location}</p>
              <p>Price: ₹{listing.price}</p>
              <img src={listing.images[0]} alt={listing.title} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
