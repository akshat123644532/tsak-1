import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/admin/leaves");
        setLeaves(res.data);
      } catch (err) {
        console.error("Error fetching leaves", err);
      }
    };
    fetchLeaves();
  }, []);

  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      await axios.put(`http://localhost:5050/api/admin/leave/${leaveId}`, { status: newStatus });
      setLeaves(leaves.map(leave => leave._id === leaveId ? { ...leave, status: newStatus } : leave));
      alert(`Leave ${newStatus} successfully!`);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">T Admin Panel </h1>
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Student Leave Requests</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                <th className="p-4">Student Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaves.map((leave) => (
                <tr key={leave._id} className="text-sm text-gray-700">
                  <td className="p-4 font-medium">{leave.userId?.name || "Unknown Student"}</td>
                  <td className="p-4">{leave.leaveType}</td>
                  <td className="p-4">{leave.reason}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      leave.status === "Approved" ? "bg-green-100 text-green-800" :
                      leave.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {leave.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    {(leave.status === "Pending" || !leave.status) && (
                      <>
                        <button onClick={() => handleStatusChange(leave._id, "Approved")} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold">
                          Approve
                        </button>
                        <button onClick={() => handleStatusChange(leave._id, "Rejected")} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold">
                          Reject
                        </button>
                      </>
                    )}
                    {leave.status && leave.status !== "Pending" && <span className="text-gray-400 text-xs">Action Taken</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
