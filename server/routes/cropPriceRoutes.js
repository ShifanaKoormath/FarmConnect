const express = require("express");
const router = express.Router();

const cropPrices = {
  wheat: { currentPrice: 2200, predictedPrice: 2300, unit: "₹ per quintal" },
  rice: { currentPrice: 1800, predictedPrice: 1900, unit: "₹ per quintal" },
  maize: { currentPrice: 1600, predictedPrice: 1650, unit: "₹ per quintal" },
  sugarcane: { currentPrice: 2900, predictedPrice: 2950, unit: "₹ per quintal" },
  cotton: { currentPrice: 6500, predictedPrice: 6700, unit: "₹ per quintal" },
  barley: { currentPrice: 1900, predictedPrice: 2000, unit: "₹ per quintal" },
  soybean: { currentPrice: 4500, predictedPrice: 4600, unit: "₹ per quintal" },
  groundnut: { currentPrice: 5200, predictedPrice: 5300, unit: "₹ per quintal" },
  mustard: { currentPrice: 4800, predictedPrice: 4900, unit: "₹ per quintal" },
  sunflower: { currentPrice: 5000, predictedPrice: 5100, unit: "₹ per quintal" },
  bajra: { currentPrice: 1700, predictedPrice: 1750, unit: "₹ per quintal" },
  jowar: { currentPrice: 1800, predictedPrice: 1850, unit: "₹ per quintal" },
  potato: { currentPrice: 1400, predictedPrice: 1450, unit: "₹ per quintal" },
  tomato: { currentPrice: 2400, predictedPrice: 2500, unit: "₹ per quintal" },
  onion: { currentPrice: 2000, predictedPrice: 2100, unit: "₹ per quintal" },
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
