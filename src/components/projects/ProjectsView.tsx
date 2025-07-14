"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProjects } from "@/hooks/api/useProjects";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilters } from "./ProjectFilters";
import { 
  Search, 
  Filter, 
  Building, 
  ArrowUpRight,
  Briefcase,
  TrendingUp,
  DollarSign,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectResponseDto } from "@/api/generated";

export const ProjectsView: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<ProjectResponseDto[]>([]);
  
  const { data: projectsResponse, isLoading } = useProjects();
  const projects = projectsResponse?.data || [];

  useEffect(() => {
    if (projects.length) {
      let filtered = [...projects];
      
      if (searchTerm) {
        filtered = filtered.filter(project => 
          project.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.title?.ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description?.ar?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedCategory) {
        filtered = filtered.filter(project => 
          project.category?.id.toString() === selectedCategory
        );
      }
      
      if (selectedStatus) {
        filtered = filtered.filter(project => 
          project.status === selectedStatus
        );
      }
      
      setFilteredProjects(filtered);
    }
  }, [projects, searchTerm, selectedCategory, selectedStatus]);

  const handleViewProject = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: <Briefcase className="h-6 w-6 text-primary-600" />,
      color: "bg-primary-50"
    },
    {
      title: "Active Investments",
      value: projects.filter(p => p.status === "FUNDING").length,
      icon: <TrendingUp className="h-6 w-6 text-secondary-600" />,
      color: "bg-secondary-50"
    },
    {
      title: "Total Funded",
      value: `$${projects.reduce((sum, p) => sum + (p.fundedAmount || 0), 0).toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6 text-success-600" />,
      color: "bg-success-50"
    },
    {
      title: "Total Investors",
      value: projects.reduce((sum, p) => sum + (p.backersCount || 0), 0).toLocaleString(),
      icon: <Users className="h-6 w-6 text-info-600" />,
      color: "bg-info-50"
    }
  ];

  return (
    <div className="min-h-screen bg-background-light pt-24 pb-16" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            {t("projects.title") || "Investment Projects"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("projects.subtitle") || "Discover Sharia-compliant investment opportunities that align with your values"}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={t("projects.searchPlaceholder") || "Search projects..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-primary bg-gray-50 h-12"
                />
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-gray-200 h-12"
                onClick={() => document.getElementById('filters')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Filter className="w-4 h-4" />
                <span>{t("common.filter") || "Filter"}</span>
              </Button>
            </div>
            
            <div id="filters">
              <ProjectFilters 
                onCategoryChange={setSelectedCategory}
                onStatusChange={setSelectedStatus}
                selectedCategory={selectedCategory}
                selectedStatus={selectedStatus}
              />
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard 
                    project={project} 
                    onViewProject={handleViewProject}
                  />
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 bg-white rounded-2xl shadow-lg"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("projects.noProjects") || "No projects found"}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {searchTerm || selectedCategory || selectedStatus ? 
                    "Try adjusting your filters to see more results" : 
                    "Check back later for new investment opportunities"}
                </p>
                {(searchTerm || selectedCategory || selectedStatus) && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                      setSelectedStatus("");
                    }}
                  >
                    {t("common.clearAll") || "Clear All Filters"}
                  </Button>
                )}
              </motion.div>
            )}
          </>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Ready to Start Investing?</h3>
                <p className="text-primary-100 mb-6">
                  Join thousands of investors who are growing their wealth through Sharia-compliant investments.
                </p>
                <Button 
                  className="bg-white text-primary-700 hover:bg-gray-100 font-semibold px-6 py-3 text-lg"
                  onClick={() => router.push('/invest-now')}
                >
                  Start Investing
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="hidden lg:block">
                <div className="pattern-islamic h-full w-full opacity-20"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};