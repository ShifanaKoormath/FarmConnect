import React, { useState } from "react";

const Chatbot = () => {
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  const handleChatbotAsk = async () => {
    if (!chatQuestion.trim()) {
      alert("Enter a farming-related question!");
      return;
    }

    setLoading(true); // ✅ Show loading state

    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatQuestion }), // ✅ Fixed request body
      });

      if (!response.ok) throw new Error("Failed to get response from chatbot");

      const data = await response.json();
      setChatResponse(data.reply || "No response from chatbot."); // ✅ Handle missing replies
    } catch (error) {
      console.error("Chatbot error:", error);
      setChatResponse("⚠️ Chatbot is currently unavailable. Please try again later.");
    } finally {
      setLoading(false); // ✅ Hide loading state
      setChatQuestion(""); // ✅ Clear input after asking
    }
  };

  return (
    <div className="container mt-4">
      <h3>🤖 Farming Chatbot</h3>
      
      <input 
        type="text" 
        className="form-control mt-2" 
        placeholder="Ask a farming-related question..." 
        value={chatQuestion} 
        onChange={(e) => setChatQuestion(e.target.value)} 
      />
      
      <button className="btn btn-info mt-3" onClick={handleChatbotAsk} disabled={loading}>
        {loading ? "Thinking... " : "Ask Chatbot"}
      </button>
      
      {chatResponse && (
        <div className="card mt-3 p-3">
          <h5>💬 Chatbot Response:</h5>
          <p>{chatResponse}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
