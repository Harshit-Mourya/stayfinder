import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const useFetchHostListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/listings/host");

        setListings(res.data);
      } catch (err) {
        setError("Failed to fetch host listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return { listings, loading, error };
};

export default useFetchHostListings;
