
"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Target, Award, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Statistic {
  id: number;
  title: string;
  value: number;
  unit: string;
  category?: string;
  icon?: string;
  change?: number;
}

// Dummy data - replace with API call
const dummyStats: Statistic[] = [
  {
    id: 1,
    title: "Total Funding Raised",
    value: 2500000,
    unit: "AED",
    category: "funding",
    icon: "dollar",
    change: 12.5,
  },
  {
    id: 2,
    title: "Active Projects",
    value: 156,
    unit: "Projects",
    category: "projects",
    icon: "target",
    change: 8.2,
  },
  {
    id: 3,
    title: "Total Investors",
    value: 3240,
    unit: "People",
    category: "community",
    icon: "users",
    change: 15.7,
  },
  {
    id: 4,
    title: "Success Rate",
    value: 94,
    unit: "%",
    category: "performance",
    icon: "award",
    change: 2.1,
  },
  {
    id: 5,
    title: "Countries Served",
    value: 12,
    unit: "Countries",
    category: "reach",
    icon: "globe",
    change: 0,
  },
  {
    id: 6,
    title: "Monthly Growth",
    value: 18,
    unit: "%",
    category: "growth",
    icon: "trending",
    change: 5.3,
  },
];

const getIcon = (iconName: string) => {
  const iconMap = {
    dollar: DollarSign,
    target: Target,
    users: Users,
    award: Award,
    globe: Globe,
    trending: TrendingUp,
  };
  return iconMap[iconName as keyof typeof iconMap] || TrendingUp;
};

export const StatsList: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const formatValue = (value: number, unit: string) => {
    if (unit === "AED" && value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <div className="py-12 bg-gradient-to-br from-primary-50 to-blue-50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">
            {t("stats.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("stats.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyStats.map((stat, index) => {
            const IconComponent = getIcon(stat.icon || "trending");
            
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <IconComponent className="text-primary-600" size={24} />
                  </div>
                  {stat.change !== undefined && stat.change !== 0 && (
                    <div className={`flex items-center text-sm ${
                      stat.change > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      <TrendingUp 
                        size={16} 
                        className={stat.change < 0 ? "rotate-180" : ""} 
                      />
                      <span className="ml-1">
                        {Math.abs(stat.change)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-2">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatValue(stat.value, stat.unit)}
                    <span className="text-lg font-normal text-gray-500 ml-1">
                      {stat.unit}
                    </span>
                  </div>
                </div>

                <h3 className="text-gray-700 font-medium">{stat.title}</h3>
                
                {stat.category && (
                  <div className="mt-3">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {stat.category}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
