"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, User, Calendar, CheckCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Pledge {
  id: number;
  amount: number;
  currency: string;
  userId: number;
  projectId: number;
  isConfirmed: boolean;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
}

interface PledgeListProps {
  pledges: Pledge[];
  projectId?: number;
}

export const PledgeList: React.FC<PledgeListProps> = ({
  pledges,
  projectId,
}) => {
  const { t, isRTL } = useLanguage();

  const totalPledged = pledges.reduce((sum, pledge) => sum + pledge.amount, 0);
  const confirmedPledges = pledges.filter((p) => p.isConfirmed);
  const pendingPledges = pledges.filter((p) => !p.isConfirmed);

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary-900 flex items-center space-x-2">
          <DollarSign size={24} />
          <span>{t("projects.pledges")}</span>
        </h2>
      </div>

      {/* Pledge Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-900">
            {totalPledged.toLocaleString()} AED
          </div>
          <div className="text-sm text-blue-600">
            {t("projects.totalPledged")}
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-900">
            {confirmedPledges.length}
          </div>
          <div className="text-sm text-green-600">
            {t("projects.confirmedPledges")}
          </div>
        </div>
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-secondary-900">
            {pendingPledges.length}
          </div>
          <div className="text-sm text-secondary-600">
            {t("projects.pendingPledges")}
          </div>
        </div>
      </div>

      {pledges.length > 0 ? (
        <div className="space-y-4">
          {pledges.map((pledge, index) => (
            <motion.div
              key={pledge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {t("projects.user")} #{pledge.userId}
                    </div>
                    <div className="text-sm text-gray-500">
                      {pledge.amount.toLocaleString()} {pledge.currency}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar size={12} />
                    <span>
                      {new Date(pledge.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      pledge.isConfirmed
                        ? "bg-green-100 text-green-800"
                        : "bg-secondary-100 text-secondary-800"
                    }`}
                  >
                    {pledge.isConfirmed ? (
                      <>
                        <CheckCircle size={12} />
                        <span>{t("projects.confirmed")}</span>
                      </>
                    ) : (
                      <>
                        <Clock size={12} />
                        <span>{t("projects.pending")}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <DollarSign size={48} className="mx-auto mb-4 opacity-50" />
          <p>{t("projects.noPledges")}</p>
        </div>
      )}
    </div>
  );
};
