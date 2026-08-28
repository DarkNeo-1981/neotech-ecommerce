
import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ItemDetail({ producto }) {
  const { t } = useTranslation();

  const productName = t(`product.names.${producto.id}`);
  const productDescription = t(
    `product.longDescriptions.${producto.id}`
  );
  const productCategory = t(
    `product.categories.${producto.category}`
  );

  return (
    <section className="item-detail">
      <Link to="/" className="back-button">
        ← {t("product.backToProducts")}
      </Link>

      <div className="item-detail-content">
        <div className="item-detail-image">
          <img
            src={producto.img}
            alt={productName}
          />
        </div>

        <div className="item-detail-info">
          <h1>{productName}</h1>

          <p className="item-detail-category">
            {t("product.category")}: {productCategory}
          </p>

          <p className="item-detail-description">
            {productDescription}
          </p>

          <p className="item-detail-price">
            ${producto.price.toLocaleString("es-AR")}
          </p>

          <p className="item-detail-stock">
            {t("product.availableStock")}: {producto.stock}
          </p>

          <div className="item-detail-actions">
            <ItemCount stock={producto.stock} />

            <button className="add-to-cart-button">
              {t("product.addToCart")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItemDetail;