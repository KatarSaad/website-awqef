import { useLanguage } from "@/contexts/LanguageContext";

export default function RisksPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("risks.title") || "Risk Disclosure"}
      </h1>
      <p>
        {t("risks.content") ||
          "This is the Risk Disclosure section. Add your translated content here."}
      </p>
    </main>
  );
}
