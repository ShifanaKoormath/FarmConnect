import React, { useState } from "react";

const PestDetection = () => {
  const [image, setImage] = useState(null);
  const [issueText, setIssueText] = useState("");
  const [detectionResult, setDetectionResult] = useState(null);
  const [textAnalysis, setTextAnalysis] = useState(null);

  // Handle file upload
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  // Send image to backend for pest detection
  const handleDetectPest = async () => {
    if (!image) {
      alert("❌ Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/pest/pest-detection", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setDetectionResult(data);
    } catch (error) {
      console.error("🚨 Error detecting pest:", error);
      alert("Failed to detect pests. Please check backend logs.");
    }
  };

  // Send text input to backend for issue analysis
  const handleAnalyzeIssue = async () => {
    if (!issueText) {
      alert("❌ Please describe the issue.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/pest/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issue: issueText }),
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
      <h3>🐛 Pest Detection & Management</h3>

      {/* Text-Based Pest Issue Analysis */}
      <div className="mt-3">
        <h5>🔎 Describe Your Pest Issue</h5>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="E.g., Leaves have whiteflies..."
          value={issueText}
          onChange={(e) => setIssueText(e.target.value)}
        />
        <button className="btn btn-warning mt-2" onClick={handleAnalyzeIssue}>
          Analyze Issue
        </button>
      </div>

      {textAnalysis && (
        <div className="card mt-3 p-3">
          <h5>📝 Analysis Result:</h5>
          <p>{textAnalysis.recommendation}</p>
        </div>
      )}

      {/* Image-Based Pest Detection */}
      <div className="mt-4">
        <h5>📸 Detect Pests in Images</h5>
        <input type="file" className="form-control mt-2" onChange={handleImageUpload} />
        <button className="btn btn-primary mt-2" onClick={handleDetectPest}>
          Detect Pest
        </button>
      </div>

      {detectionResult && (
        <div className="card mt-3 p-3">
          <h5>🐛 Pest Detection Result:</h5>
          {detectionResult.detectedPests ? (
            detectionResult.detectedPests.map((pest, index) => (
              <p key={index}>
                <strong>{pest.pest}</strong>: {pest.solution}
              </p>
            ))
          ) : (
            <p>{detectionResult.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PestDetection;
