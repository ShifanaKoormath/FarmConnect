const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();

// ✅ API Route to Check Pest Issue
router.post("/check", (req, res) => {
  const { issue } = req.body;

  if (!issue || issue.trim() === "") {
    return res.status(400).json({ message: "❌ Please provide a pest description." });
  }

  try {
    // ✅ Detect Python executable (change to "python3" if needed)
    const pythonCmd = process.env.PYTHON || "python";

    // ✅ Run the Python script with the full issue description
    const pythonProcess = spawn(pythonCmd, ["pest_model.py", issue]);

    let result = "";
    let errorOutput = "";

    // ✅ Collect data from Python script
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    // ✅ Collect error messages from Python script
    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    // ✅ Handle process exit
    pythonProcess.on("close", (code) => {
      if (errorOutput) {
        console.error("🚨 Python Script Error:", errorOutput);
        return res.status(500).json({ message: "⚠️ Pest analysis failed.", error: errorOutput });
      }

      try {
        // ✅ Ensure valid JSON response
        const parsedResult = JSON.parse(result.trim());

        res.json({
          message: "✅ Pest analysis completed",
          recommendation: parsedResult.solution || "No solution found.",
        });
      } catch (error) {
        console.error("🚨 JSON Parsing Error:", error.message, "Data received:", result);
        res.status(500).json({ message: "⚠️ Pest analysis failed. Invalid response format." });
      }
    });
  } catch (error) {
    console.error("🚨 Error running Python script:", error.message);
    res.status(500).json({ message: "⚠️ Pest analysis failed." });
  }
});

module.exports = router;
