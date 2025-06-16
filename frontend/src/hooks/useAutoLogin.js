import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../slices/authSlice"; // path as per your project
import { setInitialized } from "../slices/authSlice";

const useAutoLogin = () => {
  console.log("inside auotologin");

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("inside autologin: ", token);

    if (token) {
      // axiosInstance should already include token in headers
      dispatch(fetchCurrentUser()).finally(() => dispatch(setInitialized()));
    } else {
      dispatch(setInitialized()); // still mark as initialized if no token
    }
  }, [dispatch]);
};

export default useAutoLogin;
