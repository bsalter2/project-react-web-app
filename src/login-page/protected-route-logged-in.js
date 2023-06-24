import { useSelector } from "react-redux";
import { Navigate } from "react-router";
function ProtectedRouteLoggedIn({ children }) {
  const { currentUser } = useSelector((state) => state.currentUser);
  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return children;
}

export default ProtectedRouteLoggedIn;
