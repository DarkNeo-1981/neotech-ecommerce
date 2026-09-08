
import "./Cart.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    cart,
    removeItem,
    clear,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-container cart-empty">
        <h1>Tu carrito está vacío</h1>

        <Link to="/" className="cart-back-button">
          Volver al catálogo
        </Link>
      </section>
    );
  } 

  return (
    <section className="cart-container">
      <h1>Carrito de compras</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.img}
              alt={item.name}
              className="cart-item-image"
            />

            <div className="cart-item-info">
              <h2>{item.name}</h2>

              <p>
                Cantidad: {item.quantity}
              </p>

              <p>
                Precio unitario: $
                {item.price.toLocaleString("es-AR")}
              </p>

              <p className="cart-item-subtotal">
                Subtotal: $
                {(
                  item.price * item.quantity
                ).toLocaleString("es-AR")}
              </p>
            </div>

            <button
              className="cart-remove-button"
              onClick={() => removeItem(item.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>
          Total: ${totalPrice.toLocaleString("es-AR")}
        </h2>

        <div className="cart-actions">
          <button
            className="cart-clear-button"
            onClick={clear}
          >
            Vaciar carrito
          </button>

          <button className="cart-checkout-button">
            Finalizar compra
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;