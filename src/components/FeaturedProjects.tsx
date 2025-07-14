
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProjectList } from "./projects/ProjectList";
import { Button } from "@/components/ui/button";

const FeaturedProjects = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
            {t("featuredProjects.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("featuredProjects.subtitle")}
          </p>
        </motion.div>

        {/* Featured Projects List */}
        <ProjectList featured={true} limit={6} showFilters={false} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3"
          >
            {t("featuredProjects.viewAll")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
