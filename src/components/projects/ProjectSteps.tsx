"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CreateProjectStepDto } from "@/api/generated";

interface ProjectStepsProps {
  steps: CreateProjectStepDto[];
}

export const ProjectSteps: React.FC<ProjectStepsProps> = ({ steps }) => {
  const { t, language, isRTL } = useLanguage();

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || Object.values(field)[0] || "";
  };

  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className="text-2xl font-bold text-primary-900">
        {t("projects.projectSteps")}
      </h2>

      <div className="space-y-4">
        {sortedSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50"
          >
            <div className="flex-shrink-0 mt-1">
              {step.isCompleted ? (
                <CheckCircle className="text-green-500" size={24} />
              ) : index === 0 ? (
                <Clock className="text-secondary-500" size={24} />
              ) : (
                <Circle className="text-gray-400" size={24} />
              )}
            </div>

            <div className="flex-1">
              <h3
                className={`font-semibold ${
                  step.isCompleted
                    ? "text-green-900"
                    : index === 0
                    ? "text-secondary-700"
                    : "text-gray-700"
                }`}
              >
                {getTranslatedText(step.titleId) ||
                  `${t("projects.step")} ${step.order}`}
              </h3>

              <p className="text-gray-600 mt-1">
                {getTranslatedText(step.descriptionId) ||
                  t("projects.stepDescription")}
              </p>

              {step.isCompleted && step.completedAt && (
                <div className="text-sm text-green-600 mt-2">
                  {t("projects.completedOn")}:{" "}
                  {new Date(step.completedAt).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="text-sm text-gray-500">
              {t("projects.step")} {step.order}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
