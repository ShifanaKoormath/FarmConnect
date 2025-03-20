import React, { useState } from "react";

const Chatbot = () => {
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState("");

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
      alert("Chatbot is currently unavailable.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>🤖 Farming Chatbot</h3>
      <input type="text" className="form-control mt-2" placeholder="Ask a question" value={chatQuestion} onChange={(e) => setChatQuestion(e.target.value)} />
      <button className="btn btn-info mt-3" onClick={handleChatbotAsk}>Ask Chatbot</button>
      {chatResponse && <div className="card mt-3 p-3"><h5>💬 Chatbot Response:</h5><p>{chatResponse}</p></div>}
    </div>
  );
};

export default Chatbot;
