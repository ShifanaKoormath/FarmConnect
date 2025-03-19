const express = require("express");
const axios = require("axios");
const multer = require("multer");
require("dotenv").config();

const router = express.Router();

// ✅ Use memory storage instead of saving files
const upload = multer({ storage: multer.memoryStorage() });

// 🐛 Pest Solutions Database
const pestSolutions = {
  aphids: "Use neem oil or insecticidal soap to control aphids.",
  caterpillars: "Handpick caterpillars or use Bacillus thuringiensis (BT) spray.",
  mites: "Spray a mixture of water and mild dish soap to get rid of spider mites.",
  whiteflies: "Use yellow sticky traps and neem oil to control whiteflies.",
  fungal: "Apply copper-based fungicides or remove affected plants to prevent spread.",
};

// **API 1: Pest Issue Analysis (Text-Based)**
router.post("/check", (req, res) => {
  const { issue } = req.body;

  if (!issue) {
    return res.status(400).json({ message: "Please describe the issue." });
  }

  let recommendation = "No known pest issue detected.";

  for (const pest in pestSolutions) {
    if (issue.toLowerCase().includes(pest)) {
      recommendation = pestSolutions[pest];
      break;
    }
  }

  res.json({ message: "Pest analysis completed", recommendation });
});

// **API 2: Pest Detection via Image (Roboflow)**
router.post("/pest-detection", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      console.error("❌ No image received");
      return res.status(400).json({ message: "No image uploaded" });
    }

    console.log(`✅ Image received: ${req.file.mimetype}, ${req.file.size} bytes`);

    // ✅ Convert Image Buffer to Base64 (Removing Any Line Breaks)
    const imageBase64 = req.file.buffer.toString("base64").replace(/\r?\n|\r/g, ""); // Remove line breaks
const mimeType = req.file.mimetype || "image/jpeg"; // Ensure correct MIME type
const imageData = `data:${mimeType};base64,${imageBase64}`;

    console.log("📸 Sending Image to Roboflow...");

    // ✅ Send request to Roboflow
    const response = await axios.post(
      `https://detect.roboflow.com/pest-detection-m0inx/1?api_key=${process.env.ROBOFLOW_API_KEY}`,
      { image: imageData },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("🔍 Roboflow Response:", response.data);

    const detections = response.data.predictions || [];
    if (!Array.isArray(detections) || detections.length === 0) {
      return res.json({ message: "No pests detected" });
    }

    // ✅ Match detected pests with solutions
    let recommendations = detections.map((pest) => {
      let pestName = pest.class.toLowerCase();
      return {
        pest: pestName,
        confidence: `${(pest.confidence * 100).toFixed(2)}%`, // Format confidence percentage
        solution: pestSolutions[pestName] || "No specific treatment found.",
      };
    });

    res.json({ detectedPests: recommendations });
  } catch (error) {
    console.error("🚨 Pest Detection Error:", error.response ? error.response.data : error.message);
    res.status(500).json({
      message: "Error detecting pests",
      error: error.response ? error.response.data : error.message,
    });
  }
});

module.exports = router;
