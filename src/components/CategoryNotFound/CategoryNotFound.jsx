
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../NotFound/NotFound.css";

function CategoryNotFound() {
  const { t } = useTranslation();

  return (
    <section className="not-found-page">
      <div className="not-found-card">
        <h1 className="not-found-title">
          {t("notFound.category")}
        </h1>

        <Link to="/" className="not-found-link">
          {t("cart.backToCatalog")}
        </Link>
      </div>
    </section>
  );
}

export default CategoryNotFound;