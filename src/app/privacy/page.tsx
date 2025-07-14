"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("privacy.title") || "Privacy Policy"}
      </h1>
      <p>
        {t("privacy.content") ||
          "This is the Privacy Policy section. Add your translated content here."}
      </p>
    </main>
  );
}
