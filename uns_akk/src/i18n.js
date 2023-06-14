import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const langId = localStorage.getItem("i18nextLng");

i18n.use(initReactI18next).use(LanguageDetector).use(Backend).init({
  lng: langId,
  fallbackLng: "1",
  debug: false,
});
