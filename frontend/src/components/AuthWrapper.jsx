import useAutoLogin from "../hooks/useAutoLogin";

const AuthWrapper = ({ children }) => {
  useAutoLogin();
  return children;
};

export default AuthWrapper;
