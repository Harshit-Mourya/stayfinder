import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user, initialized } = useSelector(
    (state) => state.auth
  );

  // console.log(
  //   "isAuthenticated: ",
  //   isAuthenticated,
  //   " user: ",
  //   user,
  //   " initialized: ",
  //   initialized
  // );

  if (!initialized) return <p>Loading...</p>;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
