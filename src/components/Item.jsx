
import "./Item.css";

function Item() {
  return (
    <article className="item">
      <div className="item-image">
        Imagen del producto
      </div>

      <h3>Notebook Gamer</h3>
      <p>$1.500.000</p>

      <button>Ver producto</button>
    </article>
  );
}

export default Item;