
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import CategoryNotFound from "../CategoryNotFound/CategoryNotFound";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

function ItemListContainer() {
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const { products, loading, error } = useProducts();

  const categories = {
    1: "Notebooks",
    2: "Periféricos",
    3: "Monitores",
    4: "Componentes",
  };

  const categoryExists = !categoryId || categories[categoryId];

  const filteredProducts = categoryId
    ? products.filter(
        (product) => product.category === categories[categoryId]
      )
    : products;

  return (
    <section className="item-list-container">
      {loading ? (
        <p className="loading">{t("product.loading")}</p>
      ) : error ? (
        <p className="loading">Error: {error}</p>
      ) : !categoryExists ? (
        <CategoryNotFound />
      ) : (
        <ItemList items={filteredProducts} />
      )}
    </section>
  );
}

export default ItemListContainer;


