
import Item from "../Item/Item";

function ItemList({ items, onViewDetail }) {
  return (
    <div className="product-list">
      {items.map((product) => (
        <Item
          key={product.id}
          product={product}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
}

export default ItemList;