import React, { useEffect, useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");

  // Fetch chat messages
  useEffect(() => {
    fetch("http://localhost:5000/api/chat")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!username || !newMessage) {
      alert("Enter both username and message!");
      return;
    }

    const response = await fetch("http://localhost:5000/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: username, message: newMessage }),
    });

    if (response.ok) {
      setMessages([...messages, { sender: username, message: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="card p-4 shadow-lg mt-3">
      <h4>💬 Farmer Chat Room</h4>

      {/* Username Input */}
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Chat Messages */}
      <div className="chat-box border p-3 mb-2" style={{ maxHeight: "200px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.message}</p>
        ))}
      </div>

      {/* Message Input */}
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />

      {/* Send Button */}
      <button className="btn btn-primary" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default Chat;
