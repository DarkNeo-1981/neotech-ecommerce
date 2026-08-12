
import "./Item.css";

function Item({ name, price, image }) {
  return (
    <article className="item">
      <div className="item-image">
        <img src={image} alt={name} />
      </div>

      <h3>{name}</h3>
      <p>${price.toLocaleString()}</p>

      <button>Ver producto</button>
    </article>
  );
}

export default Item;