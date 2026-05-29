import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          
          {/* Admin route ko catch-all se pehle daal diya */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Yeh hamesha sabse aakhiri mein hona chahiye */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;