
"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { InvestmentList } from "@/components/investments/InvestmentList";
import SeedDataButtons from "@/components/SeedDataButtons";

export default function InvestmentsPage() {
  const { t, isRTL } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SeedDataButtons />
        </div>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            {t("investments.title")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("investments.subtitle")}
          </p>
        </div>

        <InvestmentList />
      </div>
    </main>
  );
}
