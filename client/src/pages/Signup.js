import React, { useState } from "react";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Signup Successful! You can now login.");
    } else {
      setMessage("❌ " + (data.message || "Signup failed."));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 w-50">
        <h2 className="text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-3" type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button className="btn btn-primary w-100">Sign Up</button>
        </form>
        <p className="text-center mt-2 text-danger">{message}</p>
      </div>
    </div>
  );
};

export default Signup;
