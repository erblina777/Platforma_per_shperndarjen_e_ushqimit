
import DriverStats from "../components/driver/DriverStats";
import DriverInfo from "../components/driver/DriverInfo";
import DeliveriesSection from "../components/driver/DeliveriesSection";
import "../styles/DriverDashboard.css";

export default function DriverDashboard() {

  return (
    <div className="dashboard-container">

      <h1>Driver Dashboard</h1>

      <DriverStats />

      <DriverInfo />

      <DeliveriesSection />

    </div>
  );
}