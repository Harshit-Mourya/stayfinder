import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import axiosInstance from "../utils/axiosInstance";

const useAutoLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axiosInstance.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(res.data.user));
      } catch (err) {
        console.error("Auto-login failed!");
        dispatch(logout());
      }
    };

    checkAuth();
  }, [dispatch]);
};

export default useAutoLogin;
