
import { useEffect, useState } from "react";
import { getProductById } from "../../mock/asyncMock";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function ItemDetailContainer() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProducto(null);
    setError(null);

    getProductById(Number(id))
      .then((productoEncontrado) => {
        setProducto(productoEncontrado);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  if (error) {
    return (
      <div>
        <p>{error}</p>

        <button onClick={() => window.history.back()}>
          {t("product.backToProducts")}
        </button>
      </div>
    );
  }

  if (!producto) {
    return (
      <p className="loading">
        {t("product.loadingDetail")}
      </p>
    );
  }

  return (
    <div className="item-detail-container">
      <ItemDetail producto={producto} />
    </div>
  );
}

export default ItemDetailContainer;