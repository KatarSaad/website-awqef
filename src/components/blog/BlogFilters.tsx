
"use client";

import React from "react";
import { Search, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  searchTerm,
  onSearchChange,
}) => {
  const { t, isRTL } = useLanguage();

  const postTypes = [
    { value: "all", label: t("common.all") },
    { value: "BLOG", label: t("blog.types.blog") },
    { value: "NEWS", label: t("blog.types.news") },
    { value: "EVENT", label: t("blog.types.event") },
    { value: "PAGE", label: t("blog.types.page") },
  ];

  const categories = [
    { value: "all", label: t("blog.categories.all") },
    { value: "islamicFinance", label: t("blog.categories.islamicFinance") },
    { value: "successStories", label: t("blog.categories.successStories") },
    { value: "marketAnalysis", label: t("blog.categories.marketAnalysis") },
    { value: "compliance", label: t("blog.categories.compliance") },
    { value: "investment", label: t("blog.categories.investment") },
    { value: "funding", label: t("blog.categories.funding") },
    { value: "entrepreneurship", label: t("blog.categories.entrepreneurship") },
  ];

  return (
    <div className="space-y-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder={t("blog.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 border-gray-200 focus:border-primary-300 focus:ring-primary-200"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 items-center">
          <Filter size={20} className="text-gray-500" />
          
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t("blog.selectType")} />
            </SelectTrigger>
            <SelectContent>
              {postTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t("blog.selectCategory")} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              onCategoryChange("all");
              onTypeChange("all");
              onSearchChange("");
            }}
            className="whitespace-nowrap"
          >
            {t("common.clearAll")}
          </Button>
        </div>
      </div>
    </div>
  );
};
