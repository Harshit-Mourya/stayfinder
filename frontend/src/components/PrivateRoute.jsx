import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, initialized } = useSelector(
    (state) => state.auth
  );

  console.log(
    "isAuthenticated: ",
    isAuthenticated,
    " user: ",
    user,
    " initialized: ",
    initialized
  );

  if (!initialized) return <p>Loading...</p>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
