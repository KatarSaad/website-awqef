"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { WebsiteOrganizationResponseDto } from "@/api/generated/models/WebsiteOrganizationResponseDto";
import { CheckCircle, Filter } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface OrganizationFiltersProps {
  onTierChange: (tier: string) => void;
  onVerifiedChange: (checked: boolean) => void;
  selectedTier: string;
  verifiedOnly: boolean;
}

export const OrganizationFilters: React.FC<OrganizationFiltersProps> = ({
  onTierChange,
  onVerifiedChange,
  selectedTier,
  verifiedOnly,
}) => {
  const { t, isRTL } = useLanguage();

  const tiers = [
    { value: "all", label: t("organizations.filters.allTiers") || "All Tiers" },
    { value: "PLATINUM", label: t("organizations.filters.platinum") || "Platinum" },
    { value: "GOLD", label: t("organizations.filters.gold") || "Gold" },
    { value: "SILVER", label: t("organizations.filters.silver") || "Silver" },
    { value: "BRONZE", label: t("organizations.filters.bronze") || "Bronze" },
  ];

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center gap-2 mb-4">
        <Filter size={18} className="text-primary-600" />
        <h3 className="font-semibold text-gray-900">
          {t("organizations.filters.title") || "Filters"}
        </h3>
      </div>

      {/* Tier Filter */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">
          {t("organizations.filters.tierLabel") || "Organization Tier"}
        </h4>
        <RadioGroup
          value={selectedTier}
          onValueChange={onTierChange}
          className="flex flex-col space-y-2"
        >
          {tiers.map((tier) => (
            <div key={tier.value} className="flex items-center space-x-2">
              <RadioGroupItem value={tier.value} id={`tier-${tier.value}`} />
              <Label htmlFor={`tier-${tier.value}`} className="cursor-pointer">
                {tier.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Verified Filter */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <Label htmlFor="verified-filter" className="cursor-pointer">
              {t("organizations.filters.verifiedOnly") || "Verified Only"}
            </Label>
          </div>
          <Switch
            id="verified-filter"
            checked={verifiedOnly}
            onCheckedChange={onVerifiedChange}
          />
        </div>
      </div>
    </div>
  );
}