"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CreateInvestmentDto, InvestmentResponseDto } from "@/api/generated";

interface ProjectInvestmentsProps {
  projectId: number;
  investments: InvestmentResponseDto[];
}

export const ProjectInvestments: React.FC<ProjectInvestmentsProps> = ({
  projectId,
  investments,
}) => {
  const { t, isRTL } = useLanguage();

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const averageInvestment =
    investments.length > 0 ? totalInvestment / investments.length : 0;

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className="text-2xl font-bold text-primary-900 flex items-center space-x-2">
        <TrendingUp size={24} />
        <span>{t("projects.investments")}</span>
      </h2>

      {/* Investment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <DollarSign className="mx-auto mb-2 text-blue-600" size={24} />
          <div className="text-2xl font-bold text-blue-900">
            ${totalInvestment.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600">
            {t("projects.totalInvested")}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 text-center">
          <Users className="mx-auto mb-2 text-green-600" size={24} />
          <div className="text-2xl font-bold text-green-900">
            {investments.length}
          </div>
          <div className="text-sm text-green-600">
            {t("projects.totalInvestors")}
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <TrendingUp className="mx-auto mb-2 text-purple-600" size={24} />
          <div className="text-2xl font-bold text-purple-900">
            ${Math.round(averageInvestment).toLocaleString()}
          </div>
          <div className="text-sm text-purple-600">
            {t("projects.averageInvestment")}
          </div>
        </div>
      </div>

      {/* Recent Investments */}
      {investments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary-900">
            {t("projects.recentInvestments")}
          </h3>

          <div className="space-y-3">
            {investments.slice(0, 5).map((investment, index) => (
              <motion.div
                key={investment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-primary-900">
                      {t("projects.investor")} #{investment.investorId}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>
                        {new Date(investment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-green-600">
                    {investment.currency} {investment.amount.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {investments.length > 5 && (
            <div className="text-center">
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                {t("projects.viewAllInvestments")} ({investments.length - 5}{" "}
                {t("projects.more")})
              </button>
            </div>
          )}
        </div>
      )}

      {investments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
          <p>{t("projects.noInvestments")}</p>
        </div>
      )}
    </div>
  );
};
