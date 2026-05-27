import React, { useState } from "react";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const FormData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        localStorage.setItem("token", result.token);
        alert("Login successful");
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[350px] p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login Page
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              name="email" // <-- PEHLE YAHAN "name" LIKHA THA, USE "email" KAR DIYA
              value={data.email}
              onChange={FormData}
              type="email" // text se email kar diya taaki basic validation ho sake
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <input
              name="password"
              value={data.password}
              onChange={FormData}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
