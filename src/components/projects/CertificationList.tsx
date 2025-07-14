
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Certification {
  id: number;
  title: string;
  issuingBody: string;
  documentUrl: string;
  projectId: number;
  issuedAt: string;
  validUntil: string;
}

interface CertificationListProps {
  certifications: Certification[];
}

export const CertificationList: React.FC<CertificationListProps> = ({ certifications }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary-900 flex items-center space-x-2">
          <Award size={24} />
          <span>{t("projects.certifications")} ({certifications.length})</span>
        </h2>
      </div>

      {certifications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((certification, index) => (
            <motion.div
              key={certification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center">
                  <Award size={20} />
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {t("projects.verified")}
                </Badge>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{certification.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{certification.issuingBody}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{t("projects.issued")}: {new Date(certification.issuedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{t("projects.validUntil")}: {new Date(certification.validUntil).toLocaleDateString()}</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2"
                onClick={() => window.open(certification.documentUrl, '_blank')}
              >
                <FileText size={16} />
                <span>{t("projects.viewCertificate")}</span>
                <ExternalLink size={14} />
              </Button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Award size={48} className="mx-auto mb-4 opacity-50" />
          <p>{t("projects.noCertifications")}</p>
        </div>
      )}
    </div>
  );
};
