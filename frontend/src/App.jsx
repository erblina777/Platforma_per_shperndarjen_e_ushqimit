import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurant-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Owner"]}>
              <RestaurantDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}