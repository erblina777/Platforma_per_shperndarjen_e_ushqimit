import { getRole } from "./auth";
export default function ProtectedRoute({ children, allowedRoles }) {
  const role = getRole()?.trim()?.toLowerCase();

  if (!role) return <Navigate to="/login" />;

  const allowed = allowedRoles.map(r => r.toLowerCase());

  if (!allowed.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}