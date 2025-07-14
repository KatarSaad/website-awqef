"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Introduction = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-white w-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6 text-primary">
            {t("about.mission.title") || "Our Mission"}
          </h2>
          <h3
            className="text-3xl md:text-4xl font-light text-emerald-700 mb-8 text-primary"
            dir="rtl"
          >
            {t("about.mission.title") || "مهمتنا"}
          </h3>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {t("about.mission.intro") ||
              "At Awqef, we bridge the gap between traditional Islamic values and modern investment opportunities. Our platform ensures every investment adheres to Sharia principles while delivering competitive returns."}
          </p>
          <p className="text-lg text-gray-500 leading-relaxed" dir="rtl">
            {t("about.mission.intro") ||
              "في أوقاف، نجسر الفجوة بين القيم الإسلامية التقليدية وفرص الاستثمار الحديثة. تضمن منصتنا التزام كل استثمار بمبادئ الشريعة مع تحقيق عوائد تنافسية."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
