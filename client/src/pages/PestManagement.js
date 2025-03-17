import React, { useState } from "react";

const PestManagement = () => {
  const [issue, setIssue] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  const checkPestIssue = async () => {
    const response = await fetch("http://localhost:5000/api/pest/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issue }),
    });

    const data = await response.json();
    setRecommendation(data.recommendation);
  };

  return (
    <div className="card p-4 shadow-lg mt-3">
      <h4>🐛 Pest Management</h4>
      <input
        type="text"
        className="form-control"
        placeholder="Describe the issue (e.g., aphids on leaves)"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={checkPestIssue}>
        Check for Pest Solution
      </button>

      {recommendation && (
        <div className="alert alert-success mt-3">
          <strong>Solution:</strong> {recommendation}
        </div>
      )}
    </div>
  );
};

export default PestManagement;
