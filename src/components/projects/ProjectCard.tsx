"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProjectResponseDto } from "@/api/generated";
import {
  Calendar,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Building,
  Shield,
  Clock,
  ArrowUpRight
} from "lucide-react";

interface ProjectCardProps {
  project: ProjectResponseDto;
  onViewProject?: (projectId: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewProject,
}) => {
  const { t, language, isRTL } = useLanguage();

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || Object.values(field)[0] || "";
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (funded: number, target: number) => {
    return Math.min((funded / target) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "FUNDING":
        return "bg-green-100 text-green-800 border-green-200";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "PENDING":
        return "bg-secondary-100 text-secondary-800 border-secondary-200";
      case "APPROVED":
        return "bg-success-100 text-success-800 border-success-200";
      case "REJECTED":
        return "bg-error-100 text-error-800 border-error-200";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Generate random related image URL if none is provided
  const getRandomProjectImage = () => {
    const categories = {
      "1": "realestate",
      "2": "technology",
      "3": "healthcare",
      "4": "education",
      "5": "energy",
      "6": "finance"
    };
    
    const categoryName = project.category?.id ? categories[project.category.id] || "business" : "business";
    const randomNum = Math.floor(Math.random() * 10) + 1;
    return `https://source.unsplash.com/800x600/?${categoryName},investment,${randomNum}`;
  };
  
  const featuredImage = (project as any).featuredImage || getRandomProjectImage();

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group card-hover">
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={featuredImage}
          alt={getTranslatedText(project.title)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between">
          <Badge className={`${getStatusColor(project.status || "")}`}>
            {project.status}
          </Badge>
          {project.fatwa && (
            <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Sharia</span>
            </Badge>
          )}
        </div>
        {project.featured && (
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-y-4 -translate-x-4 rotate-45 bg-secondary-500 text-white py-1 px-10 text-xs font-bold">
              Featured
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {getTranslatedText(project.title)}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {getTranslatedText(project.description)}
        </p>

        {/* Funding Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {t("projects.fundingProgress") || "Funding Progress"}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(
                calculateProgress(
                  project.fundedAmount || 0,
                  project.targetAmount
                )
              )}
              %
            </span>
          </div>
          <Progress
            value={calculateProgress(
              project.fundedAmount || 0,
              project.targetAmount
            )}
            className="h-2"
          />
        </div>

        {/* Financial Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-primary-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">{t("projects.raised") || "Raised"}</p>
            <p className="font-semibold text-primary-700 text-sm">
              {formatCurrency(project.fundedAmount || 0, project.currency || "USD")}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">{t("projects.goal") || "Goal"}</p>
            <p className="font-semibold text-gray-900 text-sm">
              {formatCurrency(project.targetAmount, project.currency || "USD")}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {project.backersCount || 0} {t("projects.backers") || "backers"}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            30 days left
          </span>
        </div>

        {/* Action Button */}
        <Button
          className="w-full bg-primary hover:bg-primary-700 group text-white"
          onClick={() => onViewProject?.(project.id)}
        >
          <span>{t("projects.learnMore") || "Learn More"}</span>
          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Button>
      </CardContent>
    </Card>
  );
};