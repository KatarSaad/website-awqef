"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("terms.title") || "Terms of Service"}
      </h1>
      <p>
        {t("terms.content") ||
          "This is the Terms of Service section. Add your translated content here."}
      </p>
    </main>
  );
}
