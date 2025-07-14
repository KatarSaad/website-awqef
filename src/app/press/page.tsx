"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PressPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("press.title") || "Press & Media"}
      </h1>
      <p>
        {t("press.content") ||
          "This is the press & media section. Add your translated content here."}
      </p>
    </main>
  );
}
