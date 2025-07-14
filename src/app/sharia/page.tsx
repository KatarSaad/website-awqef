"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ShariaPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("sharia.title") || "Sharia Compliance"}
      </h1>
      <p>
        {t("sharia.content") ||
          "This is the Sharia Compliance section. Add your translated content here."}
      </p>
    </main>
  );
}
