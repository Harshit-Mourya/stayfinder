import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <Link to="/" className="flex items-center space-x-2 mb-3">
            <img
              src="/stayfindericon.png"
              alt="StayFinder Logo"
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold">StayFinder</span>
          </Link>
          <p className="text-sm text-white/80">
            Your trusted platform for finding and listing stays.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Connect</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li>Email: stayfinder@example.com</li>
            <li>Phone: +91-1234567890</li>
            <li className="flex gap-4 mt-2 text-lg">
              <a
                href="https://github.com/Harshit-Mourya"
                className="hover:text-white"
                target="_blank"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/mourya-harshit/"
                className="hover:text-white"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-white/80 py-4 border-t border-white/20">
        © {new Date().getFullYear()} StayFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
