import i18n from "i18next";
import { initReactI18next  } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import translationEN from "./static/locales/en/translation.json";
import translationPL from "./static/locales/pl/translation.json";

const resources = {
  en: {
    translation: translationEN
  },
  pl: {
    translation: translationPL
  }
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;