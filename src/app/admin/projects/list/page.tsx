"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/api/generated/services/ProjectService";
import { ProjectResponseDto } from "@/api/generated/models/ProjectResponseDto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  Briefcase, 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Eye, 
  MoreHorizontal,
  Filter,
  DollarSign,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminProjectsList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectResponseDto | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const { t } = useLanguage();
  
  // Fetch projects with pagination and search
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ["admin", "projects", page, limit, search],
    queryFn: () => ProjectService.projectControllerListProjects(page, limit, search),
  });
  
  // Fetch project categories for filtering
  const { data: categoriesData } = useQuery({
    queryKey: ["admin", "project-categories"],
    queryFn: () => ProjectService.projectControllerGetCategories(),
  });
  
  const handleDeleteProject = async (id: number) => {
    try {
      await ProjectService.projectControllerDeleteProject(id);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error(error);
    }
  };
  
  const projects = projectsData?.data || [];
  const totalProjects = projectsData?.meta?.total || 0;
  const totalPages = projectsData?.meta?.totalPages || 0;
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t("admin.projects.listTitle")}</h1>
        <Button onClick={() => window.location.href = "/admin/projects/create"}>
          <Plus className="mr-2 h-4 w-4" /> {t("admin.ui.newProject")}
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("admin.ui.searchProjects")}
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
            <DropdownMenuLabel>{t("posts.filter")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("admin.ui.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.all")}</SelectItem>
                  <SelectItem value="active">{t("projects.status.active")}</SelectItem>
                  <SelectItem value="completed">{t("projects.status.completed")}</SelectItem>
                  <SelectItem value="pending">{t("projects.status.pending")}</SelectItem>
                  <SelectItem value="cancelled">{t("projects.status.cancelled")}</SelectItem>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("projects.category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.all")}</SelectItem>
                  {categoriesData?.map((category: any) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name?.en || category.name || "Unnamed Category"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
          <TabsTrigger value="active">{t("projects.status.active")}</TabsTrigger>
          <TabsTrigger value="pending">{t("projects.status.pending")}</TabsTrigger>
          <TabsTrigger value="completed">{t("projects.status.completed")}</TabsTrigger>
          <TabsTrigger value="cancelled">{t("projects.status.cancelled")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{t("admin.projects.allProjects")}</CardTitle>
              <CardDescription>
                {t("admin.ui.manageProjects")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.ui.title")}</TableHead>
                      <TableHead>{t("projects.category")}</TableHead>
                      <TableHead>{t("admin.ui.status")}</TableHead>
                      <TableHead>{t("admin.projects.progress")}</TableHead>
                      <TableHead>{t("admin.projects.sharia")}</TableHead>
                      <TableHead className="text-right">{t("admin.ui.actions")}</TableHead>
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
                    ) : projects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          {t("admin.ui.noProjectsFound")}
                        </TableCell>
                      </TableRow>
                    ) : (
                      projects.map((project: ProjectResponseDto) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[200px]">{project.title?.en || project.title || "Untitled Project"}</span>
                            </div>
                          </TableCell>
                          <TableCell>{project.category?.name?.en || project.category?.name || project.category || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusBadgeClass(project.status)}
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="w-full max-w-[100px]">
                              <Progress 
                                value={project.targetAmount ? (project.raisedAmount / project.targetAmount) * 100 : 0} 
                                className="h-2"
                              />
                              <div className="text-xs text-muted-foreground mt-1">
                                {project.targetAmount ? Math.round((project.raisedAmount / project.targetAmount) * 100) : 0}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {project.shariaCompliant ? (
                              <Badge className="bg-green-100 text-green-800">
                                <Shield className="h-3 w-3 mr-1" /> {t("admin.projects.compliant")}
                              </Badge>
                            ) : (
                              <Badge variant="outline">{t("projects.status.pending")}</Badge>
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
                                    setSelectedProject(project);
                                    setIsViewingDetails(true);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" /> {t("admin.organizations.viewDetails")}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => window.open(`/projects/${project.slug}`, "_blank")}
                                >
                                  <Eye className="mr-2 h-4 w-4" /> {t("admin.organizations.viewPublic")}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => window.location.href = `/admin/projects/edit/${project.id}`}
                                >
                                  <Edit className="mr-2 h-4 w-4" /> {t("admin.organizations.edit")}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteProject(project.id)}
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
                  {t("posts.showing")} {projects.length} {t("posts.of")} {totalProjects} {t("admin.projects.listTitle").toLowerCase()}
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
                  <div className="text-sm">
                    {t("posts.page")} {page} {t("posts.of")} {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    {t("posts.next")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tab contents would be similar but with filtered data */}
        <TabsContent value="active" className="mt-4">
          {/* Similar content with active projects filter */}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          {/* Similar content with pending projects filter */}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          {/* Similar content with completed projects filter */}
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-4">
          {/* Similar content with cancelled projects filter */}
        </TabsContent>
      </Tabs>
      
      {/* Project Details Dialog */}
      <Dialog open={isViewingDetails} onOpenChange={(open) => {
        if (!open) {
          setIsViewingDetails(false);
          setSelectedProject(null);
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.ui.projectDetails")}</DialogTitle>
            <DialogDescription>
              {t("admin.ui.projectDetailsDesc")}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{selectedProject.title?.en || selectedProject.title || "Untitled Project"}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.ui.status")}:</span>
                      <Badge className={getStatusBadgeClass(selectedProject.status)}>
                        {t(`projects.status.${selectedProject.status}`)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("projects.category")}:</span>
                      <span>{selectedProject.category?.name?.en || selectedProject.category?.name || selectedProject.category || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.projects.targetAmount")}:</span>
                      <span>${selectedProject.targetAmount ? selectedProject.targetAmount.toLocaleString() : '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.projects.raisedAmount")}:</span>
                      <span>${selectedProject.raisedAmount ? selectedProject.raisedAmount.toLocaleString() : '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("projects.investors")}:</span>
                      <span>{selectedProject.investorCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("admin.projects.shariaCompliant")}:</span>
                      <span>{selectedProject.shariaCompliant ? t("common.yes") : t("common.no")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{t("blog.created")}:</span>
                      <span>{new Date(selectedProject.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">{t("admin.ui.fundingProgress")}</h3>
                  <div className="space-y-4">
                    <Progress 
                      value={selectedProject.targetAmount ? (selectedProject.raisedAmount / selectedProject.targetAmount) * 100 : 0} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span>
                        ${selectedProject.raisedAmount ? selectedProject.raisedAmount.toLocaleString() : '0'} {t("projects.raised")}
                      </span>
                      <span>
                        ${selectedProject.targetAmount ? selectedProject.targetAmount.toLocaleString() : '0'} {t("projects.goal")}
                      </span>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-md font-medium mb-2">{t("admin.ui.actions")}</h4>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.location.href = `/admin/projects/edit/${selectedProject.id}`}
                        >
                          <Edit className="mr-2 h-4 w-4" /> {t("admin.routes.editProject")}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.location.href = `/admin/projects/investments/${selectedProject.id}`}
                        >
                          <DollarSign className="mr-2 h-4 w-4" /> {t("admin.projects.investments")}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.location.href = `/admin/compliance/fatwas?projectId=${selectedProject.id}`}
                        >
                          <Shield className="mr-2 h-4 w-4" /> {t("admin.projects.compliance")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">{t("admin.ui.description")}</h3>
                <p className="text-sm text-gray-700">{selectedProject.description?.en || selectedProject.description || t("admin.ui.noDescription")}</p>
              </div>
              
              {selectedProject.description?.ar && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t("admin.ui.descriptionArabic")}</h3>
                  <p className="text-sm text-gray-700" dir="rtl">{selectedProject.description.ar}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}