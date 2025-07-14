"use client";
import React, { useState } from "react";

// Helper function to get translated text
function getTranslation(field: any, lang: string = "en") {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    return field[lang] || field[Object.keys(field)[0]] || "";
  }
  return "";
}
import { useQuery } from "@tanstack/react-query";
import { FatwasService as FatwaService } from "@/api/generated/services/FatwasService";
import { FatwaResponseDto } from "@/api/generated/models/FatwaResponseDto";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Plus,
  Search,
  Edit,
  Trash,
  Eye,
  MoreHorizontal,
  Filter,
  Calendar,
  FileText,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminComplianceFatwas() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedFatwa, setSelectedFatwa] = useState<FatwaResponseDto | null>(
    null
  );
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { t } = useLanguage();

  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  // Fetch fatwas with pagination and search
  const {
    data: fatwasData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin", "fatwas", page, limit, search, projectId],
    queryFn: () => FatwaService.fatwaControllerListFatwas(),
  });

  // Fetch scholars for filtering and fatwa creation/editing

  const handleDeleteFatwa = async (id: number) => {
    try {
      await FatwaService.fatwaControllerDeleteFatwa(id);
      toast.success("Fatwa deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete fatwa");
      console.error(error);
    }
  };

  const fatwas = fatwasData || [];

  const getStatusBadgeClass = (status: any) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "expired":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    }
  };

  const filteredFatwas =
    activeTab === "all"
      ? fatwas
      : fatwas.filter((fatwa) => fatwa.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("admin.ui.shariaComplianceFatwas")}
        </h1>
        <Button
          onClick={() =>
            (window.location.href = "/admin/compliance/fatwas/create")
          }
        >
          <Plus className="mr-2 h-4 w-4" /> {t("admin.ui.newFatwa")}
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("admin.ui.searchFatwas")}
            className="pl-8 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> {t("common.filter")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("fatwas.scholar")} />
                </SelectTrigger>
              </Select>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("blog.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.ui.allStatuses")}</SelectItem>
                  <SelectItem value="approved">{t("admin.ui.approved")}</SelectItem>
                  <SelectItem value="pending">{t("admin.ui.pending")}</SelectItem>
                  <SelectItem value="rejected">{t("admin.ui.rejected")}</SelectItem>
                  <SelectItem value="expired">{t("admin.ui.expired")}</SelectItem>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
          <TabsTrigger value="approved">{t("admin.ui.approved")}</TabsTrigger>
          <TabsTrigger value="pending">{t("admin.ui.pending")}</TabsTrigger>
          <TabsTrigger value="rejected">{t("admin.ui.rejected")}</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{t("admin.ui.shariaComplianceFatwas")}</CardTitle>
              <CardDescription>
                {t("admin.ui.manageFatwas")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.ui.title")}</TableHead>
                      <TableHead>{t("admin.ui.scholar")}</TableHead>
                      <TableHead>{t("admin.ui.project")}</TableHead>
                      <TableHead>{t("admin.ui.status")}</TableHead>
                      <TableHead>{t("admin.ui.issueDate")}</TableHead>
                      <TableHead>{t("admin.ui.expiryDate")}</TableHead>
                      <TableHead className="text-right">{t("admin.ui.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredFatwas.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          {t("admin.ui.noFatwasFound")}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredFatwas.map((fatwa: FatwaResponseDto) => (
                        <TableRow key={fatwa.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[200px]">
                                {getTranslation(fatwa.summary, "en") ||
                                  t("admin.ui.untitledFatwa")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {getTranslation(fatwa.scholarName, "en") ||
                                  t("admin.ui.unknownScholar")}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusBadgeClass(fatwa.status)}
                            >
                              {t(`fatwas.status.${fatwa.status}`)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {fatwa.issuedAt
                                  ? new Date(
                                      fatwa.issuedAt
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {fatwa.expiresAt
                              ? new Date(fatwa.expiresAt).toLocaleDateString()
                              : "N/A"}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">{t("admin.ui.actions")}</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedFatwa(fatwa);
                                    setIsViewingDetails(true);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" /> {t("admin.ui.viewDetails")}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    (window.location.href = `/admin/compliance/fatwas/edit/${fatwa.id}`)
                                  }
                                >
                                  <Edit className="mr-2 h-4 w-4" /> {t("common.edit")}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteFatwa(fatwa.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" /> {t("common.delete")}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fatwa Details Dialog */}
      <Dialog
        open={isViewingDetails}
        onOpenChange={(open) => {
          if (!open) {
            setIsViewingDetails(false);
            setSelectedFatwa(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.ui.fatwaDetails")}</DialogTitle>
            <DialogDescription>
              {t("admin.ui.fatwaDetailsDesc")}
            </DialogDescription>
          </DialogHeader>

          {selectedFatwa && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {getTranslation(selectedFatwa.summary, "en") ||
                      t("admin.ui.untitledFatwa")}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.ui.status")}:</span>
                      <Badge
                        className={getStatusBadgeClass(selectedFatwa.status)}
                      >
                        {t(`fatwas.status.${selectedFatwa.status}`)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.ui.scholar")}:</span>
                      <span>
                        {getTranslation(selectedFatwa.scholarName, "en") ||
                          t("admin.ui.unknownScholar")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.ui.project")}:</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.ui.issueDate")}:</span>
                      <span>
                        {selectedFatwa.issuedAt
                          ? new Date(
                              selectedFatwa.issuedAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.ui.expiryDate")}:</span>
                      <span>
                        {selectedFatwa.expiresAt
                          ? new Date(
                              selectedFatwa.expiresAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.ui.created")}:</span>
                      <span>
                        {selectedFatwa.createdAt
                          ? new Date(
                              selectedFatwa.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {t("admin.ui.documentInfo")}
                  </h3>
                  <div className="space-y-4">
                    {selectedFatwa.documentUrl && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            Fatwa Document
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              window.open(selectedFatwa.documentUrl, "_blank")
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" /> View Document
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Download logic would go here
                              toast.info("Download started");
                            }}
                          >
                            <FileText className="mr-2 h-4 w-4" /> Download
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <h4 className="text-md font-medium mb-2">Actions</h4>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            (window.location.href = `/admin/compliance/fatwas/edit/${selectedFatwa.id}`)
                          }
                        >
                          <Edit className="mr-2 h-4 w-4" /> Edit Fatwa
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Summary</h3>
                <p className="text-sm text-gray-700">
                  {getTranslation(selectedFatwa.summary, "en") ||
                    "No summary available."}
                </p>
              </div>

              {getTranslation(selectedFatwa.summary, "ar") && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Summary (Arabic)
                  </h3>
                  <p className="text-sm text-gray-700" dir="rtl">
                    {getTranslation(selectedFatwa.summary, "ar")}
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-2">Content</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
