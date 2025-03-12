const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Get Weather Data
router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

module.exports = router;
