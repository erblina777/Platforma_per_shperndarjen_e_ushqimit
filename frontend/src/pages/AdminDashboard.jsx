import AdminStats from "../components/admin/AdminStats";
import UsersSection from "../components/admin/UsersSection";
import RestaurantsSection from "../components/admin/RestaurantsSection";
import OrdersSection from "../components/admin/OrdersSection";
import DriversSection from "../components/admin/DriversSection";
import DeliveriesSection from "../components/admin/DeliveriesSection";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {

  return (
    <div className="admin-dashboard-container">

      <h1>Admin Dashboard</h1>

      <AdminStats />

      <UsersSection />

      <RestaurantsSection />

      <OrdersSection />

      <DriversSection />

      <DeliveriesSection />

      <ReviewsSection />

    </div>
  );
}