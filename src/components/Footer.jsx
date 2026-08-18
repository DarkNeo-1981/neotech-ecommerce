
import "./Footer.css";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p>
        © 2026 NEOTECH — {t("footer.copyright")}
      </p>

      <div className="footer-social">
        <a
          href="https://www.linkedin.com/in/fasanellanicolas"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://nicolasfasanella.com.ar"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mi página"
        >
          <FaGlobe />
        </a>

        <a
          href="https://github.com/DarkNeo-1981"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}

export default Footer;