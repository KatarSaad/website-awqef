"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface OrganizationSearchProps {
  onSearch: (query: string) => void;
}

export const OrganizationSearch: React.FC<OrganizationSearchProps> = ({
  onSearch,
}) => {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSearch} dir={isRTL ? "rtl" : "ltr"}>
      <div className="relative">
        <Search
          size={18}
          className={`absolute ${
            isRTL ? "right-3" : "left-3"
          } top-1/2 transform -translate-y-1/2 text-gray-400`}
        />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("organizations.search.placeholder") || "Search organizations..."}
          className={`pl-10 pr-10 py-6 rounded-xl border-gray-300 focus:border-primary-500 focus:ring-primary-500 ${
            isRTL ? "pr-10 pl-10" : "pl-10 pr-10"
          }`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute ${
              isRTL ? "left-3" : "right-3"
            } top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
          >
            <X size={18} />
          </button>
        )}
        <Button
          type="submit"
          className={`absolute ${
            isRTL ? "left-12" : "right-12"
          } top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-1`}
        >
          {t("common.search")}
        </Button>
      </div>
    </form>
  );
}