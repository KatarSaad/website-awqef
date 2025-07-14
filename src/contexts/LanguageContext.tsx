"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import enTranslations from "../translations/en.json";
import arTranslations from "../translations/ar.json";

type Language = "en" | "ar";

interface TranslationParams {
  [key: string]: string | number;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: TranslationParams) => string;
  isRTL: boolean;
  availableLanguages: { code: Language; name: string }[];
  formatDate: (date: Date | string | number) => string;
}

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

const availableLanguages = [
  { code: "en" as Language, name: "English" },
  { code: "ar" as Language, name: "العربية" },
];

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Default to browser language if available and supported, otherwise fallback to English
  const getInitialLanguage = (): Language => {
    if (typeof window === "undefined") return "en";

    const storedLang = localStorage.getItem("awqef-lang");
    if (storedLang === "en" || storedLang === "ar") {
      return storedLang;
    }

    const browserLang = navigator.language.split("-")[0];
    return browserLang === "ar" ? "ar" : "en";
  };

  const [language, setLanguageState] = useState<Language>("en"); // Default to prevent hydration mismatch

  // Load language from localStorage on mount
  useEffect(() => {
    setLanguageState(getInitialLanguage());
  }, []);

  // Persist language to localStorage and update document attributes
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("awqef-lang", lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, []);

  // Enhanced translation function with parameter support
  const t = useCallback(
    (key: string, params?: TranslationParams): string => {
      const keys = key.split(".");
      let value: any = translations[language];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return key; // fallback to key if not found
        }
      }

      if (!value) return key;

      // Replace parameters in the translation string
      if (params) {
        return Object.entries(params).reduce((str, [param, val]) => {
          return str.replace(new RegExp(`\\{${param}\\}`, "g"), String(val));
        }, value);
      }

      return value;
    },
    [language]
  );

  // Format date according to current language
  const formatDate = useCallback(
    (date: Date | string | number): string => {
      const dateObj = date instanceof Date ? date : new Date(date);
      try {
        return dateObj.toLocaleDateString(
          language === "ar" ? "ar-SA" : "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
      } catch (e) {
        return dateObj.toDateString();
      }
    },
    [language]
  );

  const isRTL = language === "ar";

  // Update document attributes when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
    }
  }, [language, isRTL]);

  const contextValue = {
    language,
    setLanguage,
    t,
    isRTL,
    availableLanguages,
    formatDate,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`${isRTL ? "font-arabic" : "font-poppins"}`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
