const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// 🐛 Pest Solutions Database (Local)
const pestSolutions = {
  aphids: "Use neem oil or insecticidal soap to control aphids.",
  caterpillars: "Handpick caterpillars or use Bacillus thuringiensis (BT) spray.",
  mites: "Spray a mixture of water and mild dish soap to get rid of spider mites.",
  whiteflies: "Use yellow sticky traps and neem oil to control whiteflies.",
  fungal: "Apply copper-based fungicides or remove affected plants to prevent spread.",
};

// **✅ API: Pest Issue Analysis (Text-Based - Local + Kindwise API)**
router.post("/check", async (req, res) => {
  const { issue, crop } = req.body;

  if (!issue) {
    return res.status(400).json({ message: "❌ Please describe the issue." });
  }

  let recommendation = "No known pest issue detected.";

  // ✅ Check Local Pest Database First
  for (const pest in pestSolutions) {
    if (issue.toLowerCase().includes(pest)) {
      recommendation = pestSolutions[pest];
      return res.json({ message: "✅ Pest analysis completed", recommendation });
    }
  }

  // 🔍 Call Kindwise API if crop is provided
  if (crop) {
    try {
      console.log(`🌱 Fetching pest details from Kindwise API for crop: ${crop}, pest: ${issue}`);

      const response = await axios.get(`${process.env.KINDWISE_API_URL}/pests`, {
        params: { crop, pest: issue },
        headers: { Authorization: `Bearer ${process.env.KINDWISE_API_KEY}` },
      });

      if (response.data && response.data.pest_details) {
        return res.json({ message: "✅ Pest details retrieved from Kindwise API", data: response.data.pest_details });
      }
    } catch (error) {
      console.error("🚨 Kindwise API Error:", error.response?.data || error.message);
    }
  }

  res.json({ message: "⚠️ No specific treatment found in local database or Kindwise API." });
});

// ❌ Removed: Image-based Pest Detection (Roboflow API)

module.exports = router;
