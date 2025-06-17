import { useMemo } from "react";

const useTotalPrice = (checkIn, checkOut, pricePerNight) => {
  return useMemo(() => {
    if (!checkIn || !checkOut || !pricePerNight) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;

    if (diffTime <= 0) return 0;

    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nights * pricePerNight;
  }, [checkIn, checkOut, pricePerNight]);
};

export default useTotalPrice;
