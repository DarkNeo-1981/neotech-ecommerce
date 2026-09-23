
import "./Favorites.css";
import ItemList from "../ItemList/ItemList";
import { useFavorites } from "../../hooks/useFavorites";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Favorites() {
  const { favorites } = useFavorites();
  const { t } = useTranslation();

  if (favorites.length === 0) {
    return (
      <section className="favorites-container favorites-empty">
        <h1>{t("favorites.title")}</h1>

        <p>{t("favorites.empty")}</p>

        <Link to="/" className="favorites-back-button">
          {t("favorites.backToCatalog")}
        </Link>
      </section>
    );
  }

  return (
    <section className="favorites-container">
      <h1>{t("favorites.title")}</h1>

      <ItemList items={favorites} />
    </section>
  );
}

export default Favorites;