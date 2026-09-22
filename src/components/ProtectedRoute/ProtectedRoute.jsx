
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoaderComponent from "../LoaderComponent/LoaderComponent";

function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useAuth();
  const location = useLocation();

  if (loadingAuth) {
    return <LoaderComponent text="Validando sesión..." />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;