import { useState } from "react";
import { Link } from "react-router-dom";

const GuestDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 text-blue-600 font-semibold hover:underline"
      >
        Account <i className="fa-solid fa-chevron-down ml-1" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
          <Link
            to="/login"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default GuestDropdown;
