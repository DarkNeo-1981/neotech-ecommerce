
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import "./ItemDetailContainer.css";

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
          if (activo) {
            setError("product.notFound");
          }
          return;
        }

        const productData = {
          id: productSnapshot.id,
          ...productSnapshot.data(),
        };

        if (activo) {
          setProducto(productData);
        }
      } catch {
        if (activo) {
          setError("product.loadError");
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
      <section className="product-error">
        <div className="product-error-card">
          <h1 className="product-error-title">
            {t(error)}
          </h1>

          <Link to="/" className="product-error-link">
            {t("cart.backToCatalog")}
          </Link>
        </div>
      </section>
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