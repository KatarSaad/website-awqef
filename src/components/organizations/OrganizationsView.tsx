"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useOrganizations } from "@/hooks/api/useOrganizations";
import { OrganizationList } from "./OrganizationList";
import { OrganizationFilters } from "./OrganizationFilters";
import { OrganizationSearch } from "./OrganizationSearch";
import { OrganizationStats } from "./OrganizationStats";
import { WebsiteOrganizationResponseDto } from "@/api/generated/models/WebsiteOrganizationResponseDto";
import { Loader2 } from "lucide-react";

export const OrganizationsView: React.FC = () => {
  const { t } = useLanguage();
  const organizationsHook = useOrganizations();
  const {
    data: organizationsResponse,
    isLoading,
    error,
  } = organizationsHook.getOrganizations();

  const [filteredOrganizations, setFilteredOrganizations] = useState<
    WebsiteOrganizationResponseDto[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Process organizations data when it loads
  useEffect(() => {
    if (organizationsResponse) {
      applyFilters(
        organizationsResponse,
        searchQuery,
        selectedTier,
        verifiedOnly
      );
    }
  }, [organizationsResponse, searchQuery, selectedTier, verifiedOnly]);

  // Filter organizations based on search query and filters
  const applyFilters = (
    organizations: WebsiteOrganizationResponseDto[],
    query: string,
    tier: string,
    verified: boolean
  ) => {
    let filtered = [...organizations];

    // Apply search filter
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter((org) => {
        const nameEn = org.name?.en?.toLowerCase() || "";
        const nameAr = org.name?.ar?.toLowerCase() || "";
        const descEn = org.description?.en?.toLowerCase() || "";
        const descAr = org.description?.ar?.toLowerCase() || "";

        return (
          nameEn.includes(lowerQuery) ||
          nameAr.includes(lowerQuery) ||
          descEn.includes(lowerQuery) ||
          descAr.includes(lowerQuery)
        );
      });
    }

    // Apply tier filter
    if (tier !== "all") {
      filtered = filtered.filter((org) => org.tier === tier);
    }

    // Apply verified filter
    if (verified) {
      filtered = filtered.filter((org) => org.isVerified);
    }

    setFilteredOrganizations(filtered);
  };

  // Handle search input change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle tier filter change
  const handleTierChange = (tier: string) => {
    setSelectedTier(tier);
  };

  // Handle verified filter toggle
  const handleVerifiedToggle = (checked: boolean) => {
    setVerifiedOnly(checked);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-2xl">!</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t("common.error")}
        </h3>
        <p className="text-gray-600">{t("organizations.errorLoading")}</p>
      </div>
    );
  }

  const organizationsList = organizationsResponse || [];

  // Calculate organization statistics
  const totalOrganizations = organizationsList.length;
  const verifiedOrganizations = organizationsList.filter(
    (org) => org.isVerified
  ).length;
  const tierCounts = {
    BRONZE: organizationsList.filter((org) => org.tier === "BRONZE").length,
    SILVER: organizationsList.filter((org) => org.tier === "SILVER").length,
    GOLD: organizationsList.filter((org) => org.tier === "GOLD").length,
    PLATINUM: organizationsList.filter((org) => org.tier === "PLATINUM").length,
  };

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <OrganizationStats
        totalCount={totalOrganizations}
        verifiedCount={verifiedOrganizations}
        tierCounts={tierCounts}
      />

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrganizationSearch onSearch={handleSearch} />
          </div>
          <div className="lg:col-span-1">
            <OrganizationFilters
              onTierChange={handleTierChange}
              onVerifiedChange={handleVerifiedToggle}
              selectedTier={selectedTier}
              verifiedOnly={verifiedOnly}
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <OrganizationList
          organizations={filteredOrganizations}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
};
