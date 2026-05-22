import { Navigate } from "react-router-dom";
import { getRole } from "./auth";

export default function ProtectedRoute({ children, allowedRoles }) {
  const role = getRole();

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}