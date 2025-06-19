import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import GuestDropdown from "./GuestDropdown";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          StayFinder
        </Link>
      </div>

      <div className="flex-grow mx-4 max-w-md">
        <input
          type="text"
          placeholder="Search (Coming soon...)"
          disabled
          className="w-full px-4 py-2 border rounded-md text-gray-500 bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="flex items-center gap-4">
        <p className="text-m font-semibold text-blue-600 hover:underline mr-4">
          Filters
        </p>

        {isAuthenticated ? <UserDropdown user={user} /> : <GuestDropdown />}
      </div>
    </nav>
  );
};

export default Navbar;
