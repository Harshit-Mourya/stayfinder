// import "./ListingCard.css"; // Optional styling

const ListingCard = ({ listing }) => {
  return (
    <div className="listing-card">
      <img
        src={listing.images?.[0] || "https://via.placeholder.com/300"}
        alt={listing.title}
        className="listing-image"
      />

      <div className="listing-details">
        <h3>{listing.title}</h3>
        <p className="location">{listing.location}</p>
        <p className="price">₹{listing.price} / night</p>
        <p className="description">{listing.description}</p>
      </div>
    </div>
  );
};

export default ListingCard;
