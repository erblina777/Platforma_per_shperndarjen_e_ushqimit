import DashboardStats from "../components/restaurant/DashboardStats";
import OrdersSection from "../components/restaurant/OrdersSection";
import RestaurantInfo from "../components/restaurant/RestaurantInfo";
import MenuItemsSection from "../components/restaurant/MenuItemsSection";
import PromotionsSection from "../components/restaurant/PromotionsSection";
import ReviewsSection from "../components/restaurant/ReviewsSection";
import "../styles/RestaurantDashboard.css";

export default function RestaurantDashboard() {
  return (
    <div className="dashboard-container">

      <h1>Restaurant Dashboard</h1>

      <DashboardStats />

      <RestaurantInfo />

      <OrdersSection />

      <MenuItemsSection />

      <PromotionsSection />

      <ReviewsSection />

    </div>
  );
}