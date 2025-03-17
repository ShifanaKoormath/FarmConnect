const express = require("express");
const router = express.Router();

const pestSolutions = {
  "aphids": "Use neem oil or insecticidal soap to control aphids.",
  "caterpillars": "Handpick caterpillars or use Bacillus thuringiensis (BT) spray.",
  "mites": "Spray a mixture of water and mild dish soap to get rid of spider mites.",
  "whiteflies": "Use yellow sticky traps and neem oil to control whiteflies.",
  "fungal": "Apply copper-based fungicides or remove affected plants to prevent spread.",
};

// API to check pest issue
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

module.exports = router;
