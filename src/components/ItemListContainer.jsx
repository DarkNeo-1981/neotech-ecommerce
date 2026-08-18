
import { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { getProducts } from "../mock/asyncMock";
import ItemList from "./ItemList";

function ItemListContainer() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setItems(products);
    };

    fetchProducts();
  }, []);

  return (
    <section className="item-list-container">
      <ItemList items={items} />
    </section>
  );
}

export default ItemListContainer;