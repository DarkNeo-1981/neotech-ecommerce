
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import { useTranslation } from "react-i18next";

function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  if (loadingAuth) {
    return (
      <LoaderComponent text={t("auth.validatingSession")} />
    );
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