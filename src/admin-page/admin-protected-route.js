import { useSelector } from "react-redux";
import { Navigate } from "react-router";
function AdminProtectedRoute({ children }) {
  const { currentUser } = useSelector((state) => state.currentUser);
  if (currentUser && currentUser.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
}

export default AdminProtectedRoute;
