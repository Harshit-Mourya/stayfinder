import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import GuestDropdown from "./GuestDropdown";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="flex justify-between items-center md:px-6 py-4 px-4  shadow-md bg-white">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="sm:text-2xl sm:font-bold text-blue-600 text-lg font-semibold "
        >
          StayFinder
        </Link>
      </div>

      <div className="flex-grow md:mx-4 md:max-w-md sm:max-w-[16rem] max-w-[10rem] mx-2">
        <input
          type="text"
          placeholder="Search"
          disabled
          className="w-full px-4 py-2 border rounded-md text-gray-500 bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="flex items-center  gap-4 ">
        <p className="sm:text-lg font-semibold text-blue-600 hover:underline sm:mr-4">
          Filters
        </p>

        {isAuthenticated ? <UserDropdown user={user} /> : <GuestDropdown />}
      </div>
    </nav>
  );
};

export default Navbar;
