"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutLeadershipPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("about.leadership.title") || "Leadership"}
      </h1>
      <p>
        {t("about.leadership.content") ||
          "This is the leadership section. Add your translated content here."}
      </p>
    </main>
  );
}
