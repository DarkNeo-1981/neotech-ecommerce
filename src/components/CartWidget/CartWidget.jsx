
import "./CartWidget.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function CartWidget() {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-widget">
      <FaShoppingCart className="cart-icon" />

      {totalItems > 0 && (
        <span className="cart-count">{totalItems}</span>
      )}
    </Link>
  );
}

export default CartWidget;