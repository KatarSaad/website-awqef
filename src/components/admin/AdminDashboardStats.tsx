"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ContentService } from "@/api/generated/services/ContentService";
import { ProjectService } from "@/api/generated/services/ProjectService";
import { WebsiteOrganizationsService } from "@/api/generated/services/WebsiteOrganizationsService";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  FileText, 
  Briefcase, 
  Building, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  DollarSign, 
  Award 
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

const StatCard = ({ title, value, icon, change, trend }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              {change && (
                <p className={`text-xs font-medium ${
                  trend === "up" ? "text-green-500" : 
                  trend === "down" ? "text-red-500" : 
                  "text-gray-500"
                }`}>
                  {change}
                </p>
              )}
            </div>
          </div>
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function AdminDashboardStats() {
  const { t } = useLanguage();
  const { data: contentStats } = useQuery({
    queryKey: ["admin", "stats", "content"],
    queryFn: () => ContentService.contentControllerGetStats(),
  });
  
  const { data: projectStats } = useQuery({
    queryKey: ["admin", "stats", "projects"],
    queryFn: () => ProjectService.projectControllerGetStats(),
  });
  
  const { data: orgStats } = useQuery({
    queryKey: ["admin", "stats", "organizations"],
    queryFn: () => WebsiteOrganizationsService.websiteOrganizationsControllerGetStats(),
  });
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title={t("admin.stats.totalPosts")}
        value={contentStats?.totalPosts || 0}
        icon={<FileText className="h-5 w-5" />}
        change={t("admin.stats.change", { value: "+12%" })}
        trend="up"
      />
      
      <StatCard
        title={t("admin.stats.totalProjects")}
        value={projectStats?.totalProjects || 0}
        icon={<Briefcase className="h-5 w-5" />}
        change={t("admin.stats.change", { value: "+5%" })}
        trend="up"
      />
      
      <StatCard
        title={t("admin.stats.organizations")}
        value={orgStats?.totalOrganizations || 0}
        icon={<Building className="h-5 w-5" />}
        change={t("admin.stats.noChange")}
        trend="neutral"
      />
      
      <StatCard
        title={t("admin.stats.totalComments")}
        value={contentStats?.totalComments || 0}
        icon={<MessageSquare className="h-5 w-5" />}
        change={t("admin.stats.change", { value: "+18%" })}
        trend="up"
      />
      
      <StatCard
        title={t("admin.stats.activeInvestments")}
        value={projectStats?.activeInvestments || 0}
        icon={<TrendingUp className="h-5 w-5" />}
        change={t("admin.stats.change", { value: "+8%" })}
        trend="up"
      />
      
      <StatCard
        title={t("admin.stats.totalPledged")}
        value={`$${(projectStats?.totalPledged || 0).toLocaleString()}`}
        icon={<DollarSign className="h-5 w-5" />}
        change={t("admin.stats.change", { value: "+15%" })}
        trend="up"
      />
      
      <StatCard
        title={t("admin.stats.activeUsers")}
        value={contentStats?.activeUsers || 0}
        icon={<Users className="h-5 w-5" />}
        change={t("admin.stats.change", { value: "+7%" })}
        trend="up"
      />
      
      <StatCard
        title={t("admin.stats.certifications")}
        value={projectStats?.totalCertifications || 0}
        icon={<Award className="h-5 w-5" />}
        change={t("admin.stats.change", { value: "+3%" })}
        trend="up"
      />
    </div>
  );
}