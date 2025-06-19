// import "./ListingCard.css"; // Optional styling
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <>
      <Link to={`/listing/${listing._id}`}>
        <div className="listing-card bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">
          <img
            src={listing.images?.[0] || "https://via.placeholder.com/300"}
            alt={listing.title}
            className="listing-image h-48 w-full object-cover"
          />

          <div className="listing-details p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {listing.title}
            </h3>
            <p className="location text-sm text-gray-500 truncate">
              {listing.location}
            </p>
            <p className="price text-md font-bold text-green-600">
              ₹{listing.price} / night
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ListingCard;
