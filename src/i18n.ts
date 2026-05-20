import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import frCommon from "./locales/fr/common.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      fr: {
        common: frCommon,
      },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
    ns: ["common"],
    defaultNS: "common",
    debug: false,

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      // Conservative choice for safety:
      // i18next defaults to escaping interpolation values.
      // React examples often set this to false because React escapes output.
      // Keep it true/omitted unless you have a specific reason to change it.
    },
  });

export default i18n;