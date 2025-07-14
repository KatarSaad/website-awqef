
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogList } from "./blog/BlogList";
import { Button } from "@/components/ui/button";

const TrendingPosts = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            {t("trendingPosts.title")}
          </h2>
          <h3
            className="text-2xl md:text-3xl font-light text-emerald-700 mb-6"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {t("trendingPosts.subtitle")}
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("trendingPosts.description")}
          </p>
        </motion.div>

        {/* Trending Posts List */}
        <BlogList limit={3} showFilters={false} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
            {t("trendingPosts.button")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingPosts;
