import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 relative overflow-hidden">
    
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
        animate={{
          x: ["-100%", "100%"]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear"
        }}
        style={{ width: "100%" }}
      />

      <div className="max-w-6xl mx-auto flex justify-between items-center relative z-10">
        <Link to="/home" className="text-xl font-bold text-gray-800">
          LeaveAPP
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/home" className="text-gray-600 hover:text-black text-sm font-medium">
            Home
          </Link>
          <Link to="/auth" className="text-gray-600 hover:text-black text-sm font-medium">
            Login / Signup
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;