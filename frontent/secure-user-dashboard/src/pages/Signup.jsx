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
    setFormData({  ...formData,  [e.target.name]: e.target.value, });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5050/api/auth/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    });

    const result = await response.json();

    console.log(result);

    alert(result.message);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Signup
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="Enter name"
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Signup
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

