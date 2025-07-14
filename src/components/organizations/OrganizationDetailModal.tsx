"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { WebsiteOrganizationResponseDto } from "@/api/generated/models/WebsiteOrganizationResponseDto";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  CheckCircle,
  Calendar,
  Award,
  MapPin,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Briefcase,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrganizationDetailModalProps {
  organization: WebsiteOrganizationResponseDto;
  isOpen: boolean;
  onClose: () => void;
}

export const OrganizationDetailModal: React.FC<OrganizationDetailModalProps> = ({
  organization,
  isOpen,
  onClose,
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

  // Mock data for the organization details
  const mockProjects = [
    { id: 1, name: "Sustainable Housing Development", status: "ACTIVE", category: "Real Estate" },
    { id: 2, name: "Tech Innovation Fund", status: "FUNDING", category: "Technology" },
    { id: 3, name: "Healthcare Initiative", status: "COMPLETED", category: "Healthcare" },
  ];

  const mockContacts = {
    email: "contact@" + getTranslatedText(organization.name).toLowerCase().replace(/\s/g, "") + ".com",
    phone: "+971 4 123 4567",
    website: "www." + getTranslatedText(organization.name).toLowerCase().replace(/\s/g, "") + ".com",
    address: "Dubai, United Arab Emirates",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir={isRTL ? "rtl" : "ltr"}>
        <DialogHeader>
          <div className="flex items-center gap-4">
            {organization.logo ? (
              <img
                src={organization.logo}
                alt={getTranslatedText(organization.name)}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Building className="text-primary-600" size={32} />
              </div>
            )}
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {getTranslatedText(organization.name)}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getTierColor(organization.tier)}>
                  <Award className="h-3 w-3 mr-1" />
                  {organization.tier}
                </Badge>
                {organization.isVerified && (
                  <Badge className="bg-green-100 text-green-800 border-green-300 flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    {t("organizations.verified") || "Verified"}
                  </Badge>
                )}
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                  <Calendar size={12} className="mr-1" />
                  {new Date(organization.createdAt).getFullYear()}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="about" className="mt-6">
          <TabsList className="w-full">
            <TabsTrigger value="about" className="flex-1">
              {t("organizations.tabs.about") || "About"}
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex-1">
              {t("organizations.tabs.projects") || "Projects"}
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex-1">
              {t("organizations.tabs.contact") || "Contact"}
            </TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="mt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("organizations.about") || "About"}
                </h3>
                <p className="text-gray-600">
                  {getTranslatedText(organization.description) ||
                    t("organizations.noDescription") || "No description available"}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("organizations.details") || "Details"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("organizations.established") || "Established"}
                      </p>
                      <p>{new Date(organization.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("organizations.tier") || "Tier"}
                      </p>
                      <p>{organization.tier}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("organizations.location") || "Location"}
                      </p>
                      <p>{mockContacts.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("organizations.projectCount") || "Projects"}
                      </p>
                      <p>{mockProjects.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("organizations.projects") || "Projects"}
              </h3>
              
              {mockProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
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
                      {t("organizations.viewProject") || "View Project"}
                    </Button>
                  </div>
                </div>
              ))}

              {mockProjects.length === 0 && (
                <div className="text-center py-8">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">{t("organizations.noProjects") || "No projects available"}</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="mt-4">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("organizations.contactInfo") || "Contact Information"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("organizations.email") || "Email"}</p>
                    <p className="font-medium">{mockContacts.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("organizations.phone") || "Phone"}</p>
                    <p className="font-medium">{mockContacts.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("organizations.website") || "Website"}</p>
                    <p className="font-medium">{mockContacts.website}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t("organizations.address") || "Address"}</p>
                    <p className="font-medium">{mockContacts.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="mr-2"
          >
            {t("common.close") || "Close"}
          </Button>
          <Button className="bg-primary-600 hover:bg-primary-700">
            {t("organizations.viewProjects") || "View Projects"}
            <ExternalLink size={16} className="ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}