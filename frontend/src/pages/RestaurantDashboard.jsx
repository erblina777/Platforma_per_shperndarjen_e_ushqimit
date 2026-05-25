import DashboardStats from "../components/restaurant/DashboardStats";
import OrdersSection from "../components/restaurant/OrdersSection";
import RestaurantInfo from "../components/restaurant/RestaurantInfo";
import MenuCategoriesSection from "../components/restaurant/MenuCategoriesSection";
import MenuItemsSection from "../components/restaurant/MenuItemsSection";
import PromotionsSection from "../components/restaurant/PromotionsSection";
import ReviewsSection from "../components/restaurant/ReviewsSection";
import useRestaurant from "../hooks/useRestaurant";
import "../styles/RestaurantDashboard.css";

export default function RestaurantDashboard() {
  const restaurant = useRestaurant();
  return (
    <div className="dashboard-container">

      <h1>Restaurant Dashboard</h1>

      <DashboardStats restaurant={restaurant}/>

      <RestaurantInfo restaurant={restaurant} />

      <OrdersSection restaurant={restaurant} />

      <MenuCategoriesSection restaurant={restaurant} />

      <MenuItemsSection restaurant={restaurant} />

      <PromotionsSection restaurant={restaurant} />

      <ReviewsSection restaurant={restaurant} />

    </div>
  );
}