"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ResearchPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("research.title") || "Research"}
      </h1>
      <p>
        {t("research.content") ||
          "This is the Research section. Add your translated content here."}
      </p>
    </main>
  );
}
