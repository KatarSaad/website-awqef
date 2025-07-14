"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInvestments } from "@/hooks/api/useInvestments";
import { InvestmentResponseDto } from "@/api/generated";
import {
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface InvestmentCardProps {
  investment: InvestmentResponseDto;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment }) => {
  const { t, isRTL } = useLanguage();

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
              <TrendingUp className="text-primary-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {t("investments.investment")} #{investment.id}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  className={
                    investment.status === "CONFIRMED"
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-secondary-100 text-secondary-800 border-secondary-300"
                  }
                >
                  {investment.status === "CONFIRMED" ? (
                    <>
                      <CheckCircle size={12} className="mr-1" />
                      {t("investments.confirmed")}
                    </>
                  ) : (
                    <>
                      <Clock size={12} className="mr-1" />
                      {t("investments.pending")}
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-2xl font-bold text-primary-600">
            <DollarSign size={20} />
            <span>
              {investment.amount.toLocaleString()} {investment.currency}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <User size={16} className="mr-2" />
            <span>
              {t("investments.investor")} ID: {investment.userId}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>{new Date(investment.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Action */}
        <Button className="w-full bg-primary-600 hover:bg-primary-700">
          {t("investments.viewDetails")}
        </Button>
      </div>
    </motion.div>
  );
};

interface InvestmentListProps {
  projectId: number;
  investments?: InvestmentResponseDto[];
  isLoading?: boolean;
}

export const InvestmentList: React.FC<InvestmentListProps> = ({
  projectId,
  investments: propInvestments,
  isLoading: propIsLoading = false,
}) => {
  const { t, isRTL } = useLanguage();
  const {
    data: investmentsResponse,
    isLoading: hookIsLoading,
    error,
  } = useInvestments(projectId);

  const isLoading = propIsLoading || hookIsLoading;
  const investments =
    propInvestments ||
    (investmentsResponse?.success ? investmentsResponse.data : []);

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
        {investments.map((investment, index) => (
          <motion.div
            key={investment.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <InvestmentCard investment={investment} />
          </motion.div>
        ))}
      </div>

      {investments.length === 0 && (
        <div className="text-center py-20">
          <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">{t("investments.noInvestments")}</p>
        </div>
      )}
    </div>
  );
};
