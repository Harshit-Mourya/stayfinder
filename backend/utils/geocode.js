import axios from "axios";

export const geocodeLocation = async (location) => {
  try {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      location
    )}&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data && data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error("No coordinates found for this location.");
    }
  } catch (error) {
    console.error("Geocoding error:", error.message);
    return null;
  }
};
