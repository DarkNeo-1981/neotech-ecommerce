
import "./CartWidget.css";

function CartWidget() {
  return (
    <div className="cart-widget">
      <img src="./images/carrito/Carrito vacio.png" alt="Carrito de compras" />
      <span className="cart-count">0</span>
    </div>
  );
}

export default CartWidget;