import { useLanguage } from "@/contexts/LanguageContext";

export default function CareersPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("careers.title") || "Careers"}
      </h1>
      <p>
        {t("careers.content") ||
          "This is the careers section. Add your translated content here."}
      </p>
    </main>
  );
}
