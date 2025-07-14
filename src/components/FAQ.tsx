"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaqList } from "./content/FaqList";

const FAQ = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-background-default w-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            {t("faq.title")}
          </h2>
          <h3
            className="text-2xl md:text-3xl font-light text-primary-700 mb-6"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {t("faq.subtitle")}
          </h3>
          <p className="text-xl text-grey-600 max-w-2xl mx-auto">
            {t("faq.description")}
          </p>
        </motion.div>
        <FaqList />
      </div>
    </section>
  );
};

export default FAQ;
