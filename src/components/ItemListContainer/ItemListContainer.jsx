
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import ItemDetailContainer from "../ItemDetailContainer/ItemDetailContainer";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

function ItemListContainer() {
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const { products, loading, error } = useProducts();

  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleViewDetail = (productId) => {
    setSelectedProductId(productId);
  };

  const categories = {
    1: "Notebooks",
    2: "Periféricos",
    3: "Monitores",
    4: "Componentes",
  };

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
      ) : selectedProductId ? (
        <ItemDetailContainer
          productId={selectedProductId}
          onBack={() => setSelectedProductId(null)}
        />
      ) : (
        <ItemList
          items={filteredProducts}
          onViewDetail={handleViewDetail}
        />
      )}
    </section>
  );
}

export default ItemListContainer;



