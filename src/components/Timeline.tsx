"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Timeline = () => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const steps = [
    {
      number: "01",
      title: t("timeline.steps.1.title"),
      description: t("timeline.steps.1.description"),
      icon: "👤",
    },
    {
      number: "02",
      title: t("timeline.steps.2.title"),
      description: t("timeline.steps.2.description"),
      icon: "📋",
    },
    {
      number: "03",
      title: t("timeline.steps.3.title"),
      description: t("timeline.steps.3.description"),
      icon: "💼",
    },
    {
      number: "04",
      title: t("timeline.steps.4.title"),
      description: t("timeline.steps.4.description"),
      icon: "📊",
    },
    {
      number: "05",
      title: t("timeline.steps.5.title"),
      description: t("timeline.steps.5.description"),
      icon: "📈",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary-100 to-white w-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {t("timeline.title")}
          </h2>
          <h3
            className="text-2xl md:text-3xl font-light mb-6 text-primary"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {t("timeline.subtitle")}
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("timeline.description")}
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-200 to-secondary hidden lg:block"></div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
                }
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                  }`}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100">
                    <div className="text-6xl mb-4">{step.icon}</div>
                    <div className="font-bold text-lg mb-2 text-primary">
                      {t("timeline.step")} {step.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-primary">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:block relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Spacer for alternate layout */}
                <div className="flex-1 hidden lg:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
