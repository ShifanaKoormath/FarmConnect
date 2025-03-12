const express = require("express");
const router = express.Router();

// Sample crop price data (mock data)
const cropPrices = {
  wheat: { currentPrice: 2200, predictedPrice: 2300, unit: "₹ per quintal" },
  rice: { currentPrice: 1800, predictedPrice: 1900, unit: "₹ per quintal" },
  maize: { currentPrice: 1600, predictedPrice: 1650, unit: "₹ per quintal" },
  sugarcane: { currentPrice: 2900, predictedPrice: 2950, unit: "₹ per quintal" },
  cotton: { currentPrice: 6500, predictedPrice: 6700, unit: "₹ per quintal" },
};

// Route to get price prediction
router.get("/:cropName", (req, res) => {
  const cropName = req.params.cropName.toLowerCase();
  if (cropPrices[cropName]) {
    res.json({ crop: cropName, ...cropPrices[cropName] });
  } else {
    res.status(404).json({ message: "Crop price data not available" });
  }
});

module.exports = router;
