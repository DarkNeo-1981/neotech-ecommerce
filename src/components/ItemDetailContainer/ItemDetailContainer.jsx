
import { useEffect, useState } from "react";
import { getProductById } from "../../mock/asyncMock";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useTranslation } from "react-i18next";

function ItemDetailContainer({ productId, onBack }) {
  const { t } = useTranslation();

  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProducto(null);
    setError(null);

    getProductById(productId)
      .then((productoEncontrado) => {
        setProducto(productoEncontrado);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [productId]);

  if (error) {
    return (
      <div>
        <p>{error}</p>

        <button onClick={onBack}>
          {t("product.backToProducts")}
        </button>
      </div>
    );
  }

  if (!producto) {
    return <p className="loading">{t("product.loadingDetail")}</p>;
  }

  return (
    <div className="item-detail-container">
      <ItemDetail
        producto={producto}
        onBack={onBack}
      />
    </div>
  );
}

export default ItemDetailContainer;