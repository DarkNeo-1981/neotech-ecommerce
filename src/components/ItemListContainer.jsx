
import { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { getProducts } from "../mock/asyncMock";
import ItemList from "./ItemList";
import { useTranslation } from "react-i18next";

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const products = await getProducts();  
        setItems(products);
      }catch(error){
        console.error("Error fetching products:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const { t } = useTranslation();

  return (
    <section className="item-list-container">
      {loading ? (
        <p className="loading">{t("product.loading")}</p>
      ) : (
        <ItemList items={items} />
      )}
    </section>
  );
}

export default ItemListContainer;