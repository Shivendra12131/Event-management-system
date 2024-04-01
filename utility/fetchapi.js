const axios = require("axios");
function formatDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+00:00`;
  }
  
function formatDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000+00:00`;
  }

const fetchWeather = async (city, date) => {
    try {
      const response = await axios.get(process.env.WEATHER_URL, {
        params: {
          code: process.env.WEATHER_API_KEY,
          city: city,
          // city,
          date: date.toISOString().slice(0, 10), // Format date to YYYY-MM-DD
        },
      });
      return response.data.weather; // Assuming weather data is provided in the response
    } catch (error) {
      console.error("Error fetching weather:", error);
      return "Unknown";
    }
  };
  
  const calculateDistance = async (
    latitude1,
    longitude1,
    latitude2,
    longitude2
  ) => {
    try {
      const response = await axios.get(process.env.DISTANCE_URL, {
        params: {
          code: process.env.DISTANCE_API_KEY,
          latitude1,
          longitude1,
          latitude2,
          longitude2,
        },
      });
      return response.data.distance;
    } catch (error) {
      console.error("Error calculating distance:", error);
      return "Unknown";
    }
  };

  module.exports={
    calculateDistance,
    fetchWeather,
    formatDate
  }