const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const weatherRoutes = require("./routes/weatherRoutes");
app.use("/api/weather", weatherRoutes);
const newsRoutes = require("./routes/newsRoutes");
app.use("/api/news", newsRoutes);
const cropPriceRoutes = require("./routes/cropPriceRoutes");
app.use("/api/crop-price", cropPriceRoutes);
const chatbotRoutes = require("./routes/chatbotRoutes"); 

app.use("/api/chatbot", chatbotRoutes); 
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Default route
app.get("/", (req, res) => {
    res.send("FarmConnect Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
