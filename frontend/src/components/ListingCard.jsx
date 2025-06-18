// import "./ListingCard.css"; // Optional styling
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <>
      <Link to={`/listing/${listing._id}`}>
        <div className="listing-card">
          <img
            src={listing.images?.[0] || "https://via.placeholder.com/300"}
            alt={listing.title}
            className="listing-image"
          />

          <div className="listing-details">
            <h3 className="text-2xl font-bold">{listing.title}</h3>
            <p className="location">{listing.location}</p>
            <p className="price">₹{listing.price} / night</p>
            <p className="description">{listing.description}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ListingCard;
