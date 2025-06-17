import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../slices/authSlice";
import { setInitialized } from "../slices/authSlice";

const useAutoLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchCurrentUser()).finally(() => dispatch(setInitialized()));
    } else {
      dispatch(setInitialized());
    }
  }, [dispatch]);
};

export default useAutoLogin;
