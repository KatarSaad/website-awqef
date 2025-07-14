"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFatwas } from "@/hooks/api/useFatwas";
import type { FatwaResponseDto } from "@/api/generated/models/FatwaResponseDto";
import {
  Shield,
  Calendar,
  User,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface FatwaCardProps {
  fatwa: FatwaResponseDto;
}

const FatwaCard: React.FC<FatwaCardProps> = ({ fatwa }) => {
  const { t, language, isRTL } = useLanguage();

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || Object.values(field)[0] || "";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle size={16} className="text-green-600" />;
      case "PENDING":
        return <Clock size={16} className="text-secondary-600" />;
      case "REJECTED":
        return <XCircle size={16} className="text-red-600" />;
      case "EXPIRED":
        return <AlertTriangle size={16} className="text-orange-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-300";
      case "PENDING":
        return "bg-secondary-100 text-secondary-800 border-secondary-300";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-300";
      case "EXPIRED":
        return "bg-orange-100 text-orange-800 border-orange-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Shield className="text-primary-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {t("fatwas.fatwa")} #{fatwa.id}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getStatusColor(fatwa.status || "")}>
                  {getStatusIcon(fatwa.status || "")}
                  <span className="ml-1">
                    {t(`fatwas.status.${fatwa.status?.toLowerCase?.()}`) ||
                      fatwa.status}
                  </span>
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Scholar */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <User size={16} />
            <span className="font-medium">
              {getTranslatedText(fatwa.scholarName) ||
                t("fatwas.unknownScholar")}
            </span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {getTranslatedText(fatwa.summary) || t("fatwas.noSummary")}
        </p>

        {/* Dates */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>
              {t("fatwas.issued")}:{" "}
              {fatwa.issuedAt
                ? new Date(fatwa.issuedAt).toLocaleDateString()
                : "-"}
            </span>
          </div>
          {fatwa.expiresAt && (
            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-2" />
              <span>
                {t("fatwas.expires")}:{" "}
                {new Date(fatwa.expiresAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="flex-1 text-primary-600 border-primary-200 hover:bg-primary-50"
          >
            {t("fatwas.viewDetails")}
          </Button>
          {fatwa.documentUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => window.open(fatwa.documentUrl, "_blank")}
            >
              <FileText size={16} />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface FatwaListProps {
  fatwas?: FatwaResponseDto[];
  isLoading?: boolean;
}

export const FatwaList: React.FC<FatwaListProps> = ({
  fatwas: propFatwas,
  isLoading: propIsLoading = false,
}) => {
  const { t, isRTL } = useLanguage();
  const { data: fatwasResponse, isLoading: hookIsLoading, error } = useFatwas();

  const isLoading = propIsLoading || hookIsLoading;
  const fatwas =
    propFatwas || (fatwasResponse?.success ? fatwasResponse.data : []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        <span className="ml-2 text-gray-600">{t("common.loading")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">{t("common.error")}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4"
          variant="outline"
        >
          {t("common.tryAgain")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fatwas.map((fatwa, index) => (
          <motion.div
            key={fatwa.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FatwaCard fatwa={fatwa} />
          </motion.div>
        ))}
      </div>

      {fatwas.length === 0 && (
        <div className="text-center py-20">
          <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">{t("fatwas.noFatwas")}</p>
        </div>
      )}
    </div>
  );
};
