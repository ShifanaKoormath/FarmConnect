import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PestManagement from "./PestManagement";
import Chat from "../components/Chat";
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cropName, setCropName] = useState("");
  const [cropPrice, setCropPrice] = useState(null);
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      // Fetch user data
      fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setUser(data);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });

      // Fetch weather data
      fetch("http://localhost:5000/api/weather/Malappuram")
        .then((res) => res.json())
        .then((data) => setWeather(data))
        .catch((err) => console.log("Error fetching weather", err));
    }
  }, [navigate]);

  const handleCheckNews = async () => {
    if (!query) return alert("Enter a topic to check news!");

    setLoading(true);
    setArticles([]);

    try {
      const response = await fetch("http://localhost:5000/api/news/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
      });

      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]);
        alert("No fact-checking information available.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("Error fetching news. Try again later.");
    }
    setLoading(false);
  };

  const handleCheckCropPrice = async () => {
    if (!cropName) return alert("Enter a crop name!");

    try {
      const response = await fetch(`http://localhost:5000/api/crop-price/${cropName.toLowerCase()}`);
      const data = await response.json();

      if (data.currentPrice) {
        setCropPrice(data);
      } else {
        setCropPrice(null);
        alert("No price data available for this crop.");
      }
    } catch (error) {
      console.error("Error fetching crop price:", error);
      alert("Error fetching crop price. Try again later.");
    }
  };
  
  const handleChatbotAsk = async () => {
    if (!chatQuestion) return alert("Enter a farming-related question!");

    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: chatQuestion }),
      });

      const data = await response.json();
      setChatResponse(data.response);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      alert("Chatbot is currently unavailable. Try again later.");
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center">Dashboard</h2>
        {user ? (
          <div className="text-center">
            <p className="fs-5">Welcome, <strong>{user.name}</strong>!</p>

            {/* Weather Section */}
            {weather ? (
              <div className="card mt-3 p-3">
                <h4>🌦️ Weather in {weather.name}</h4>
                <p>🌡️ Temperature: <strong>{weather.main.temp}°C</strong></p>
                <p>💧 Humidity: <strong>{weather.main.humidity}%</strong></p>
                <p>🌬️ Wind Speed: <strong>{weather.wind.speed} m/s</strong></p>
              </div>
            ) : (
              <p>Loading weather...</p>
            )}
            
            {/* Crop Price Prediction Section */}
            <div className="mt-4">
              <h4>💰 Check Crop Price Prediction</h4>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter crop name (e.g., Wheat)"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
              />
              <button className="btn btn-success mt-3" onClick={handleCheckCropPrice}>
                Check Price
              </button>

              {cropPrice && (
                <div className="card mt-3 p-3">
                  <h5>🌾 Crop: {cropPrice.crop.toUpperCase()}</h5>
                  <p>📊 Current Price: <strong>{cropPrice.currentPrice} {cropPrice.unit}</strong></p>
                  <p>🔮 Predicted Price: <strong>{cropPrice.predictedPrice} {cropPrice.unit}</strong></p>
                </div>
              )}
            </div>

            {/* News Fact-Checking Section */}
            <div className="mt-4">
              <h4>📰 Check News Credibility</h4>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter a topic (e.g., Climate Change)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="btn btn-primary mt-3"
                onClick={handleCheckNews}
                disabled={loading}
              >
                {loading ? "Checking..." : "Check News"}
              </button>
            </div>
            <PestManagement />
            {/* Display News Articles */}
            {articles.length > 0 && (
              <div className="mt-4">
                <h5>🔍 Related News Articles:</h5>
                <ul className="list-group">
                  {articles.map((article, index) => (
                    <li key={index} className="list-group-item">
                      <strong>{article.title}</strong> - {article.source} <br />
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        Read More
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Chat />
             {/* Farming Chatbot Section */}
             <div className="mt-4">
              <h4>🤖 Farming Chatbot</h4>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Ask a question (e.g., Best crops for summer)"
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
              />
              <button className="btn btn-info mt-3" onClick={handleChatbotAsk}>
                Ask Chatbot
              </button>

              {chatResponse && (
                <div className="card mt-3 p-3">
                  <h5>💬 Chatbot Response:</h5>
                  <p>{chatResponse}</p>
                </div>
              )}
            </div>
            {/* Logout Button */}
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  localStorage.removeItem("token");
                  navigate("/login");
                }
              }}
              className="btn btn-danger mt-3"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
