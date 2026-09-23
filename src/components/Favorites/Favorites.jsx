
import "./Favorites.css";
import ItemList from "../ItemList/ItemList";
import { useFavorites } from "../../hooks/useFavorites";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="favorites-container favorites-empty">
        <h1>Favoritos</h1>

        <p>
          Todavía no agregaste productos a favoritos.
        </p>

        <Link to="/" className="favorites-back-button">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="favorites-container">
      <h1>Favoritos</h1>

      <ItemList items={favorites} />
    </section>
  );
}

export default Favorites;