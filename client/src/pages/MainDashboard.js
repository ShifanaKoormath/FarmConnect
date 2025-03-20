import React from "react";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const navigate = useNavigate();

  const features = [
    { name: "Weather Forecast", path: "/weather", icon: "🌦️" },
    { name: "Crop Price Prediction", path: "/crop-price", icon: "💰" },
    { name: "News Fact-Checking", path: "/news", icon: "📰" },
    { name: "Pest Detection", path: "/pest", icon: "🐛" },
    { name: "Chat System", path: "/chat", icon: "💬" },
    { name: "Farming Chatbot", path: "/chatbot", icon: "🤖" },
    { name: "About Project", path: "/about", icon: "ℹ️" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center">🌱 FarmConnect Dashboard</h2>
      <div className="row mt-4">
        {features.map((feature, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card text-center p-4 shadow-lg" onClick={() => navigate(feature.path)} style={{ cursor: "pointer" }}>
              <h3>{feature.icon}</h3>
              <h5>{feature.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDashboard;
