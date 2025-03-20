import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center">📜 About FarmConnect</h2>
        <p className="mt-3">
          FarmConnect is a smart farming assistant that helps farmers with:
        </p>
        <ul className="list-group mt-3">
          <li className="list-group-item">🌦️ Real-time Weather Forecast</li>
          <li className="list-group-item">📰 News Fact-Checking</li>
          <li className="list-group-item">💰 Crop Price Prediction</li>
          <li className="list-group-item">🤖 Farming Chatbot</li>
          <li className="list-group-item">🐛 Pest Detection & Management</li>
          <li className="list-group-item">💬 Farmers Chatroom</li>
        </ul>
        <p className="mt-3">
          Our goal is to empower farmers with the latest technology and insights.
        </p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/dashboard")}>
          🔙 Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default About;
