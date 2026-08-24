
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import { useTranslation } from "react-i18next";
import useProducts from "../../hooks/useProducts";

function ItemListContainer() {
  const { t } = useTranslation();
  const { products, loading, error } = useProducts();

  return (
    <section className="item-list-container">
      {loading ? (
        <p className="loading">{t("product.loading")}</p>
      ) : error ? (
        <p className="loading">Error: {error}</p>
      ) : (
        <ItemList items={products} />
      )}
    </section>
  );
}

export default ItemListContainer;
