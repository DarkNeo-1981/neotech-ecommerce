
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import "../Login/Login.css";

function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError(t("auth.emailInUse"));
      } else if (error.code === "auth/weak-password") {
        setError(t("auth.weakPassword"));
      } else if (error.code === "auth/invalid-email") {
        setError(t("auth.invalidEmail"));
      } else {
        setError(t("auth.registerError"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>{t("auth.register")}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">
              {t("auth.email")}
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">
              {t("auth.password")}
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="confirmPassword">
              {t("auth.confirmPassword")}
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
              minLength="6"
            />
          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? t("auth.registering")
              : t("auth.registerButton")}
          </button>
        </form>

        <p className="auth-footer">
          {t("auth.alreadyAccount")}{" "}
          <Link to="/login">
            {t("auth.login")}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;