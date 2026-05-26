import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <h1>Signup Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Enter name"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <button type="submit">Signup</button>
      </form>

      <span>
        Already have an account? <Link to="/login">Login</Link>
      </span>
    </div>
  );
}

export default Signup;

