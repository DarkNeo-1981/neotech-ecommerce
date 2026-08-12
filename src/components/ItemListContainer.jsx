
import "./ItemListContainer.css";

function ItemListContainer({greeting}) {
  return (
    <section className="item-list-container">
      <h2>{greeting}</h2>
      <p>Descubrí la mejor tecnología para potenciar tu día a día.</p>
      <button>Ver productos</button>
    </section>
  );
}

export default ItemListContainer;