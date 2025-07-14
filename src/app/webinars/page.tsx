"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function WebinarsPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("webinars.title") || "Webinars"}
      </h1>
      <p>
        {t("webinars.content") ||
          "This is the Webinars section. Add your translated content here."}
      </p>
    </main>
  );
}
