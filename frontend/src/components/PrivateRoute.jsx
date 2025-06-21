import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, initialized } = useSelector(
    (state) => state.auth
  );

  if (!initialized)
    return (
      <div className="w-full text-center my-5">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          <i className="fa-solid fa-spinner fa-spin mr-2"></i>Loading...
        </p>
      </div>
    );

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
