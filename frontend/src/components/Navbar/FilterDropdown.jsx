import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterDropdown = ({ onClose }) => {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleApply = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);

    navigate("/?" + params.toString());

    onClose(); // close dropdown
  };

  return (
    <div className="absolute right-1 top-full mt-2 w-80 bg-white shadow-lg rounded-xl p-4 z-50">
      <div className="mb-4">
        <label className="block font-medium mb-1">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Goa"
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4 flex gap-2">
        <div className="flex-1">
          <label className="block font-medium mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Check In</label>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Check Out</label>
        <input
          type="date"
          min={checkIn || new Date().toISOString().split("T")[0]}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterDropdown;
