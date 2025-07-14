"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building, CheckCircle, Star, Users, ExternalLink, Award, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WebsiteOrganizationResponseDto } from "@/api/generated/models/WebsiteOrganizationResponseDto";
import { OrganizationDetailModal } from "./OrganizationDetailModal";

interface OrganizationCardProps {
  organization: WebsiteOrganizationResponseDto;
  onViewDetails: (org: WebsiteOrganizationResponseDto) => void;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization,
  onViewDetails,
}) => {
  const { t, language, isRTL } = useLanguage();

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || Object.values(field)[0] || "";
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case "GOLD":
        return "bg-secondary-100 text-secondary-800 border-secondary-300";
      case "SILVER":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "BRONZE":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "PLATINUM":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const getTierIcon = (tier?: string) => {
    switch (tier) {
      case "GOLD":
        return <Award className="h-4 w-4 mr-1" />;
      case "PLATINUM":
        return <Award className="h-4 w-4 mr-1" />;
      default:
        return null;
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
            {organization.logo ? (
              <img
                src={organization.logo}
                alt={getTranslatedText(organization.name)}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Building className="text-primary-600" size={24} />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {getTranslatedText(organization.name)}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getTierColor(organization.tier)}>
                  {getTierIcon(organization.tier)}
                  {organization.tier}
                </Badge>
                {organization.isVerified && (
                  <Badge className="bg-green-100 text-green-800 border-green-300 flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    {t("organizations.verified")}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 min-h-[4.5rem]">
          {getTranslatedText(organization.description) ||
            t("organizations.noDescription")}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>
              {new Date(organization.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Star size={16} className="mr-2" />
            <span>
              {/* Mock rating since it's not in the DTO */}
              {(Math.floor(Math.random() * 5) + 3) + "/5"} {t("organizations.rating")}
            </span>
          </div>
        </div>

        {/* Action */}
        <Button 
          className="w-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center"
          onClick={() => onViewDetails(organization)}
        >
          {t("organizations.viewDetails")}
          <ExternalLink size={16} className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

interface OrganizationListProps {
  organizations: WebsiteOrganizationResponseDto[];
  isLoading?: boolean;
}

export const OrganizationList: React.FC<OrganizationListProps> = ({
  organizations,
  isLoading = false,
}) => {
  const { t, isRTL } = useLanguage();
  const [selectedOrganization, setSelectedOrganization] = useState<WebsiteOrganizationResponseDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (org: WebsiteOrganizationResponseDto) => {
    setSelectedOrganization(org);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" dir={isRTL ? "rtl" : "ltr"}>
      {/* Results count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {organizations.length} {t("organizations.resultsFound")}
        </p>
      </div>

      {/* Organization grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org, index) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <OrganizationCard 
              organization={org} 
              onViewDetails={handleViewDetails}
            />
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {organizations.length === 0 && (
        <div className="text-center py-20">
          <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">{t("organizations.noOrganizations")}</p>
        </div>
      )}

      {/* Detail modal */}
      {selectedOrganization && (
        <OrganizationDetailModal
          organization={selectedOrganization}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};