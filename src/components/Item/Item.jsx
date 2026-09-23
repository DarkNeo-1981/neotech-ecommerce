
import "./Item.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useFavorites } from "../../hooks/useFavorites";

function Item({ product }) {
  const { t } = useTranslation();

  const { price, img, stock } = product;

  const { cart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const esFavorito = isFavorite(product.id);

  const productoEnCarrito = cart.find(
    (item) => item.id === product.id
  );

  const cantidadEnCarrito = productoEnCarrito
    ? productoEnCarrito.quantity
    : 0;

  const stockDisponible = Math.max(
    0,
    stock - cantidadEnCarrito
  );

  const productName = t(
    `product.names.${product.translationKey}`
  );

  const productDescription = t(
    `product.descriptions.${product.translationKey}`
  );

  return (
    <article className="item">
      <button
        className={`favorite ${esFavorito ? "active" : ""}`}
        onClick={() => toggleFavorite(product)}
        aria-label="Favorito"
        title="Favorito"
      >
        {esFavorito ? "♥" : "♡"}
      </button>

      <div className="item-image">
        <img src={img} alt={productName} />
      </div>

      <h3>{productName}</h3>

      <p className="description">
        {productDescription}
      </p>

      <p>${price.toLocaleString()}</p>

      <p className="stock">
        {t("product.availableStock")}: {stockDisponible}
      </p>

      <Link to={`/item/${product.id}`}>
        {t("product.viewProduct")}
      </Link>
    </article>
  );
}

export default Item;