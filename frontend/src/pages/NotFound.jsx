import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex flex-col justify-center items-center min-h-[90vh] text-center px-4">
    <h2 className="text-4xl font-bold text-red-600 mb-4">
      <i className="fa-solid fa-ban mr-2"></i>
      404 - Page Not Found
    </h2>
    <p className="text-gray-600 text-lg mb-4">
      Sorry{" "}
      <span role="img" aria-label="confused">
        😕
      </span>
      , the page you&#39;re looking for doesn&#39;t exist.
    </p>
    <p className="text-blue-600 text-sm">
      <Link to="/" className="underline hover:text-blue-700">
        Go back home
      </Link>
    </p>
  </div>
);

export default NotFound;
