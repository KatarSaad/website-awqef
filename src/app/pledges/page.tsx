
"use client";

import React from "react";
import { PledgeList } from "@/components/projects/pledges/PledgeList";
import { usePledges } from "@/hooks/api/usePledges";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

export default function PledgesPage() {
  const { data: pledgesResponse, isLoading, error } = usePledges();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>{t("common.loading")}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 text-red-600">
          <p>{t("common.error")}: {error.message}</p>
        </div>
      </div>
    );
  }

  const pledges = pledgesResponse?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <PledgeList pledges={pledges} />
    </div>
  );
}
