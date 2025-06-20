import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";
    setSearchQuery(query);
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/?search=${encodeURIComponent(trimmedQuery)}`);
    } else {
      navigate("/"); // clear search
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-stretch gap-2 w-full">
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 "
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default SearchBar;
