"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  TrendingUp, 
  BookOpen, 
  BarChart, 
  Shield, 
  Newspaper, 
  Calendar, 
  DollarSign, 
  Briefcase,
  ArrowRight
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

export const FeaturedCategories: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  
  // Mock categories data
  const categories: Category[] = [
    {
      id: "islamic-finance",
      name: "Islamic Finance",
      nameAr: "التمويل الإسلامي",
      description: "Principles and practices of Sharia-compliant finance",
      descriptionAr: "مبادئ وممارسات التمويل المتوافق مع الشريعة",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-primary-100 text-primary-700 border-primary-200",
      count: 24
    },
    {
      id: "market-analysis",
      name: "Market Analysis",
      nameAr: "تحليل السوق",
      description: "Insights and trends in Islamic investment markets",
      descriptionAr: "رؤى واتجاهات في أسواق الاستثمار الإسلامي",
      icon: <BarChart className="h-6 w-6" />,
      color: "bg-secondary-100 text-secondary-700 border-secondary-200",
      count: 18
    },
    {
      id: "compliance",
      name: "Sharia Compliance",
      nameAr: "الامتثال الشرعي",
      description: "Guidelines and standards for Islamic compliance",
      descriptionAr: "إرشادات ومعايير الامتثال الإسلامي",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-green-100 text-green-700 border-green-200",
      count: 15
    },
    {
      id: "news",
      name: "News",
      nameAr: "الأخبار",
      description: "Latest updates from the world of Islamic finance",
      descriptionAr: "آخر التحديثات من عالم التمويل الإسلامي",
      icon: <Newspaper className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      count: 32
    },
    {
      id: "events",
      name: "Events",
      nameAr: "الأحداث",
      description: "Upcoming conferences, webinars and workshops",
      descriptionAr: "المؤتمرات والندوات وورش العمل القادمة",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-700 border-purple-200",
      count: 8
    },
    {
      id: "investment",
      name: "Investment",
      nameAr: "الاستثمار",
      description: "Investment strategies and opportunities",
      descriptionAr: "استراتيجيات وفرص الاستثمار",
      icon: <DollarSign className="h-6 w-6" />,
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      count: 27
    }
  ];
  
  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {t("blog.exploreCategories")}
        </h2>
        <p className="text-gray-600">
          {t("blog.categoriesDescription")}
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog?category=${category.id}`} passHref>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 h-full flex flex-col">
                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                  {category.icon}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {language === "ar" ? category.nameAr : category.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {language === "ar" ? category.descriptionAr : category.description}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    {category.count} {t("blog.articles")}
                  </span>
                  
                  <div className="text-primary-600 flex items-center text-sm font-medium">
                    {t("blog.viewAll")}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};