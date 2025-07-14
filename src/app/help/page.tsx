"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function HelpPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("help.title") || "Help Center"}
      </h1>
      <p>
        {t("help.content") ||
          "This is the Help Center section. Add your translated content here."}
      </p>
    </main>
  );
}
