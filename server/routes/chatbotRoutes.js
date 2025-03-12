const express = require("express");
const router = express.Router();

// Simple predefined responses for common farming questions
const chatbotResponses = {
  "best crops for summer": "For summer, crops like maize, watermelon, and tomatoes grow well.",
  "how to prevent pests": "Use organic pesticides like neem oil and maintain proper crop rotation.",
  "best fertilizers for rice": "Urea and DAP fertilizers are commonly used for rice cultivation.",
  "how to improve soil fertility": "Use compost, crop rotation, and organic manure to improve soil health.",
};

// Chatbot API endpoint
router.post("/", (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Please enter a question." });
  }

  const lowerCaseQuestion = question.toLowerCase();
  const response = chatbotResponses[lowerCaseQuestion] || "Sorry, I don't have an answer for that. Try another question.";

  res.json({ question, response });
});

module.exports = router;
