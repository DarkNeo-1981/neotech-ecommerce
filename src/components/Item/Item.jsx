
import { useState } from "react";
import "./Item.css";
import { useTranslation } from "react-i18next";

function Item({ product, onViewDetail }) {
  const { t } = useTranslation();

  const [esFavorito, setEsFavorito] = useState(false);

  const { price, img, stock } = product;

  const productName = t(`product.names.${product.id}`);
  const productDescription = t(`product.descriptions.${product.id}`);

  const toggleFavorite = () => {
    setEsFavorito((prev) => !prev);
  };

  return (
    <article className="item">
      <button
        className={`favorite ${esFavorito ? "active" : ""}`}
        onClick={toggleFavorite}
      >
        {esFavorito ? "♥" : "♡"}
      </button>

      <div className="item-image">
        <img src={img} alt={productName} />
      </div>

      <h3>{productName}</h3>

      <p className="description">{productDescription}</p>

      <p>${price.toLocaleString()}</p>

      <p className="stock">
        {t("product.availableStock")}: {stock}
      </p>

      <button onClick={() => onViewDetail(product.id)}>
        {t("product.viewProduct")}
      </button>
    </article>
  );
}

export default Item;