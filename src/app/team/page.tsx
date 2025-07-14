import { useLanguage } from "@/contexts/LanguageContext";

export default function TeamPage() {
  const { t } = useLanguage();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">
        {t("team.title") || "Our Team"}
      </h1>
      <p>
        {t("team.content") ||
          "This is the team section. Add your translated content here."}
      </p>
    </main>
  );
}
