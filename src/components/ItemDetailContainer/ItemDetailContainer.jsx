
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import LoaderComponent from "../LoaderComponent/LoaderComponent";

function ItemDetailContainer() {
  const { id } = useParams();

  return <ProductDetailLoader key={id} id={id} />;
}

function ProductDetailLoader({ id }) {
  const { t } = useTranslation();

  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnapshot = await getDoc(productRef);

        if (!productSnapshot.exists()) {
          throw new Error("Producto no encontrado.");
        }

        const productData = {
          id: productSnapshot.id,
          ...productSnapshot.data(),
        };

        if (activo) {
          setProducto(productData);
        }
      } catch (error) {
        if (activo) {
          setError(
            error.message || "No se pudo cargar el producto."
          );
        }
      }
    };

    fetchProduct();

    return () => {
      activo = false;
    };
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
      <LoaderComponent text={t("product.loadingDetail")} />
    );
  }

  return (
    <div className="item-detail-container">
      <ItemDetail producto={producto} />
    </div>
  );
}

export default ItemDetailContainer;