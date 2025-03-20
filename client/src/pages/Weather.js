import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/weather/Malappuram")
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.log("Error fetching weather", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>🌦️ Weather Forecast</h3>
      {weather ? (
        <div className="card mt-3 p-3">
          <p>🌡️ Temperature: <strong>{weather.main.temp}°C</strong></p>
          <p>💧 Humidity: <strong>{weather.main.humidity}%</strong></p>
          <p>🌬️ Wind Speed: <strong>{weather.wind.speed} m/s</strong></p>
        </div>
      ) : <p>Loading weather...</p>}
    </div>
  );
};

export default Weather;
