"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function CalculatorPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("calculator.title") || "Returns Calculator"}
      </h1>
      <p>
        {t("calculator.content") ||
          "This is the Returns Calculator section. Add your translated content here."}
      </p>
    </main>
  );
}
