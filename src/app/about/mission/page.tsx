"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutMissionPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("about.mission.title") || "Our Mission"}
      </h1>
      <p>
        {t("about.mission.content") ||
          "This is the mission section. Add your translated content here."}
      </p>
    </main>
  );
}
