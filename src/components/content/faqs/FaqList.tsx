"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFaqs } from "@/hooks/api/useFaqs";
import type { FaqResponseDto } from "@/api/generated/models/FaqResponseDto";

const FaqList: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const { data: faqsResponse, isLoading, error } = useFaqs();

  const getTranslatedText = (text: any) => {
    if (typeof text === "string") return text;
    if (typeof text === "object" && text[language]) return text[language];
    return text?.en || "";
  };

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  if (isLoading) {
    return <div className="text-center py-8">{t("common.loading")}</div>;
  }
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">{t("common.error")}</div>
    );
  }

  const faqs: FaqResponseDto[] = faqsResponse?.success ? faqsResponse.data : [];
  // Ensure order is a number and fallback to 0 if undefined
  const sortedFaqs = [...faqs].sort(
    (a, b) => (Number(a.order) || 0) - (Number(b.order) || 0)
  );

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary-900 flex items-center space-x-2">
          <HelpCircle size={24} />
          <span>{t("content.faqs")}</span>
        </h2>
      </div>

      {sortedFaqs.length > 0 ? (
        <div className="space-y-4">
          {sortedFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900 flex-1 pr-4">
                  {getTranslatedText(faq.question)}
                </h3>
                {expandedItems.has(faq.id) ? (
                  <ChevronUp className="text-gray-500" size={20} />
                ) : (
                  <ChevronDown className="text-gray-500" size={20} />
                )}
              </button>

              <AnimatePresence>
                {expandedItems.has(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-4 text-gray-700 leading-relaxed">
                      {getTranslatedText(faq.answer)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <HelpCircle size={48} className="mx-auto mb-4 opacity-50" />
          <p>{t("content.noFaqs")}</p>
        </div>
      )}
    </div>
  );
};

export default FaqList;
