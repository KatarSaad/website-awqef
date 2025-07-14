
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  isActive: boolean;
}

// Dummy data - replace with API call
const dummyFaqs: FAQ[] = [
  {
    id: 1,
    question: "How do I create a project?",
    answer: "To create a project, navigate to the projects section and click on 'Create New Project'. Fill in the required information including title, description, funding goals, and timeline.",
    category: "Projects",
    isActive: true,
  },
  {
    id: 2,
    question: "What are the investment requirements?",
    answer: "Investment requirements vary by project. Minimum investments typically start from 1,000 AED. Each project has specific investment criteria outlined in its details page.",
    category: "Investment",
    isActive: true,
  },
  {
    id: 3,
    question: "How is Sharia compliance ensured?",
    answer: "All projects undergo rigorous Sharia compliance review by our board of certified Islamic scholars. We provide detailed fatwa documentation for each approved project.",
    category: "Compliance",
    isActive: true,
  },
];

export const FaqList: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(dummyFaqs.map(faq => faq.category).filter(Boolean)))];
  
  const filteredFaqs = selectedCategory === "all" 
    ? dummyFaqs 
    : dummyFaqs.filter(faq => faq.category === selectedCategory);

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-900 mb-4 flex items-center justify-center">
          <HelpCircle className="mr-2" size={32} />
          {t("faq.title")}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("faq.subtitle")}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category === "all" ? t("common.all") : category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredFaqs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggleExpanded(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                {faq.category && (
                  <span className="text-sm text-primary-600 mt-1 block">
                    {faq.category}
                  </span>
                )}
              </div>
              {expandedId === faq.id ? (
                <ChevronUp className="text-gray-500" size={20} />
              ) : (
                <ChevronDown className="text-gray-500" size={20} />
              )}
            </button>
            
            {expandedId === faq.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="border-t border-gray-200"
              >
                <div className="px-6 py-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">{t("faq.noResults")}</p>
        </div>
      )}
    </div>
  );
};
