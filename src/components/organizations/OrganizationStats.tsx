"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building, CheckCircle, Award, Briefcase } from "lucide-react";

interface OrganizationStatsProps {
  totalCount: number;
  verifiedCount: number;
  tierCounts: {
    BRONZE: number;
    SILVER: number;
    GOLD: number;
    PLATINUM: number;
  };
}

export const OrganizationStats: React.FC<OrganizationStatsProps> = ({
  totalCount,
  verifiedCount,
  tierCounts,
}) => {
  const { t, isRTL } = useLanguage();

  const stats = [
    {
      label: t("organizations.stats.total") || "Total Organizations",
      value: totalCount,
      icon: Building,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: t("organizations.stats.verified") || "Verified Organizations",
      value: verifiedCount,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      label: t("organizations.stats.premium") || "Premium Partners",
      value: tierCounts.PLATINUM + tierCounts.GOLD,
      icon: Award,
      color: "bg-secondary-100 text-secondary-600",
    },
    {
      label: t("organizations.stats.active") || "Active Organizations",
      value: totalCount, // Assuming all organizations are active
      icon: Briefcase,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" dir={isRTL ? "rtl" : "ltr"}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {stat.value}
              </h3>
            </div>
            <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}