
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locals/es.json";
import en from "./locals/en.json";
import de from "./locals/de.json";

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: es,
    },
    en: {
      translation: en,
    },
    de: {
      translation: de,
    },
  },

  lng: localStorage.getItem("language") || "es",

  fallbackLng: "es",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;