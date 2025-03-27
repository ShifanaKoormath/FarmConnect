const express = require("express");
const router = express.Router();

const cropPrices = {
  // Grains & Cereals
  wheat: { currentPrice: 22, predictedPrice: 23, unit: "₹ per kg" },
  rice: { currentPrice: 18, predictedPrice: 19, unit: "₹ per kg" },
  maize: { currentPrice: 16, predictedPrice: 16.5, unit: "₹ per kg" },
  barley: { currentPrice: 19, predictedPrice: 20, unit: "₹ per kg" },
  millet: { currentPrice: 17, predictedPrice: 18, unit: "₹ per kg" },
  sorghum: { currentPrice: 18, predictedPrice: 18.5, unit: "₹ per kg" },
  oats: { currentPrice: 25, predictedPrice: 26, unit: "₹ per kg" },

  // Pulses & Legumes
  toorDal: { currentPrice: 90, predictedPrice: 95, unit: "₹ per kg" },
  uradDal: { currentPrice: 100, predictedPrice: 105, unit: "₹ per kg" },
  moongDal: { currentPrice: 95, predictedPrice: 100, unit: "₹ per kg" },
  chanaDal: { currentPrice: 75, predictedPrice: 78, unit: "₹ per kg" },
  lentil: { currentPrice: 80, predictedPrice: 85, unit: "₹ per kg" },
  rajma: { currentPrice: 120, predictedPrice: 125, unit: "₹ per kg" },
  soya: { currentPrice: 45, predictedPrice: 46, unit: "₹ per kg" },

  // Oilseeds
  mustard: { currentPrice: 48, predictedPrice: 49, unit: "₹ per kg" },
  groundnut: { currentPrice: 52, predictedPrice: 53, unit: "₹ per kg" },
  sunflower: { currentPrice: 50, predictedPrice: 51, unit: "₹ per kg" },
  sesame: { currentPrice: 55, predictedPrice: 57, unit: "₹ per kg" },
  flax: { currentPrice: 58, predictedPrice: 60, unit: "₹ per kg" },

  // Root Vegetables
  potato: { currentPrice: 14, predictedPrice: 15, unit: "₹ per kg" },
  shakarkand: { currentPrice: 25, predictedPrice: 26, unit: "₹ per kg" },
  onion: { currentPrice: 20, predictedPrice: 21, unit: "₹ per kg" },
  garlic: { currentPrice: 200, predictedPrice: 220, unit: "₹ per kg" },
  ginger: { currentPrice: 250, predictedPrice: 270, unit: "₹ per kg" },
  radish: { currentPrice: 15, predictedPrice: 16, unit: "₹ per kg" },
  carrot: { currentPrice: 30, predictedPrice: 32, unit: "₹ per kg" },
  beetroot: { currentPrice: 35, predictedPrice: 37, unit: "₹ per kg" },

  // Leafy Greens
  spinach: { currentPrice: 20, predictedPrice: 22, unit: "₹ per kg" },
  methi: { currentPrice: 25, predictedPrice: 27, unit: "₹ per kg" },
  coriander: { currentPrice: 50, predictedPrice: 55, unit: "₹ per kg" },
  mint: { currentPrice: 60, predictedPrice: 65, unit: "₹ per kg" },
  kadiPatta: { currentPrice: 70, predictedPrice: 75, unit: "₹ per kg" },

  // Other Vegetables
  tomato: { currentPrice: 24, predictedPrice: 25, unit: "₹ per kg" },
  eggplant: { currentPrice: 35, predictedPrice: 38, unit: "₹ per kg" },
  cucumber: { currentPrice: 20, predictedPrice: 22, unit: "₹ per kg" },
  pumpkin: { currentPrice: 18, predictedPrice: 19, unit: "₹ per kg" },
  lauki: { currentPrice: 25, predictedPrice: 27, unit: "₹ per kg" },
  karela: { currentPrice: 50, predictedPrice: 52, unit: "₹ per kg" },
  turai: { currentPrice: 40, predictedPrice: 42, unit: "₹ per kg" },
  chichinda: { currentPrice: 45, predictedPrice: 48, unit: "₹ per kg" },
  cabbage: { currentPrice: 30, predictedPrice: 32, unit: "₹ per kg" },
  cauliflower: { currentPrice: 40, predictedPrice: 42, unit: "₹ per kg" },
  ladyfinger: { currentPrice: 45, predictedPrice: 47, unit: "₹ per kg" },
  bellPepper: { currentPrice: 60, predictedPrice: 65, unit: "₹ per kg" },
  chili: { currentPrice: 80, predictedPrice: 85, unit: "₹ per kg" },
  peas: { currentPrice: 90, predictedPrice: 95, unit: "₹ per kg" },

  // Spices
  turmeric: { currentPrice: 150, predictedPrice: 160, unit: "₹ per kg" },
  jeera: { currentPrice: 160, predictedPrice: 170, unit: "₹ per kg" },
  saunf: { currentPrice: 120, predictedPrice: 130, unit: "₹ per kg" },
  dhania: { currentPrice: 100, predictedPrice: 110, unit: "₹ per kg" },
  kaliMirch: { currentPrice: 800, predictedPrice: 850, unit: "₹ per kg" },
  elaichi: { currentPrice: 1500, predictedPrice: 1600, unit: "₹ per kg" },
  laung: { currentPrice: 1000, predictedPrice: 1100, unit: "₹ per kg" },
  dalchini: { currentPrice: 900, predictedPrice: 950, unit: "₹ per kg" }
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
