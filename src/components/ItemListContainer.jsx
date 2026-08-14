
import "./ItemListContainer.css";
import Item from "./Item";

function ItemListContainer({ greeting, products }) {
  return (
    <section className="item-list-container">
      <h2>{greeting}</h2>

      <p>Descubrí la mejor tecnología para potenciar tu día a día.</p>

      <main className="product-list">
        {products.map((product) => (
          <Item
            key={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </main>
    </section>
  );
}

export default ItemListContainer;