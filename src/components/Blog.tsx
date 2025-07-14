
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogList } from "./blog/BlogList";

const Blog = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary-800 mb-4">
            {t("blog.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </motion.div>

        {/* Blog List */}
        <BlogList showFilters={true} />
      </div>
    </section>
  );
};

export default Blog;
