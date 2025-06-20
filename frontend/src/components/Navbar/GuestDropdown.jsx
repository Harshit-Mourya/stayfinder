import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GuestDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="lg:px-4  text-blue-600 font-semibold hover:underline  sm:text-lg text-base"
      >
        <span className="sm:inline hidden">
          Account&nbsp;
          <i className="fa-solid fa-chevron-down ml-1 " />
        </span>
        <span className="sm:hidden inline">
          <i className="fa-solid fa-user ml-1 " />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2  w-24 bg-white border rounded-md shadow-md z-50">
          <button
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-m hover:bg-gray-100"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/register");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-m hover:bg-gray-100"
          >
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestDropdown;
