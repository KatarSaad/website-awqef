"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function HowItWorksPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("howItWorks.title") || "How It Works"}
      </h1>
      <p>
        {t("howItWorks.content") ||
          "This is the How It Works section. Add your translated content here."}
      </p>
    </main>
  );
}
