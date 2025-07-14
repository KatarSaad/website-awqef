"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  X, 
  Check,
  TrendingUp,
  Clock,
  Star,
  DollarSign,
  Building,
  Shield
} from "lucide-react";

interface ProjectFiltersProps {
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  selectedCategory: string;
  selectedStatus: string;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  onCategoryChange,
  onStatusChange,
  selectedCategory,
  selectedStatus
}) => {
  const { t, isRTL } = useLanguage();
  
  const categories = [
    { id: "", name: t("projects.categories.all") || "All Categories" },
    { id: "1", name: t("projects.categories.realestate") || "Real Estate" },
    { id: "2", name: t("projects.categories.technology") || "Technology" },
    { id: "3", name: t("projects.categories.healthcare") || "Healthcare" },
    { id: "4", name: t("projects.categories.education") || "Education" },
    { id: "5", name: t("projects.categories.energy") || "Energy" },
    { id: "6", name: t("projects.categories.finance") || "Finance" },
  ];

  const statuses = [
    { id: "", name: "All Statuses" },
    { id: "FUNDING", name: "Funding" },
    { id: "COMPLETED", name: "Completed" },
    { id: "PENDING", name: "Pending" },
    { id: "APPROVED", name: "Approved" },
  ];

  const sortOptions = [
    { id: "newest", name: t("projects.filters.newest") || "Newest", icon: Clock },
    { id: "popular", name: t("projects.filters.popular") || "Popular", icon: Star },
    { id: "trending", name: t("projects.filters.trending") || "Trending", icon: TrendingUp },
    { id: "endingSoon", name: t("projects.filters.endingSoon") || "Ending Soon", icon: Clock },
    { id: "fullyFunded", name: t("projects.filters.fullyFunded") || "Fully Funded", icon: DollarSign },
  ];

  const features = [
    { id: "shariaCompliant", name: "Sharia Compliant", icon: Shield },
    { id: "featured", name: "Featured", icon: Star },
  ];

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Building className="h-4 w-4 text-primary-600" />
          {t("projects.category") || "Category"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-primary-600 hover:bg-primary-700"
                  : "hover:bg-primary-50"
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary-600" />
          {t("projects.projectStatus") || "Status"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Badge
              key={status.id}
              variant={selectedStatus === status.id ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedStatus === status.id
                  ? "bg-primary-600 hover:bg-primary-700"
                  : "hover:bg-primary-50"
              }`}
              onClick={() => onStatusChange(status.id)}
            >
              {status.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          {t("common.sort") || "Sort By"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-200"
            >
              <option.icon className="h-3 w-3" />
              <span>{option.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          {t("common.features") || "Features"}
        </h3>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <Button
              key={feature.id}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-200"
            >
              <feature.icon className="h-3 w-3" />
              <span>{feature.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategory || selectedStatus) && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-primary-600"
            onClick={() => {
              onCategoryChange("");
              onStatusChange("");
            }}
          >
            <X className="h-4 w-4 mr-2" />
            {t("common.clearAll") || "Clear All Filters"}
          </Button>
        </div>
      )}
    </div>
  );
};