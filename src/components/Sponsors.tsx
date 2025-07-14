"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Sponsors = () => {
  const { t, language } = useLanguage();
  const sponsors = [
    { name: t("sponsors.1.name"), logo: "🏛️", size: "large" },
    { name: t("sponsors.2.name"), logo: "📜", size: "medium" },
    { name: t("sponsors.3.name"), logo: "🏪", size: "large" },
    { name: t("sponsors.4.name"), logo: "🏦", size: "medium" },
    { name: t("sponsors.5.name"), logo: "🏢", size: "large" },
    { name: t("sponsors.6.name"), logo: "🏬", size: "medium" },
    { name: t("sponsors.7.name"), logo: "🏭", size: "medium" },
    { name: t("sponsors.8.name"), logo: "🏤", size: "large" },
  ];

  return (
    <section className="py-20 bg-gray-50 w-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4 text-primary">
            {t("sponsors.title")}
          </h2>
          <h3
            className="text-2xl md:text-3xl font-light text-emerald-700 mb-6 text-primary"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {t("sponsors.subtitle")}
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("sponsors.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 ${
                sponsor.size === "large" ? "md:col-span-1" : "md:col-span-1"
              }`}
            >
              <div className="text-4xl md:text-5xl mb-4">{sponsor.logo}</div>
              <div className="text-sm font-medium text-gray-700">
                {sponsor.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl mb-4">🛡️</div>
            <h4 className="text-lg font-bold text-emerald-900 mb-2">
              {t("sponsors.trust.1.title")}
            </h4>
            <p className="text-gray-600">{t("sponsors.trust.1.desc")}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">📋</div>
            <h4 className="text-lg font-bold text-emerald-900 mb-2">
              {t("sponsors.trust.2.title")}
            </h4>
            <p className="text-gray-600">{t("sponsors.trust.2.desc")}</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-4">🌍</div>
            <h4 className="text-lg font-bold text-emerald-900 mb-2">
              {t("sponsors.trust.3.title")}
            </h4>
            <p className="text-gray-600">{t("sponsors.trust.3.desc")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
