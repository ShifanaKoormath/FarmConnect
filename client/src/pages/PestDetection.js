import React, { useState } from "react";

const PestDetection = () => {
  const [issueText, setIssueText] = useState("");
  const [cropName, setCropName] = useState("");
  const [textAnalysis, setTextAnalysis] = useState(null);

  // Send text input to backend for issue analysis
  const handleAnalyzeIssue = async () => {
    if (!issueText || !cropName) {
      alert("❌ Please enter pest and crop name.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/pest/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issue: issueText, crop: cropName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setTextAnalysis(data);
    } catch (error) {
      console.error("🚨 Error analyzing pest issue:", error);
      alert("Failed to analyze pest issue.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>🐛 Pest Management</h3>

      {/* 🔎 Text-Based Pest Issue Analysis */}
      <div className="mt-3">
        <h5>🔎 Enter Pest Name & Crop</h5>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="E.g., Aphids"
          value={issueText}
          onChange={(e) => setIssueText(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="E.g., Wheat"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
        />
        <button className="btn btn-warning mt-2" onClick={handleAnalyzeIssue}>
          Analyze Issue
        </button>
      </div>

      {/* 📝 Display Analysis Result */}
      {textAnalysis && (
        <div className="card mt-3 p-3">
          <h5>📝 Analysis Result:</h5>
          <p>{textAnalysis.recommendation || textAnalysis.message}</p>
        </div>
      )}

      {/* 🔗 Redirect to Online Pest Detection */}
      <div className="mt-4">
        <h4>🐛 Detect Pests Using Images</h4>
        <p>Use AI to detect pests by uploading an image.</p>
        <a
          href="https://universe.roboflow.com/intern-tvkth/pest-detection-m0inx"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-2"
        >
          Detect Pests Online
        </a>
      </div>
    </div>
  );
};

export default PestDetection;
