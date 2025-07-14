"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useStatistics } from "@/hooks/api/useStatistics";

interface Statistic {
  id: number;
  label: { en: string; ar: string } | string;
  value: number;
  source?: string;
  sectionId?: number;
}

export const StatisticsList: React.FC<{ sectionId?: number }> = ({
  sectionId,
}) => {
  const { t, language, isRTL } = useLanguage();
  const { data: statisticsResponse, isLoading, error } = useStatistics();

  const getTranslatedLabel = (label: any) => {
    if (typeof label === "string") return label;
    if (typeof label === "object" && label[language]) return label[language];
    return label?.en || "Statistic";
  };

  if (isLoading) {
    return <div className="text-center py-8">{t("common.loading")}</div>;
  }
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">{t("common.error")}</div>
    );
  }

  const statistics = statisticsResponse?.success ? statisticsResponse.data : [];

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary-900 flex items-center space-x-2">
          <BarChart3 size={24} />
          <span>{t("content.statistics")}</span>
        </h2>
      </div>

      {statistics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statistics.map((statistic, index) => (
            <motion.div
              key={statistic.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 text-center"
            >
              <div className="mb-4">
                <TrendingUp className="mx-auto text-blue-600" size={32} />
              </div>

              <div className="text-3xl font-bold text-blue-900 mb-2">
                {statistic.value.toLocaleString()}
              </div>

              <div className="text-lg font-medium text-gray-800 mb-2">
                {getTranslatedLabel(statistic.label)}
              </div>

              {statistic.source && (
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                  <Info size={12} />
                  <span>
                    {t("content.source")}: {statistic.source}
                  </span>
                </div>
              )}

              {statistic.sectionId && (
                <div className="text-xs text-gray-400 mt-1">
                  {t("content.section")} #{statistic.sectionId}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
          <p>{t("content.noStatistics")}</p>
        </div>
      )}
    </div>
  );
};
