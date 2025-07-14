"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { ContentService } from "@/api/generated/services/ContentService";
import { ProjectService } from "@/api/generated/services/ProjectService";
import { WebsiteOrganizationsService } from "@/api/generated/services/WebsiteOrganizationsService";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { AdminDashboardStats } from "@/components/admin/AdminDashboardStats";

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { data: postsStats } = useQuery({
    queryKey: ["admin", "stats", "posts"],
    queryFn: () => ContentService.contentControllerGetStats(),
  });

  const { data: projectsStats } = useQuery({
    queryKey: ["admin", "stats", "projects"],
    queryFn: () => ProjectService.projectControllerGetStats(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t("admin.dashboard")}</h1>
      </div>
      
      <AdminDashboardStats />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t("compliance.tabs.overview")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("blog.analytics.title")}</TabsTrigger>
          <TabsTrigger value="reports">{t("common.report")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("admin.stats.totalPosts")}</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{postsStats?.totalPosts || 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{postsStats?.postsThisMonth || 0} {t("blog.thisMonth")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("admin.stats.totalProjects")}</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projectsStats?.totalProjects || 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{projectsStats?.projectsThisMonth || 0} {t("blog.thisMonth")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("admin.stats.activeInvestments")}</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projectsStats?.activeInvestments || 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{projectsStats?.investmentsThisMonth || 0} {t("blog.thisMonth")}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("admin.stats.organizations")}</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projectsStats?.totalOrganizations || 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{projectsStats?.organizationsThisMonth || 0} {t("blog.thisMonth")}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("content.overview")}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {/* Content chart would go here */}
                <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
                  {t("blog.analytics.title")}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("admin.recentActivity")}</CardTitle>
                <CardDescription>
                  {t("admin.latestActions")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Activity list would go here */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {t("admin.newPostPublished")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("blog.analytics.title")}</CardTitle>
              <CardDescription>
                {t("admin.detailedAnalytics")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {/* Analytics content would go here */}
              <div className="h-[400px] bg-muted/20 rounded-md flex items-center justify-center">
                {t("admin.advancedAnalytics")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("common.report")}</CardTitle>
              <CardDescription>
                {t("admin.generateReports")}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              {/* Reports content would go here */}
              <div className="h-[400px] bg-muted/20 rounded-md flex items-center justify-center">
                {t("admin.reportsDashboard")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}