
import { useState } from "react";
import "./Item.css";

function Item({ name, price, image }) {
  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);

  const handleSumar = () => {
    setCantidad(prev => prev + 1);
  };

  const handleRestar = () => {
    setCantidad(prev => Math.max(0, prev - 1));
  };

  const toggleFavorite = () => {
    setEsFavorito(prev => !prev);
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
        <img src={image} alt={name} />
      </div>

      <h3>{name}</h3>
      <p>${price.toLocaleString()}</p>

      <div className="quantity">
        <button onClick={handleRestar}>-</button>
        <span>{cantidad}</span>
        <button onClick={handleSumar}>+</button>
      </div>

      <button>Ver producto</button>
    </article>
  );
}

export default Item;