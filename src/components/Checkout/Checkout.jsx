
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";
import { db } from "../../firebase/config";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import "./Checkout.css";

function Checkout() {
  const { t } = useTranslation();
  const { cart, totalPrice, clear } = useCart();
  const { user } = useAuth();

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBuyer((prevBuyer) => ({
      ...prevBuyer,
      [name]: value,
    }));
  };

  const launchConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const defaults = {
      startVelocity: 35,
      spread: 360,
      ticks: 70,
      zIndex: 9999,
    };

    const randomInRange = (min, max) =>
      Math.random() * (max - min) + min;

    confetti({
      particleCount: 120,
      spread: 100,
      startVelocity: 45,
      origin: {
        x: 0.5,
        y: 0.6,
      },
      zIndex: 9999,
    });

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 45 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
      });

      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
      });
    }, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !buyer.name.trim() ||
      !buyer.phone.trim() ||
      !buyer.address.trim() ||
      !buyer.city.trim()
    ) {
      setError(t("checkout.requiredFields"));
      return;
    }

    if (!user) {
      setError(t("checkout.authRequired"));
      return;
    }

    if (cart.length === 0) {
      setError(t("checkout.emptyCart"));
      return;
    }

    setLoading(true);

    try {
      const order = {
        userId: user.uid,
        userEmail: user.email,

        buyer: {
          name: buyer.name.trim(),
          phone: buyer.phone.trim(),
          address: buyer.address.trim(),
          city: buyer.city.trim(),
        },

        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),

        total: totalPrice,
        createdAt: serverTimestamp(),
      };

      const orderRef = await addDoc(
        collection(db, "orders"),
        order
      );

      setOrderId(orderRef.id);

      clear();

      launchConfetti();
    } catch {
      setError(t("checkout.orderError"));
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <section className="checkout-container">
        <div className="checkout-success">
          <div className="checkout-success-icon">
            ✓
          </div>

          <h1>{t("checkout.successTitle")}</h1>

          <p>{t("checkout.successMessage")}</p>

          <div className="checkout-order">
            <span>{t("checkout.orderId")}</span>

            <strong>{orderId}</strong>
          </div>

          <Link
            to="/"
            className="checkout-back-button"
          >
            {t("cart.backToCatalog")}
          </Link>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <section className="checkout-container">
      <h1>{t("checkout.title")}</h1>

      <div className="checkout-user">
        <p>
          {t("checkout.account")}:{" "}
          <strong>{user.email}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            {t("checkout.name")}
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={buyer.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">
            {t("checkout.phone")}
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={buyer.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address">
            {t("checkout.address")}
          </label>

          <input
            id="address"
            name="address"
            type="text"
            value={buyer.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="city">
            {t("checkout.city")}
          </label>

          <input
            id="city"
            name="city"
            type="text"
            value={buyer.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <h2>
            {t("cart.total")}: $
            {totalPrice.toLocaleString("es-AR")}
          </h2>
        </div>

        {error && (
          <p className="checkout-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? t("checkout.processing")
            : t("checkout.confirm")}
        </button>
      </form>
    </section>
  );
}

export default Checkout;