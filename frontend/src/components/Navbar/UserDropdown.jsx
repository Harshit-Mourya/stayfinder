import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { toast } from "react-toastify";

const UserDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");

    setTimeout(() => {
      dispatch(logout());

      toast.success("You have been logged out successfully!");
    }, 5);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm font-medium text-gray-700 hover:text-blue-600 sm:text-lg"
      >
        <i className="fa-solid fa-user mr-2"></i>
        <span className="sm:inline hidden">{user?.name || "User"}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
          <div className="px-4 py-2 text-s text-gray-500 border-b">
            {user?.email}
          </div>

          <button
            onClick={() => {
              navigate("/dashboard");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-m hover:bg-gray-100"
          >
            Dashboard
          </button>

          {user?.role === "host" && (
            <button
              onClick={() => {
                navigate("/createlisting");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-m hover:bg-gray-100"
            >
              Create Listing
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-m text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
