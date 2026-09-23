
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import CategoryNotFound from "../CategoryNotFound/CategoryNotFound";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import { FaHeart } from "react-icons/fa";

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
      {!loading && !error && categoryExists && (
        <div className="catalog-actions">
          <Link to="/favorites" className="favorites-filter-button">
            <FaHeart />
            <span>Ver favoritos</span>
          </Link>
        </div>
      )}

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

