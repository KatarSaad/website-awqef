"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { InvestmentsService } from "@/api/generated/services/InvestmentsService";
import { ProjectService } from "@/api/generated/services/ProjectService";
import { InvestmentResponseDto } from "@/api/generated/models/InvestmentResponseDto";
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
  DollarSign,
  Search,
  Eye,
  MoreHorizontal,
  Filter,
  Calendar,
  User,
  Briefcase,
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

export default function AdminProjectsInvestments() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState<InvestmentResponseDto | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");

  // Fetch investments with pagination and search
  const {
    data: investmentsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin", "investments", page, limit, search, projectId, activeTab],
    queryFn: () => InvestmentsService.investmentControllerListInvestments(
      page, 
      limit, 
      search,
      projectId ? parseInt(projectId) : undefined
    ),
  });

  // Fetch projects for filtering
  const { data: projectsData } = useQuery({
    queryKey: ["admin", "projects-dropdown"],
    queryFn: () => ProjectService.projectControllerListProjects(1, 100, ""),
  });

  const handleApproveInvestment = async (id: number) => {
    try {
      await InvestmentsService.investmentControllerApproveInvestment(id);
      toast.success("Investment approved successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to approve investment");
      console.error(error);
    }
  };

  const handleRejectInvestment = async (id: number) => {
    try {
      await InvestmentsService.investmentControllerRejectInvestment(id);
      toast.success("Investment rejected successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to reject investment");
      console.error(error);
    }
  };

  const investments = investmentsData?.data || [];
  const totalInvestments = investmentsData?.meta?.total || 0;
  const totalPages = investmentsData?.meta?.totalPages || 0;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const filteredInvestments =
    activeTab === "all"
      ? investments
      : investments.filter((investment: InvestmentResponseDto) => investment.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Investments</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search investments..."
            className="pl-8 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <Select
              onValueChange={(value) => {
                if (value === "all") {
                  window.location.href = "/admin/projects/investments";
                } else {
                  window.location.href = `/admin/projects/investments?projectId=${value}`;
                }
              }}
              defaultValue={projectId || "all"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projectsData?.data?.map((project: any) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    {project.title?.en || project.title || "Untitled Project"}
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Project Investments</CardTitle>
              <CardDescription>
                Manage investments made in projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investor</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
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
                    ) : filteredInvestments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No investments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredInvestments.map((investment: InvestmentResponseDto) => (
                        <TableRow key={investment.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{investment.investor?.name || "Anonymous"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[150px]">
                                {investment.project?.title?.en || investment.project?.title || "Unknown Project"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span>${investment.amount.toLocaleString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusBadgeClass(investment.status)}
                            >
                              {investment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {investment.createdAt
                                  ? new Date(investment.createdAt).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </div>
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
                                    setSelectedInvestment(investment);
                                    setIsViewingDetails(true);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" /> View Details
                                </DropdownMenuItem>
                                {investment.status === "pending" && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => handleApproveInvestment(investment.id)}
                                    >
                                      <Badge className="bg-green-100 text-green-800 mr-2">
                                        Approve
                                      </Badge>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleRejectInvestment(investment.id)}
                                    >
                                      <Badge className="bg-red-100 text-red-800 mr-2">
                                        Reject
                                      </Badge>
                                    </DropdownMenuItem>
                                  </>
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
                  Showing {filteredInvestments.length} of {totalInvestments} investments
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <div className="text-sm">
                    Page {page} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Investment Details Dialog */}
      <Dialog
        open={isViewingDetails}
        onOpenChange={(open) => {
          if (!open) {
            setIsViewingDetails(false);
            setSelectedInvestment(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Investment Details</DialogTitle>
            <DialogDescription>
              Detailed information about the investment.
            </DialogDescription>
          </DialogHeader>

          {selectedInvestment && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Investor Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Name:</span>
                      <span>{selectedInvestment.investor?.name || "Anonymous"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Email:</span>
                      <span>{selectedInvestment.investor?.email || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Phone:</span>
                      <span>{selectedInvestment.investor?.phone || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Amount:</span>
                      <span>${selectedInvestment.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className={getStatusBadgeClass(selectedInvestment.status)}>
                        {selectedInvestment.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Date:</span>
                      <span>
                        {selectedInvestment.createdAt
                          ? new Date(selectedInvestment.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    {selectedInvestment.approvedAt && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Approved Date:</span>
                        <span>
                          {new Date(selectedInvestment.approvedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Project Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Project:</span>
                    <span>
                      {selectedInvestment.project?.title?.en || 
                       selectedInvestment.project?.title || 
                       "Unknown Project"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Project Status:</span>
                    <span>{selectedInvestment.project?.status || "N/A"}</span>
                  </div>
                </div>
              </div>

              {selectedInvestment.notes && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Notes</h3>
                  <p className="text-sm text-gray-700">{selectedInvestment.notes}</p>
                </div>
              )}

              {selectedInvestment.status === "pending" && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleRejectInvestment(selectedInvestment.id)}
                    className="bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    Reject Investment
                  </Button>
                  <Button
                    onClick={() => handleApproveInvestment(selectedInvestment.id)}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Approve Investment
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