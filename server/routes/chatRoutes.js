const express = require("express");
const ChatMessage = require("../models/ChatMessage");
const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// Send a new message
router.post("/send", async (req, res) => {
  try {
    const { sender, message } = req.body;
    if (!sender || !message) {
      return res.status(400).json({ message: "Sender and message are required" });
    }

    const newMessage = new ChatMessage({ sender, message });
    await newMessage.save();
    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending message" });
  }
});

module.exports = router;  // ✅ Ensure the router is exported properly
