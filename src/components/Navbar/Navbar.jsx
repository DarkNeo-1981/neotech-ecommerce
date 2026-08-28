
import "./Navbar.css";
import CartWidget from "../CartWidget/CartWidget";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
         NEOTECH
      </Link>

      <div className="categories">
        <Link to="/category/1">
          {t("navbar.notebooks")}
        </Link>

        <Link to="/category/2">
          {t("navbar.peripherals")}
        </Link>

        <Link to="/category/3">
          {t("navbar.monitors")}
        </Link>

        <Link to="/category/4">
          {t("navbar.components")}
        </Link>
      </div>

      <div className="navbar-actions">
        <div className="language-selector">
          <button className="language-button">
            <span
              className={`fi fi-${
                i18n.language === "en" ? "gb" : i18n.language
              }`}
            />

            <span>
              {i18n.language === "es"
                ? "Español"
                : i18n.language === "en"
                ? "English"
                : "Deutsch"}
            </span>

            <span className="language-arrow">▾</span>
          </button>

          <div className="language-menu">
            <button onClick={() => changeLanguage("es")}>
              <span className="fi fi-es" />
              <span>Español</span>
            </button>

            <button onClick={() => changeLanguage("en")}>
              <span className="fi fi-gb" />
              <span>English</span>
            </button>

            <button onClick={() => changeLanguage("de")}>
              <span className="fi fi-de" />
              <span>Deutsch</span>
            </button>
          </div>
        </div>

        <CartWidget />
      </div>
    </nav>
  );
}

export default Navbar;