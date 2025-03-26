const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const userMessage = req.body.message;
        let chatbotReply = [];

        const pythonScript = path.resolve(__dirname, "../chatbot.py");

        const pythonProcess = spawn("python", [pythonScript, userMessage]);

        pythonProcess.stdout.on("data", (data) => {
            chatbotReply.push(data);
        });

        pythonProcess.stderr.on("data", (error) => {
            console.error("🔴 Chatbot Error:", error.toString());
        });

        pythonProcess.on("close", (code) => {
            if (code !== 0) {
                console.error(`⚠️ Chatbot process exited with code ${code}`);
                return res.status(500).json({ error: "Chatbot process failed" });
            }
            
            let finalReply = Buffer.concat(chatbotReply).toString().trim();
            finalReply = finalReply.replace(/\s{2,}/g, " ");  // ✅ Remove extra spaces

            // ✅ Ensure proper JSON response format
            res.json({ reply: finalReply });
        });

    } catch (error) {
        console.error("🚨 Chatbot Communication Error:", error);
        res.status(500).json({ error: "Chatbot service is unavailable" });
    }
});

module.exports = router;
