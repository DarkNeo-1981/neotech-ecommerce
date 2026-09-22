
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import CategoryNotFound from "../CategoryNotFound/CategoryNotFound";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import LoaderComponent from "../LoaderComponent/LoaderComponent";

function ItemListContainer() {
  const { t } = useTranslation();
  const { categoryId } = useParams();

  const categories = {
    1: "Notebooks",
    2: "Periféricos",
    3: "Monitores",
    4: "Componentes",
  };

  const categoryExists = !categoryId || categories[categoryId];

  const { products, loading, error } = useProducts(categoryId);

  return (
    <section className="item-list-container">
      {loading ? (
        <LoaderComponent text={t("product.loading")} />
      ) : error ? (
        <p className="loading">Error: {error}</p>
      ) : !categoryExists ? (
        <CategoryNotFound />
      ) : (
        <ItemList items={products} />
      )}
    </section>
  );
}

export default ItemListContainer;

