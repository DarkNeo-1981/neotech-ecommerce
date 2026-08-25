
import "./ItemCount.css";
import { useState } from "react";

function ItemCount({ stock }) {
  const [cantidad, setCantidad] = useState(0);

  const handleSumar = () => {
    setCantidad((prev) => Math.min(stock, prev + 1));
  };

  const handleRestar = () => {
    setCantidad((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="quantity">
      <button onClick={handleRestar} disabled={cantidad === 0}>
        -
      </button>

      <span>{cantidad}</span>

      <button onClick={handleSumar} disabled={cantidad === stock}>
        +
      </button>
    </div>
  );
}

export default ItemCount;
