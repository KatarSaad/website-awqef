"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { t, language } = useLanguage();
  const testimonials = [
    {
      id: 1,
      name: t("testimonials.1.name"),
      position: t("testimonials.1.position"),
      content: t("testimonials.1.content"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      location: t("testimonials.1.location"),
    },
    {
      id: 2,
      name: t("testimonials.2.name"),
      position: t("testimonials.2.position"),
      content: t("testimonials.2.content"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616c4e947ca?w=100&h=100&fit=crop&crop=face",
      location: t("testimonials.2.location"),
    },
    {
      id: 3,
      name: t("testimonials.3.name"),
      position: t("testimonials.3.position"),
      content: t("testimonials.3.content"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      location: t("testimonials.3.location"),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background-light to-paper w-full">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("testimonials.title")}
          </h2>
          <h3
            className="text-2xl md:text-3xl font-light text-primary mb-6"
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {t("testimonials.subtitle")}
          </h3>
          <p className="text-xl text-grey-600 max-w-2xl mx-auto">
            {t("testimonials.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-grey-100 relative"
            >
              <Quote
                className="absolute top-6 right-6 text-primary-200"
                size={24}
              />

              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-grey-600 text-sm">
                    {testimonial.position}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-secondary-500 fill-current"
                  />
                ))}
              </div>

              <p className="text-grey-700 mb-4 italic leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="border-t border-grey-200 pt-4">
                <p className="text-grey-500 text-sm">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
