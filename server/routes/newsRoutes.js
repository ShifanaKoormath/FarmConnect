const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// NewsAPI Fact Check Endpoint
router.post("/check", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    console.log("🔍 Checking news credibility:", text);

    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(text)}&apiKey=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.articles && response.data.articles.length > 0) {
      // Extract relevant information from the first 5 articles
      const formattedArticles = response.data.articles.slice(0, 5).map((article) => ({
        source: article.source.name,
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage,
        publishedAt: article.publishedAt,
      }));

      res.json({ articles: formattedArticles });
    } else {
      res.json({ message: "No fact-checking information available for this news." });
    }
  } catch (error) {
    console.error("❌ NewsAPI Fact Check Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Error checking news credibility", error: error.response?.data || error.message });
  }
});

module.exports = router;
