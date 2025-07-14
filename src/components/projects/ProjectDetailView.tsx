"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFullProject } from "@/hooks/api/useProjects";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectSteps } from "./ProjectSteps";
import { ProjectInvestments } from "./ProjectInvestments";
import { ProjectCertifications } from "./ProjectCertifications";
import { ProjectFatwa } from "./ProjectFatwa";
import {
  Calendar,
  MapPin,
  Users,
  Target,
  CheckCircle,
  Share2,
  Heart,
  ArrowLeft,
  Building,
  Shield,
  Clock,
  TrendingUp,
  DollarSign,
  FileText,
  Briefcase,
  Award,
} from "lucide-react";
import { Loader2 } from "lucide-react";

interface ProjectDetailViewProps {
  projectId: number;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  projectId,
}) => {
  const { t, language, isRTL } = useLanguage();
  const router = useRouter();
  const {
    data: projectResponse,
    isLoading,
    error,
  } = useFullProject(Number(projectId));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light pt-24 pb-16 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">{t("common.loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (error || !projectResponse) {
    return (
      <div className="min-h-screen bg-background-light pt-24 pb-16 flex justify-center items-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t("common.error") || "Error loading project"}
          </h3>
          <p className="text-gray-600 mb-6">
            The project could not be loaded. Please try again later.
          </p>
          <Button variant="outline" onClick={() => router.push("/projects")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const project = projectResponse.data || projectResponse;

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

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

  // Patch for missing fields/types in ProjectResponseDto
  const getFatwaScholarName = (fatwa: any) => {
    if (!fatwa) return "";
    if (fatwa.scholarName) return getTranslatedText(fatwa.scholarName);
    if (fatwa.scholarNameId) return getTranslatedText(fatwa.scholarNameId);
    return "";
  };

  const updatedAt = project.updatedAt || project.createdAt || "";
  const featuredImage =
    (project as any).featuredImage || "/placeholder-project.jpg";
  const investments = project.investments || [];
  const certifications = project.certifications || [];

  return (
    <div
      className="min-h-screen bg-background-light pt-24 pb-16"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            className="flex items-center text-gray-600 hover:text-primary-600"
            onClick={() => router.push("/projects")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back") || "Back to Projects"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={`${getStatusColor(project.status || "")}`}>
                  {project.status}
                </Badge>
                <Badge className="bg-primary-100 text-primary-800 border-primary-200">
                  {getTranslatedText(project.category?.name) ||
                    t("projects.defaultCategory")}
                </Badge>
                {project.featured && (
                  <Badge className="bg-secondary-100 text-secondary-800 border-secondary-200">
                    {t("projects.featured") || "Featured"}
                  </Badge>
                )}
                {project.fatwa && (
                  <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>
                      {t("projects.shariaApproved") || "Sharia Approved"}
                    </span>
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-primary-900">
                {getTranslatedText(project.title)}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                {project.organization && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary-600" />
                    <span>{getTranslatedText(project.organization.name)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary-600" />
                  <span>
                    {t("projects.lastUpdated") || "Last Updated"}:{" "}
                    {updatedAt ? new Date(updatedAt).toLocaleDateString() : "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={featuredImage}
                alt={getTranslatedText(project.title)}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tabs */}
            <Tabs
              defaultValue="overview"
              className="bg-white rounded-2xl shadow-lg"
            >
              <TabsList className="w-full border-b p-0 rounded-t-2xl">
                <TabsTrigger
                  value="overview"
                  className="flex-1 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="investments"
                  className="flex-1 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
                >
                  Investments
                </TabsTrigger>
                <TabsTrigger
                  value="compliance"
                  className="flex-1 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
                >
                  Compliance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-6 focus:outline-none">
                {/* Description */}
                <div className="prose prose-lg max-w-none mb-8">
                  <h2 className="text-2xl font-bold text-primary-900 mb-4">
                    {t("projects.description") || "Description"}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        getTranslatedText(project.description) ||
                        t("projects.defaultDescription") ||
                        "Project description...",
                    }}
                  />
                </div>

                {/* Project Steps */}
                {project.steps && project.steps.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary-900 mb-4">
                      {t("projects.timeline") || "Project Timeline"}
                    </h2>
                    <ProjectSteps steps={project.steps} />
                  </div>
                )}

                {/* Organization Info */}
                {project.organization && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary-900 mb-4">
                      {t("projects.organization") || "Organization"}
                    </h2>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <div className="flex items-center gap-4">
                        {project.organization.logo && (
                          <img
                            src={project.organization.logo}
                            alt={getTranslatedText(project.organization.name)}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-primary-900">
                            {getTranslatedText(project.organization.name)}
                          </h3>
                          <p className="text-gray-600">
                            {getTranslatedText(
                              project.organization.description
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent
                value="investments"
                className="p-6 focus:outline-none"
              >
                <h2 className="text-2xl font-bold text-primary-900 mb-4">
                  {t("projects.investments") || "Investments"}
                </h2>
                <ProjectInvestments
                  projectId={project.id}
                  investments={investments}
                />
              </TabsContent>

              <TabsContent
                value="compliance"
                className="p-6 focus:outline-none"
              >
                <h2 className="text-2xl font-bold text-primary-900 mb-4">
                  {t("projects.shariaCompliance") || "Sharia Compliance"}
                </h2>

                <div className="space-y-8">
                  {/* Fatwa Information */}
                  {project.fatwa ? (
                    <ProjectFatwa fatwa={project.fatwa} />
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center">
                      <Shield className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">
                        {t("projects.noFatwa") ||
                          "No Sharia fatwa available for this project"}
                      </p>
                    </div>
                  )}

                  {/* Certifications */}
                  <div>
                    <h3 className="text-xl font-bold text-primary-900 mb-4">
                      {t("projects.certifications") || "Certifications"}
                    </h3>
                    {certifications.length > 0 ? (
                      <ProjectCertifications certifications={certifications} />
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center">
                        <Award className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">
                          {t("projects.noCertifications") ||
                            "No certifications available for this project"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary-600" />
                <span>
                  {t("projects.fundingProgress") || "Funding Progress"}
                </span>
              </h3>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600">
                    {Math.round(progressPercentage)}%
                  </div>
                  <div className="text-gray-500">
                    {t("projects.funded") || "Funded"}
                  </div>
                </div>

                <Progress value={progressPercentage} className="h-3" />

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-primary-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-primary-900">
                      {formatCurrency(
                        project.fundedAmount || 0,
                        project.currency || "USD"
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {t("projects.raised") || "Raised"}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xl font-bold text-gray-700">
                      {formatCurrency(
                        project.targetAmount,
                        project.currency || "USD"
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {t("projects.goal") || "Goal"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-secondary-50 rounded-xl p-3">
                    <div className="text-lg font-bold text-secondary-900">
                      {project.backersCount || 0}
                    </div>
                    <div className="text-sm text-gray-500">
                      {t("projects.backers") || "Backers"}
                    </div>
                  </div>
                  <div className="bg-secondary-50 rounded-xl p-3">
                    <div className="text-lg font-bold text-secondary-900">
                      {investments.length || 0}
                    </div>
                    <div className="text-sm text-gray-500">
                      {t("projects.investments") || "Investments"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-6 text-lg">
                  {t("projects.investNow") || "Invest Now"}
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    {t("projects.favorite") || "Favorite"}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    {t("projects.share") || "Share"}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Key Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary-600" />
                <span>{t("projects.highlights") || "Key Highlights"}</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge className={`${getStatusColor(project.status || "")}`}>
                    {project.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">
                    {getTranslatedText(project.category?.name) || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Minimum Investment</span>
                  <span className="font-medium">
                    {formatCurrency(1000, project.currency || "USD")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Expected Return</span>
                  <span className="font-medium text-success-600">12-15%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">24 months</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Risk Level</span>
                  <Badge
                    variant="outline"
                    className="bg-success-50 text-success-700 border-success-200"
                  >
                    Low
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Sharia Compliant</span>
                  <span className="font-medium text-success-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Yes
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Related Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary-600" />
                <span>Similar Projects</span>
              </h3>

              <div className="space-y-4">
                <p className="text-gray-600 text-center py-4">
                  Similar projects will be shown here
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
