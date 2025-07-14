"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useOrganization } from "@/hooks/api/useOrganizations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  CheckCircle,
  Calendar,
  Award,
  MapPin,
  ArrowLeft,
  Loader2,
  Globe,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrganizationPage({
  params,
}: {
  params: { id: string };
}) {
  const { t, language, isRTL } = useLanguage();
  const router = useRouter();
  const organizationId = parseInt(params.id);

  const {
    data: organizationResponse,
    isLoading,
    error,
  } = useOrganization(organizationId);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light pt-24 pb-16 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !organizationResponse) {
    return (
      <div className="min-h-screen bg-background-light pt-24 pb-16 flex justify-center items-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {t("common.error")}
          </h3>
          <p className="text-gray-600 mb-6">
            {t("organizations.errorLoading")}
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/organizations")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back")}
          </Button>
        </div>
      </div>
    );
  }

  const organization = organizationResponse;

  // Mock data for the organization details
  const mockContacts = {
    email:
      "contact@" +
      getTranslatedText(organization.name).toLowerCase().replace(/\s/g, "") +
      ".com",
    phone: "+971 4 123 4567",
    website:
      "www." +
      getTranslatedText(organization.name).toLowerCase().replace(/\s/g, "") +
      ".com",
    address: "Saudi Arabia, Riyadh, King Fahd Road",
  };

  // Mock projects data
  const mockProjects = [
    {
      id: 1,
      name: "Sustainable Housing Development",
      status: "ACTIVE",
      category: "Real Estate",
    },
    {
      id: 2,
      name: "Tech Innovation Fund",
      status: "FUNDING",
      category: "Technology",
    },
    {
      id: 3,
      name: "Healthcare Initiative",
      status: "COMPLETED",
      category: "Healthcare",
    },
  ];

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
            onClick={() => router.push("/organizations")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back")}
          </Button>
        </motion.div>

        {/* Organization Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              {organization.logo ? (
                <img
                  src={organization.logo}
                  alt={getTranslatedText(organization.name)}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  <Building className="text-primary-600" size={48} />
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-2">
                {getTranslatedText(organization.name)}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className={getTierColor(organization.tier)}>
                  <Award className="h-3 w-3 mr-1" />
                  {organization.tier}
                </Badge>
                {organization.isVerified && (
                  <Badge className="bg-green-100 text-green-800 border-green-300 flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    {t("organizations.verified")}
                  </Badge>
                )}
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                  <Calendar size={12} className="mr-1" />
                  {t("organizations.established")}:{" "}
                  {new Date(organization.createdAt).getFullYear()}
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                  <MapPin size={12} className="mr-1" />
                  {mockContacts.address}
                </Badge>
              </div>
              <p className="text-gray-600">
                {getTranslatedText(organization.description) ||
                  t("organizations.noDescription")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabs Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs
            defaultValue="projects"
            className="bg-white rounded-2xl shadow-lg"
          >
            <TabsList className="w-full border-b p-0 rounded-t-2xl">
              <TabsTrigger
                value="projects"
                className="flex-1 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
              >
                {t("organizations.tabs.projects")}
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="flex-1 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
              >
                {t("organizations.tabs.about")}
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="flex-1 py-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary-600"
              >
                {t("organizations.tabs.contact")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("organizations.projects")}
                </h3>

                {mockProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {project.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                            {project.category}
                          </Badge>
                          <Badge
                            className={
                              project.status === "ACTIVE"
                                ? "bg-green-100 text-green-800 border-green-300"
                                : project.status === "FUNDING"
                                ? "bg-secondary-100 text-secondary-800 border-secondary-300"
                                : "bg-gray-100 text-gray-800 border-gray-300"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {t("organizations.viewProject")}
                      </Button>
                    </div>
                  </div>
                ))}

                {mockProjects.length === 0 && (
                  <div className="text-center py-8">
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">
                      {t("organizations.noProjects")}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="about" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("organizations.about")}
                  </h3>
                  <p className="text-gray-600">
                    {getTranslatedText(organization.description) ||
                      t("organizations.noDescription")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("organizations.details")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="text-sm text-gray-500">
                          {t("organizations.established")}
                        </p>
                        <p>
                          {new Date(
                            organization.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="text-sm text-gray-500">
                          {t("organizations.tier")}
                        </p>
                        <p>{organization.tier}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="text-sm text-gray-500">
                          {t("organizations.location")}
                        </p>
                        <p>{mockContacts.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("organizations.contactInfo")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("organizations.email")}
                      </p>
                      <p className="font-medium">{mockContacts.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("organizations.phone")}
                      </p>
                      <p className="font-medium">{mockContacts.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Globe className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("organizations.website")}
                      </p>
                      <p className="font-medium">{mockContacts.website}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("organizations.address")}
                      </p>
                      <p className="font-medium">{mockContacts.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
