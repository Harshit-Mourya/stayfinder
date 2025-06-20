import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import GuestDropdown from "./GuestDropdown";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";

const Navbar = () => {
  const [showFilters, setShowFilters] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="px-4 md:px-6 py-4 shadow-md bg-white relative">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link
          to="/"
          className="text-lg sm:text-2xl font-semibold text-blue-600 whitespace-nowrap"
        >
          StayFinder
        </Link>

        <div className="hidden sm:block sm:flex-grow sm:max-w-md lg:max-w-lg">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3">
          <p
            className="text-blue-600 font-semibold cursor-pointer hover:underline mr-2 sm:text-lg text-base"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filters
          </p>
          {isAuthenticated ? <UserDropdown user={user} /> : <GuestDropdown />}
        </div>
      </div>

      <div className="block sm:hidden mt-3">
        <SearchBar />
      </div>

      {showFilters && (
        <div className="absolute top-full right-4 mt-2 z-50">
          <FilterDropdown onClose={() => setShowFilters(false)} />
        </div>
      )}
    </nav>
  );

  // return (
  //   <nav className="flex justify-between items-center md:px-6 py-4 px-4  shadow-md bg-white relative gap-2 flex-wrap">
  //     <Link
  //       to="/"
  //       className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600 whitespace-nowrap "
  //     >
  //       StayFinder
  //     </Link>

  //     <div className="flex-grow max-w-[300px] sm:max-w-sm md:max-w-md">
  //       <SearchBar />
  //     </div>

  //     <div className="flex items-center  gap-3 whitespace-nowrap ">
  //       <p
  //         className="text-blue-600 font-semibold cursor-pointer hover:underline"
  //         onClick={() => setShowFilters((prev) => !prev)}
  //       >
  //         Filters
  //       </p>

  //       {isAuthenticated ? <UserDropdown user={user} /> : <GuestDropdown />}
  //     </div>
  //     {showFilters && <FilterDropdown onClose={() => setShowFilters(false)} />}
  //   </nav>
  // );
};

export default Navbar;
