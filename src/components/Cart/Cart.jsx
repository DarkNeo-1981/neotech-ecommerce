
import "./Cart.css";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";

function Cart() {
  const { t } = useTranslation();

  const {
    cart,
    increaseItem,
    decreaseItem,
    removeItem,
    clear,
    totalItems,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-container cart-empty">
        <h1>{t("cart.empty")}</h1>

        <Link to="/" className="cart-back-button">
          {t("cart.backToCatalog")}
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-container">
      <h1>{t("cart.title")}</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.img}
              alt={t(`product.names.${item.id}`)}
              className="cart-item-image"
            />

            <div className="cart-item-info">
              <h2>{t(`product.names.${item.id}`)}</h2>

              <p>
                {t("cart.unitPrice")}: $
                {item.price.toLocaleString("es-AR")}
              </p>

              <p>
                {t("product.availableStock")}: {item.stock}
              </p>

              <div className="cart-quantity-controls">
                <button
                  onClick={() => decreaseItem(item.id)}
                  disabled={item.quantity === 1}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseItem(item.id)}
                  disabled={item.quantity === item.stock}
                >
                  +
                </button>
              </div>

              <p className="cart-item-subtotal">
                {t("cart.subtotal")}: $
                {(item.price * item.quantity).toLocaleString(
                  "es-AR"
                )}
              </p>
            </div>

            <button
              className="cart-remove-button"
              onClick={() => removeItem(item.id)}
              title={t("cart.removeProduct")}
              aria-label={t("cart.removeProduct")}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2 className="cart-summary-title">
          {t("cart.summary")}
        </h2>

        <p>
          {t("cart.products")} ({totalItems})
        </p>

        <h2 className="cart-summary-total">
          {t("cart.total")}: $
          {totalPrice.toLocaleString("es-AR")}
        </h2>

        <div className="cart-actions">
          <button
            className="cart-clear-button"
            onClick={clear}
          >
            {t("cart.clear")}
          </button>

          <button className="cart-checkout-button">
            {t("cart.checkout")}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;