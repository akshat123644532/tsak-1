import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">MyApp</h2>
          <p className="text-sm text-gray-400 mt-1"><b> made by akshat solanki.</b></p>
        </div>

        <div className="text-sm text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;