import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Home() {
  const [userData, setUserData] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    leaveType: "Sick Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/auth";
      return;
    }

    const fetchInitialData = async () => {
      try {
        const profileRes = await fetch("http://localhost:5050/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const profileResult = await profileRes.json();

        if (profileRes.ok) {
          setUserData(profileResult.user);
        } else {
          localStorage.removeItem("token");
          window.location.href = "/auth";
          return;
        }

        const leavesRes = await fetch("http://localhost:5050/api/auth/home/my-leaves", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const leavesResult = await leavesRes.json();

        if (leavesRes.ok) {
          setLeaves(leavesResult.leaves);
        }
      } catch (error) {
        console.log("Error fetching dashboard data:", error);
      }
    };

    fetchInitialData();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/api/auth/leave/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Leave applied successfully!");
        setLeaves([result.leave, ...leaves]);
        setFormData({
          leaveType: "Sick Leave",
          startDate: "",
          endDate: "",
          reason: "",
        });
      } else {
        alert(result.message || "Failed to apply leave");
      }
    } catch (error) {
      console.log("Error applying leave:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium bg-gray-50">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, {userData.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium text-sm shadow-sm"
        >
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-semibold uppercase">Pending Requests</span>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {leaves.filter((l) => l.status === "Pending").length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-semibold uppercase">Approved Leaves</span>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {leaves.filter((l) => l.status === "Approved").length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <span className="text-xs text-gray-400 font-semibold uppercase">Total Applications</span>
          <p className="text-2xl font-bold text-gray-700 mt-1">{leaves.length}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Apply for Leave</h2>
          <form onSubmit={handleApplyLeave} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Leave Type</label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="w-full border border-gray-200 p-2.5 rounded-lg outline-none focus:border-blue-500 bg-gray-50 text-sm"
              >
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Paid Leave">Paid Leave</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-gray-200 p-2.5 rounded-lg outline-none focus:border-blue-500 bg-gray-50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-200 p-2.5 rounded-lg outline-none focus:border-blue-500 bg-gray-50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Why do you need leave?"
                rows="3"
                className="w-full border border-gray-200 p-2.5 rounded-lg outline-none focus:border-blue-500 bg-gray-50 text-sm resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2.5 rounded-lg hover:bg-blue-600 transition font-semibold text-sm shadow-sm mt-2"
            >
              Submit Request
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2 overflow-x-auto"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Leave History</h2>
          {leaves.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No leaves applied yet.</p>
          ) : (
            <table className="w-full text-left border-collapse min-w-[450px]">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase bg-gray-50/50">
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2">Duration</th>
                  <th className="py-3 px-2">Reason</th>
                  <th className="py-3 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id} className="border-b border-gray-50 text-sm text-gray-600 hover:bg-gray-50/30">
                    <td className="py-3 px-2 font-medium text-gray-800">{leave.leaveType}</td>
                    <td className="py-3 px-2 text-xs">
                      {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 max-w-[150px] truncate" title={leave.reason}>
                      {leave.reason}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          leave.status === "Pending"
                            ? "bg-yellow-50 text-yellow-600"
                            : leave.status === "Approved"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;

