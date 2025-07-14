"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WebsiteOrganizationsService } from "@/api/generated/services/WebsiteOrganizationsService";
import { WebsiteOrganizationResponseDto } from "@/api/generated/models/WebsiteOrganizationResponseDto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building,
  Plus,
  Search,
  Edit,
  Trash,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Users,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminOrganizationsList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedOrg, setSelectedOrg] =
    useState<WebsiteOrganizationResponseDto | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const { t } = useLanguage();

  // Fetch organizations with pagination and search
  const { data: orgsData, isLoading } = useQuery({
    queryKey: ["admin", "organizations", page, limit, search],
    queryFn: () =>
      WebsiteOrganizationsService.websiteOrganizationControllerListWebsiteOrganizations(),
  });

  // Helper function to get translated text from TranslationDto
  const getTranslatedText = (field: any, lang: string = "en") => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object") {
      // Handle TranslationDto properly
      if (field.en !== undefined && field.ar !== undefined) {
        return field[lang] || "";
      }
      return field[lang] || field[Object.keys(field)[0]] || "";
    }
    return "";
  };

  const handleDeleteOrganization = async (id: number) => {
    try {
      await WebsiteOrganizationsService.websiteOrganizationControllerDeleteWebsiteOrganization(
        id
      );
      toast.success("Organization deleted successfully");
    } catch (error) {
      toast.error("Failed to delete organization");
      console.error(error);
    }
  };

  const organizations = orgsData || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t("admin.organizations.listTitle")}</h1>
        <Button
          onClick={() => (window.location.href = "/admin/organizations/create")}
        >
          <Plus className="mr-2 h-4 w-4" /> {t("admin.ui.newOrganization")}
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("admin.ui.searchOrganizations")}
            className="pl-8 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t("admin.ui.allOrganizations")}</CardTitle>
          <CardDescription>
            {t("admin.ui.manageOrganizations")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("organizations.title")}</TableHead>
                  <TableHead>{t("organizations.email")}</TableHead>
                  <TableHead>{t("organizations.projects")}</TableHead>
                  <TableHead>{t("organizations.members")}</TableHead>
                  <TableHead>{t("organizations.verified")}</TableHead>
                  <TableHead className="text-right">{t("common.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : organizations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      {t("admin.ui.noOrganizationsFound")}
                    </TableCell>
                  </TableRow>
                ) : (
                  organizations.map((org: WebsiteOrganizationResponseDto) => (
                    <TableRow key={org.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={org.logo || "/placeholder.svg"}
                              alt={getTranslatedText(org.name)}
                            />
                            <AvatarFallback>
                              {getTranslatedText(org.name).charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {getTranslatedText(org.name)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {org.tier || "BRONZE"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>-</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>-</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {org.isVerified ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" /> {t("admin.organizations.verified")}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-yellow-600">
                            <XCircle className="h-3 w-3 mr-1" /> {t("admin.organizations.unverified")}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrg(org);
                                setIsViewingDetails(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" /> {t("admin.organizations.viewDetails")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(
                                  `/organizations/${org.id}`,
                                  "_blank"
                                )
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" /> {t("admin.organizations.viewPublic")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                (window.location.href = `/admin/organizations/edit/${org.id}`)
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" /> {t("admin.organizations.edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                (window.location.href = `/admin/organizations/members/${org.id}`)
                              }
                            >
                              <Users className="mr-2 h-4 w-4" /> {t("admin.organizations.manageMembers")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteOrganization(org.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" /> {t("admin.organizations.delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              {t("posts.showing")} {organizations.length} {t("organizations.title").toLowerCase()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                {t("posts.previous")}
              </Button>
              <div className="text-sm">{t("posts.page")} {page}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(organizations.length / limit)}
              >
                {t("posts.next")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organization Details Dialog */}
      <Dialog
        open={isViewingDetails}
        onOpenChange={(open) => {
          if (!open) {
            setIsViewingDetails(false);
            setSelectedOrg(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.organizations.organizationDetails")}</DialogTitle>
            <DialogDescription>
              {t("admin.organizations.detailedInfo")}
            </DialogDescription>
          </DialogHeader>

          {selectedOrg && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedOrg.logo || "/placeholder.svg"}
                    alt={getTranslatedText(selectedOrg.name)}
                  />
                  <AvatarFallback>
                    {getTranslatedText(selectedOrg.name).charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    {t("admin.organizations.details")}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.organizations.verified")}:</span>
                      <span>{selectedOrg.isVerified ? t("common.yes") : t("common.no")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("blog.created")}:</span>
                      <span>
                        {new Date(selectedOrg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("projects.lastUpdated")}:</span>
                      <span>
                        {new Date(selectedOrg.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  {t("admin.ui.description")}
                </h4>
                <p className="text-sm">
                  {getTranslatedText(selectedOrg.description) ||
                    t("admin.ui.noDescription")}
                </p>
              </div>

              {getTranslatedText(selectedOrg.description, "ar") && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    {t("admin.ui.descriptionArabic")}
                  </h4>
                  <p className="text-sm" dir="rtl">
                    {getTranslatedText(selectedOrg.description, "ar")}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = `/admin/organizations/edit/${selectedOrg.id}`)
                  }
                >
                  <Edit className="mr-2 h-4 w-4" /> {t("admin.routes.editOrganization")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = `/admin/organizations/members/${selectedOrg.id}`)
                  }
                >
                  <Users className="mr-2 h-4 w-4" /> {t("admin.routes.manageMembers")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = `/admin/projects/list?organizationId=${selectedOrg.id}`)
                  }
                >
                  <Briefcase className="mr-2 h-4 w-4" /> {t("admin.routes.viewProjects")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
