"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Target,
  CheckCircle,
  Share2,
  Heart,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFullProject } from "@/hooks/api/useProjects";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProjectSteps } from "./ProjectSteps";
import { ProjectInvestments } from "./ProjectInvestments";
import { Loader2 } from "lucide-react";

interface ProjectDetailProps {
  projectId: number;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const { t, language, isRTL } = useLanguage();
  const { data: projectResponse, isLoading, error } = useFullProject(projectId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{t("common.loading")}</span>
      </div>
    );
  }

  if (error || !projectResponse?.data) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">{t("common.error")}</p>
      </div>
    );
  }

  const project = projectResponse.data;

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || Object.values(field)[0] || "";
  };

  const progressPercentage =
    project.targetAmount > 0
      ? Math.min(
          ((project.fundedAmount || 0) / project.targetAmount) * 100,
          100
        )
      : 0;

  // Patch for missing fields/types in ProjectResponseDto
  // Remove after OpenAPI/codegen update
  const getFatwaScholarName = (fatwa: any) => {
    if (!fatwa) return "";
    if (fatwa.scholarName) return getTranslatedText(fatwa.scholarName);
    if (fatwa.scholarNameId) return getTranslatedText(fatwa.scholarNameId);
    return "";
  };
  const getFatwaStatus = (fatwa: any) => fatwa?.status || "";
  const getFatwaIssuedAt = (fatwa: any) =>
    fatwa?.issuedAt ? new Date(fatwa.issuedAt).toLocaleDateString() : "-";
  const getFatwaDocumentUrl = (fatwa: any) => fatwa?.documentUrl || "";

  const updatedAt =
    (project as any).updatedAt || (project as any).createdAt || "";
  const featuredImage = (project as any).featuredImage || undefined;
  const investments = (project as any).investments || [];

  return (
    <div className="max-w-7xl mx-auto space-y-8" dir={isRTL ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                {getTranslatedText(project.category?.name) ||
                  t("projects.defaultCategory")}
              </span>
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
                {project.status}
              </span>
              {project.featured && (
                <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm">
                  {t("projects.featured")}
                </span>
              )}
              {project.fatwa && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <CheckCircle size={12} />
                  <span>{t("projects.halalCertified")}</span>
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-primary-900">
              {getTranslatedText(project.title)}
            </h1>

            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>{getTranslatedText(project.organization?.name)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>
                  {t("projects.lastUpdated")}:{" "}
                  {updatedAt ? new Date(updatedAt).toLocaleDateString() : "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {featuredImage && (
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src={featuredImage}
                alt={getTranslatedText(project.title)}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-primary-900">
              {t("projects.description")}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  getTranslatedText(project.description) ||
                  t("projects.defaultDescription"),
              }}
            />
          </div>

          {/* Project Steps */}
          {project.steps && project.steps.length > 0 && (
            <ProjectSteps steps={project.steps} />
          )}

          {/* Investments */}
          <ProjectInvestments
            projectId={project.id}
            investments={investments}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Funding Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-primary-900 mb-4">
              {t("projects.fundingProgress")}
            </h3>

            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-gray-500">{t("projects.funded")}</div>
              </div>

              <Progress value={progressPercentage} className="h-3" />

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-primary-900">
                    {project.currency}{" "}
                    {(project.fundedAmount || 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("projects.raised")}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-700">
                    {project.currency} {project.targetAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("projects.goal")}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-primary-900">
                    {project.backersCount || 0}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("projects.backers")}
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary-900">
                    {project.investments?.length || 0}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t("projects.investments")}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                {t("projects.investNow")}
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Heart size={16} className="mr-2" />
                  {t("projects.favorite")}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 size={16} className="mr-2" />
                  {t("projects.share")}
                </Button>
              </div>
            </div>
          </div>

          {/* Organization Info */}
          {project.organization && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-4">
                {t("projects.organization")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  {project.organization.logo && (
                    <img
                      src={project.organization.logo}
                      alt={getTranslatedText(project.organization.name)}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-primary-900">
                      {getTranslatedText(project.organization.name)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getTranslatedText(project.organization.description)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fatwa Information */}
          {project.fatwa && (
            <div className="bg-green-50 rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center space-x-2">
                <CheckCircle size={24} />
                <span>{t("projects.shariahCompliance")}</span>
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">{t("projects.scholar")}:</span>
                  <span className="ml-2">
                    {getFatwaScholarName(project.fatwa)}
                  </span>
                </div>
                <div>
                  <span className="font-medium">{t("projects.status")}:</span>
                  <span className="ml-2 text-green-600">
                    {getFatwaStatus(project.fatwa)}
                  </span>
                </div>
                <div>
                  <span className="font-medium">{t("projects.issuedAt")}:</span>
                  <span className="ml-2">
                    {getFatwaIssuedAt(project.fatwa)}
                  </span>
                </div>
              </div>
              {getFatwaDocumentUrl(project.fatwa) && (
                <Button
                  variant="outline"
                  className="w-full mt-4 text-green-700 border-green-300"
                  onClick={() =>
                    window.open(getFatwaDocumentUrl(project.fatwa), "_blank")
                  }
                >
                  {t("projects.viewFatwa")}
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
