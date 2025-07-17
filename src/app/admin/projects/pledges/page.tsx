"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PledgesService } from "@/api/generated/services/PledgesService";
import { ProjectService } from "@/api/generated/services/ProjectService";
import { PledgeResponseDto } from "@/api/generated/models/PledgeResponseDto";
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
  Award,
  Search,
  Eye,
  MoreHorizontal,
  Filter,
  Calendar,
  User,
  Briefcase,
  DollarSign,
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
import { useAuthContext } from "@/contexts/AuthContext";

export default function AdminProjectsPledges() {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedPledge, setSelectedPledge] =
    useState<PledgeResponseDto | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  const { initialized, isAuthenticated } = useAuthContext();

  // Fetch pledges with pagination and search
  const {
    data: pledgesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin", "pledges", page, limit, search, projectId, activeTab],
    queryFn: () =>
      PledgesService.pledgeControllerListPledges(
        page,
        limit,
        search,
        projectId ? parseInt(projectId) : undefined
      ),
    enabled: initialized && isAuthenticated,
  });

  // Fetch projects for filtering
  const { data: projectsData } = useQuery({
    queryKey: ["admin", "projects-dropdown"],
    queryFn: () => ProjectService.projectControllerListProjects(1, 100, ""),
    enabled: initialized && isAuthenticated,
  });

  const handleApprovePledge = async (id: number) => {
    try {
      await PledgesService.pledgeControllerApprovePledge(id);
      toast.success("Pledge approved successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to approve pledge");
      console.error(error);
    }
  };

  const handleRejectPledge = async (id: number) => {
    try {
      await PledgesService.pledgeControllerRejectPledge(id);
      toast.success("Pledge rejected successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to reject pledge");
      console.error(error);
    }
  };

  const pledges = pledgesData?.data || [];
  const totalPledges = pledgesData?.meta?.total || 0;
  const totalPages = pledgesData?.meta?.totalPages || 0;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "fulfilled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const filteredPledges =
    activeTab === "all"
      ? pledges
      : pledges.filter(
          (pledge: PledgeResponseDto) => pledge.status === activeTab
        );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("admin.projects.pledges")}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("admin.projects.searchPledges")}
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
            <Select
              onValueChange={(value) => {
                if (value === "all") {
                  window.location.href = "/admin/projects/pledges";
                } else {
                  window.location.href = `/admin/projects/pledges?projectId=${value}`;
                }
              }}
              defaultValue={projectId || "all"}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={t("admin.projects.filterByProject")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t("admin.projects.allProjects")}
                </SelectItem>
                {projectsData?.data?.map((project: any) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.title?.en ||
                      project.title ||
                      t("admin.projects.untitledProject")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
          <TabsTrigger value="pending">
            {t("admin.projects.pending")}
          </TabsTrigger>
          <TabsTrigger value="approved">
            {t("admin.projects.approved")}
          </TabsTrigger>
          <TabsTrigger value="fulfilled">
            {t("admin.projects.fulfilled")}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            {t("admin.projects.rejected")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{t("admin.projects.projectPledges")}</CardTitle>
              <CardDescription>
                {t("admin.projects.managePledges")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.projects.pledger")}</TableHead>
                      <TableHead>{t("admin.projects.project")}</TableHead>
                      <TableHead>{t("admin.projects.amount")}</TableHead>
                      <TableHead>{t("admin.projects.status")}</TableHead>
                      <TableHead>{t("admin.projects.date")}</TableHead>
                      <TableHead className="text-right">
                        {t("admin.projects.actions")}
                      </TableHead>
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
                    ) : filteredPledges.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          {t("admin.projects.noPledgesFound")}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPledges.map((pledge: PledgeResponseDto) => (
                        <TableRow key={pledge.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{pledge.pledger?.name || "Anonymous"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[150px]">
                                {pledge.project?.title?.en ||
                                  pledge.project?.title ||
                                  "Unknown Project"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span>${pledge.amount.toLocaleString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusBadgeClass(pledge.status)}
                            >
                              {t(`admin.projects.status.${pledge.status}`)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {pledge.createdAt
                                  ? new Date(
                                      pledge.createdAt
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">
                                    {t("common.actions")}
                                  </span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPledge(pledge);
                                    setIsViewingDetails(true);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />{" "}
                                  {t("common.viewDetails")}
                                </DropdownMenuItem>
                                {pledge.status === "pending" && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleApprovePledge(pledge.id)
                                      }
                                    >
                                      <Badge className="bg-green-100 text-green-800 mr-2">
                                        {t("admin.projects.approve")}
                                      </Badge>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleRejectPledge(pledge.id)
                                      }
                                    >
                                      <Badge className="bg-red-100 text-red-800 mr-2">
                                        {t("admin.projects.reject")}
                                      </Badge>
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {pledge.status === "approved" && (
                                  <DropdownMenuItem
                                    onClick={() => {
                                      // Mark as fulfilled logic would go here
                                      toast.info(
                                        "This would mark the pledge as fulfilled"
                                      );
                                    }}
                                  >
                                    <Badge className="bg-blue-100 text-blue-800 mr-2">
                                      {t("admin.projects.markFulfilled")}
                                    </Badge>
                                  </DropdownMenuItem>
                                )}
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
                  {t("admin.projects.showing", {
                    count: filteredPledges.length,
                    total: totalPledges,
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    {t("common.previous")}
                  </Button>
                  <div className="text-sm">
                    {t("admin.projects.page", {
                      page: page,
                      totalPages: totalPages,
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    {t("common.next")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pledge Details Dialog */}
      <Dialog
        open={isViewingDetails}
        onOpenChange={(open) => {
          if (!open) {
            setIsViewingDetails(false);
            setSelectedPledge(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.projects.pledgeDetails")}</DialogTitle>
            <DialogDescription>
              {t("admin.projects.pledgeDetailsDescription")}
            </DialogDescription>
          </DialogHeader>

          {selectedPledge && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {t("admin.projects.pledgerInformation")}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {t("admin.projects.name")}:
                      </span>
                      <span>{selectedPledge.pledger?.name || "Anonymous"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {t("admin.projects.email")}:
                      </span>
                      <span>{selectedPledge.pledger?.email || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {t("admin.projects.phone")}:
                      </span>
                      <span>{selectedPledge.pledger?.phone || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {t("admin.projects.pledgeDetails")}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {t("admin.projects.amount")}:
                      </span>
                      <span>${selectedPledge.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {t("admin.projects.status")}:
                      </span>
                      <Badge
                        className={getStatusBadgeClass(selectedPledge.status)}
                      >
                        {selectedPledge.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {t("admin.projects.date")}:
                      </span>
                      <span>
                        {selectedPledge.createdAt
                          ? new Date(
                              selectedPledge.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    {selectedPledge.approvedAt && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {t("admin.projects.approvedDate")}:
                        </span>
                        <span>
                          {new Date(
                            selectedPledge.approvedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {selectedPledge.fulfilledAt && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {t("admin.projects.fulfilledDate")}:
                        </span>
                        <span>
                          {new Date(
                            selectedPledge.fulfilledAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("admin.projects.projectInformation")}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      {t("admin.projects.project")}:
                    </span>
                    <span>
                      {selectedPledge.project?.title?.en ||
                        selectedPledge.project?.title ||
                        "Unknown Project"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      {t("admin.projects.projectStatus")}:
                    </span>
                    <span>{selectedPledge.project?.status || "N/A"}</span>
                  </div>
                </div>
              </div>

              {selectedPledge.notes && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t("admin.projects.notes")}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {selectedPledge.notes}
                  </p>
                </div>
              )}

              {selectedPledge.status === "pending" && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleRejectPledge(selectedPledge.id)}
                    className="bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    {t("admin.projects.rejectPledge")}
                  </Button>
                  <Button
                    onClick={() => handleApprovePledge(selectedPledge.id)}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    {t("admin.projects.approvePledge")}
                  </Button>
                </div>
              )}

              {selectedPledge.status === "approved" && (
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => {
                      // Mark as fulfilled logic would go here
                      toast.info("This would mark the pledge as fulfilled");
                    }}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {t("admin.projects.markAsFulfilled")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
