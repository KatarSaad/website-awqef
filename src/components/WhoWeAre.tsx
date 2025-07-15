"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const WhoWeAre = () => {
  const { t, language } = useLanguage();
  const features = [
    {
      icon: "🏛️",
      title: t("whoWeAre.feature1.title"),
      description: t("whoWeAre.feature1.description"),
    },
    {
      icon: "🔒",
      title: t("whoWeAre.feature2.title"),
      description: t("whoWeAre.feature2.description"),
    },
    {
      icon: "📊",
      title: t("whoWeAre.feature3.title"),
      description: t("whoWeAre.feature3.description"),
    },
  ];

  return (
    <section className="py-24 bg-gray-50 w-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">
            {t("whoWeAre.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
            {t("whoWeAre.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-center">{feature.icon}</div>
              <h4 className="text-xl font-bold mb-2 text-center text-primary">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-center mb-4 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
