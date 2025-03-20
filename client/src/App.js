import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MainDashboard from "./pages/MainDashboard";
import Weather from "./pages/Weather";
import CropPrice from "./pages/CropPrice";
import NewsCheck from "./pages/NewsCheck";
import PestDetection from "./pages/PestDetection";
import Chat from "./components/Chat";
import Chatbot from "./pages/Chatbot";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/crop-price" element={<CropPrice />} />
        <Route path="/news" element={<NewsCheck />} />
        <Route path="/pest" element={<PestDetection />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
