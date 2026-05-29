import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role || "student");
        
        alert("Login successful!");
        
        if (result.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/home";
        }
      } else {
        alert(result.message || "Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      alert(result.message || "Signup processed");

      if (response.ok) {
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden relative">
      <motion.div
        className="absolute w-72 h-72 bg-blue-300/30 rounded-full blur-3xl -top-10 -left-10"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-80 h-80 bg-purple-300/30 rounded-full blur-3xl -bottom-10 -right-10"
        animate={{ y: [0, -40, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <div className="bg-white w-[380px] p-8 rounded-xl shadow-lg relative z-10">
        <div className="flex justify-around mb-8 border-b pb-2">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-xl font-bold pb-1 transition-all ${
              isLogin
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`text-xl font-bold pb-1 transition-all ${
              !isLogin
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400"
            }`}
          >
            Signup
          </button>
        </div>

        <div className="relative min-h-[370px]">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLoginSubmit}
                className="flex flex-col gap-4 absolute w-full"
              >
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
                  Welcome Back
                </h2>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition mt-2 font-semibold"
                >
                  Login
                </button>

                <p className="text-center text-sm text-gray-600 mt-2">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setIsLogin(false)}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Register here
                  </span>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSignupSubmit}
                className="flex flex-col gap-4 absolute w-full"
              >
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
                  Create Account
                </h2>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={signupData.name}
                    placeholder="Enter name"
                    onChange={handleSignupChange}
                    className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={signupData.email}
                    placeholder="Enter email"
                    onChange={handleSignupChange}
                    className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={signupData.password}
                    placeholder="Enter password"
                    onChange={handleSignupChange}
                    className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition mt-2 font-semibold"
                >
                  Signup
                </button>

                <p className="text-center text-sm text-gray-600 mt-2">
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsLogin(true)}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Login here
                  </span>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Auth;