import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilPage from "./pages/ProfilPage";
import MenuItemsPage from "./pages/MenuItemsPage";
import OrderPage from "./pages/OrderPage";
import MenuItemDetails from "./pages/MenuItemDetails";
import RestaurantsSection from "./pages/RestaurantPage";
import RestaurantDetailsPage from "./pages/RestaurantDetails";

export default function App() {
  return (
    <BrowserRouter>
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route path="/profil" element={<ProfilPage />} />
      <Route path="/menu/:id" element={<MenuItemDetails />} />
      <Route
  path="/restaurants/:id"
  element={<RestaurantDetailsPage />}
/>
      <Route path="/restaurants" element={<RestaurantsSection />} />
      <Route path="/restaurant-dashboard"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <RestaurantDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/driver-dashboard"
        element={
          <ProtectedRoute allowedRoles={["driver"]}>
            <DriverDashboard />
          </ProtectedRoute>
        }
      />
      <Route
      path="/admin-dashboard"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      }
      />
      <Route path="/menu-items" element={<MenuItemsPage />} />
      <Route
  path="/order"
  element={<OrderPage />}
/>

      </Routes>
      
      <Footer />

    </BrowserRouter>
  );
}

