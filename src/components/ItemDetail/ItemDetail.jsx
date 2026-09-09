
import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

function ItemDetail({ producto }) {
  const { t } = useTranslation();
  const { cart, addItem } = useCart();

  const [cantidad, setCantidad] = useState(0);

  const productoEnCarrito = cart.find(
    (item) => item.id === producto.id
  );

  const cantidadEnCarrito = productoEnCarrito
    ? productoEnCarrito.quantity
    : 0;

  const stockDisponible = Math.max(
    0,
    producto.stock - cantidadEnCarrito
  );

  const productName = t(`product.names.${producto.id}`);
  const productDescription = t(
    `product.longDescriptions.${producto.id}`
  );
  const productCategory = t(
    `product.categories.${producto.category}`
  );

  const handleAddToCart = () => {
    if (cantidad > 0 && cantidad <= stockDisponible) {
      addItem(producto, cantidad);
      setCantidad(0);
    }
  };

  return (
    <section className="item-detail">
      <Link to="/" className="back-button">
        ← {t("product.backToProducts")}
      </Link>

      <div className="item-detail-content">
        <div className="item-detail-image">
          <img
            src={producto.img}
            alt={productName}
          />
        </div>

        <div className="item-detail-info">
          <h1>{productName}</h1>

          <p className="item-detail-category">
            {t("product.category")}: {productCategory}
          </p>

          <p className="item-detail-description">
            {productDescription}
          </p>

          <p className="item-detail-price">
            ${producto.price.toLocaleString("es-AR")}
          </p>

          <p className="item-detail-stock">
            {t("product.availableStock")}: {stockDisponible}
          </p>

          <div className="item-detail-actions">
            <ItemCount
              stock={stockDisponible}
              cantidad={cantidad}
              setCantidad={setCantidad}
            />

            <button
              className="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={
                cantidad <= 0 || cantidad > stockDisponible
              }
            >
              {t("product.addToCart")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItemDetail;