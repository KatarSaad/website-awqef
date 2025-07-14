"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Clock,
  User,
  Calendar,
  FileText,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Fatwa {
  id: number;
  title: string;
  description: string;
  scholarName: string;
  issuedDate: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  documentUrl?: string;
}

interface ProjectFatwaProps {
  projectId: number;
  fatwa?: Fatwa;
}

export const ProjectFatwa: React.FC<ProjectFatwaProps> = ({
  projectId,
  fatwa,
}) => {
  const { t, isRTL } = useLanguage();

  if (!fatwa) {
    return (
      <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
        <h2 className="text-2xl font-bold text-primary-900 flex items-center space-x-2">
          <BookOpen size={24} />
          <span>{t("projects.shariaCompliance")}</span>
        </h2>

        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">{t("projects.noFatwa")}</p>
          <p className="text-sm text-gray-400 mt-2">
            {t("projects.fatwaInReview")}
          </p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="text-green-600" size={20} />;
      case "PENDING":
        return <Clock className="text-secondary-600" size={20} />;
      case "REJECTED":
        return <FileText className="text-red-600" size={20} />;
      default:
        return <BookOpen className="text-gray-600" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENDING":
        return "bg-secondary-100 text-secondary-800 border-secondary-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className="text-2xl font-bold text-primary-900 flex items-center space-x-2">
        <BookOpen size={24} />
        <span>{t("projects.shariaCompliance")}</span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            {getStatusIcon(fatwa.status)}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {fatwa.title}
              </h3>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  fatwa.status
                )}`}
              >
                {t(`projects.fatwaStatus.${fatwa.status.toLowerCase()}`)}
              </span>
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 leading-relaxed">{fatwa.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <User size={18} />
            <div>
              <span className="text-sm text-gray-500">
                {t("projects.scholarName")}:
              </span>
              <p className="font-medium">{fatwa.scholarName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar size={18} />
            <div>
              <span className="text-sm text-gray-500">
                {t("projects.issuedDate")}:
              </span>
              <p className="font-medium">
                {new Date(fatwa.issuedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {fatwa.status === "APPROVED" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-600" size={20} />
              <span className="font-medium text-green-800">
                {t("projects.shariaApproved")}
              </span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              {t("projects.shariaApprovedDesc")}
            </p>
          </div>
        )}

        {fatwa.documentUrl && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a
              href={fatwa.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <FileText size={16} className="mr-2" />
              {t("projects.viewFatwaDocument")}
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};
