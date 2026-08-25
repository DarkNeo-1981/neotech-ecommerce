
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import ItemDetailContainer from "../ItemDetailContainer/ItemDetailContainer";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useProducts from "../../hooks/useProducts";

function ItemListContainer() {
  const { t } = useTranslation();
  const { products, loading, error } = useProducts();

  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleViewDetail = (productId) => {
    setSelectedProductId(productId);
  };

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
          items={products}
          onViewDetail={handleViewDetail}
        />
      )}
    </section>
  );
}

export default ItemListContainer;
