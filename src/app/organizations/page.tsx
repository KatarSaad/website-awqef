"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { OrganizationsView } from "@/components/organizations/OrganizationsView";

export default function OrganizationsPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background-light pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            {t("organizations.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("organizations.subtitle")}
          </p>
        </motion.div>

        <OrganizationsView />
      </div>
    </main>
  );
}