"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjects } from "@/hooks/api/useProjects";
import {
  Search,
  Calendar,
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Building,
  MapPin,
} from "lucide-react";

export const ProjectList: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: projectsResponse, isLoading } = useProjects();
  const projects = projectsResponse?.data || [];

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (funded: number, target: number) => {
    return Math.min((funded / target) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "FUNDING":
        return "bg-green-100 text-green-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      case "PENDING":
        return "bg-secondary-100 text-secondary-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover Sharia-compliant investment opportunities that create
            positive impact
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 border-gray-200 focus:border-primary"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge
                          className={`text-xs px-2 py-1 ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </Badge>
                        {project.shariaCompliant && (
                          <Badge
                            variant="outline"
                            className="text-xs border-green-200 text-green-700"
                          >
                            Sharia Compliant
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {project.title?.en || project.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {project.description?.en || project.description}
                      </p>

                      {/* Funding Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Funding Progress
                          </span>
                          <span className="text-sm text-gray-500">
                            {Math.round(
                              calculateProgress(
                                project.fundedAmount || 0,
                                project.targetAmount
                              )
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={calculateProgress(
                            project.fundedAmount || 0,
                            project.targetAmount
                          )}
                          className="h-2"
                        />
                      </div>

                      {/* Financial Info */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Funded</p>
                          <p className="font-semibold text-green-600">
                            {formatCurrency(
                              project.fundedAmount || 0,
                              project.currency
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Target</p>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(
                              project.targetAmount,
                              project.currency
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.investments?.length || 0} investors
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.fundingPeriod} days
                        </span>
                      </div>

                      <Button className="w-full bg-primary hover:bg-primary/90">
                        View Project
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {projects.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600">
                  Check back later for new investment opportunities
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
