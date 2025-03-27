import React, { useState } from "react";

const Chatbot = () => {
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChatbotAsk = async () => {
    if (!chatQuestion.trim()) {
      alert("⚠️ Please enter a farming-related question!");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatQuestion }),
      });
  
      if (!response.ok) throw new Error("❌ Chatbot service unavailable.");
  
      const data = await response.json();
      let reply = data.reply?.trim() || "⚠️ No relevant answer found.";
  
      // Fix the response that has no spaces between words
      // This regex matches common word boundaries (letters are split into readable words)
      reply = reply.replace(/([a-z])([a-z]+)/g, '$1 $2');  // Insert a space between lowercase letters
      reply = reply.replace(/([a-z])([A-Z])/g, '$1 $2');  // Inserts space before uppercase letters
  
      // Normalize extra spaces
      reply = reply.replace(/\s+/g, ' ').trim(); // Merge multiple spaces and trim
  
      setChatResponse(reply);
    } catch (error) {
      console.error("🚨 Chatbot error:", error);
      setChatResponse("❌ Chatbot is currently unavailable. Please try again later.");
    } finally {
      setLoading(false);
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
        disabled={loading}
      />

      <button className="btn btn-info mt-3" onClick={handleChatbotAsk} disabled={loading}>
        {loading ? "🤔 Thinking..." : "Ask Chatbot"}
      </button>

      {chatResponse && (
  <div className="card mt-3 p-3" style={{ backgroundColor: "#f9f9f9", borderRadius: "5px", fontSize: "16px" }}>
    <h5>💬 Chatbot Response:</h5>
    <pre style={{
      backgroundColor: "#eee",
      padding: "10px",
      borderRadius: "5px",
      whiteSpace: "normal", // ✅ Prevents adding extra spaces
      wordWrap: "break-word", // ✅ Ensures long words wrap properly
      fontFamily: "Arial, sans-serif", // ✅ Uses a cleaner font
      fontSize: "16px",
      color: "#333",
      lineHeight: "1.5", // ✅ Makes text more readable
    }}>
      {chatResponse}
    </pre>
  </div>
)}

    </div>
  );
};

export default Chatbot;
