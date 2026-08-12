
import "./CartWidget.css";
import carritoLleno from "../assets/images/Carrito vacio.png";

function CartWidget() {
  return (
    <div className="cart-widget">
      <img src={carritoLleno} alt="Carrito de compras" />
      <span className="cart-count">0</span>
    </div>
  );
}

export default CartWidget;