import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import i18n from "@/i18n/config";

type Lang = "ar" | "en";

interface LanguageContextValue {
  lang: Lang;
  isRTL: boolean;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ar",
  isRTL: true,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) || "ar"
  );
  const isRTL = lang === "ar";

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [lang, isRTL]);

  const toggleLang = () => setLang((prev) => (prev === "ar" ? "en" : "ar"));

  return (
    <LanguageContext.Provider value={{ lang, isRTL, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
