import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Login Successful!");
      localStorage.setItem("token", data.token);
      setTimeout(() => navigate("/dashboard"), 1000); // Redirect after 1s
    } else {
      setMessage("❌ " + (data.message || "Login failed."));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 w-50">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button className="btn btn-success w-100">Login</button>
        </form>
        <p className="text-center mt-2 text-danger">{message}</p>
      </div>
    </div>
  );
};

export default Login;
