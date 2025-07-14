"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedBlogList } from "@/components/blog/EnhancedBlogList";
import { EnhancedBlogDashboard } from "@/components/blog/EnhancedBlogDashboard";
import { BlogHero } from "@/components/blog/BlogHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { FileText, Settings } from "lucide-react";

export default function BlogPage() {
  const { t, isRTL } = useLanguage();
  const { user } = useAuthContext();
  const [activeView, setActiveView] = useState<"public" | "dashboard">(
    "public"
  );

  // Check if user has admin privileges
  const isAdmin = user?.role === "admin" || user?.role === "editor";

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Admin/Editor can switch between public view and dashboard */}
        {isAdmin && (
          <div className="mb-8">
            <Tabs
              defaultValue="public"
              value={activeView}
              onValueChange={(value) =>
                setActiveView(value as "public" | "dashboard")
              }
              className="w-full max-w-md mx-auto"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger
                  value="public"
                  className="data-[state=active]:bg-primary-500 data-[state=active]:text-white"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {t("blog.publicView")}
                </TabsTrigger>
                <TabsTrigger
                  value="dashboard"
                  className="data-[state=active]:bg-primary-500 data-[state=active]:text-white"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {t("blog.dashboard.title")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* Content based on active view */}
        {activeView === "dashboard" && isAdmin ? (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <EnhancedBlogDashboard />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Hero Section */}
            <BlogHero />

            {/* Blog List */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {t("blog.latestArticles")}
                </h2>
                <p className="text-gray-600">{t("blog.exploreLatest")}</p>
              </motion.div>

              <EnhancedBlogList
                showFilters={true}
                showPagination={true}
                layout="feed"
                limit={10}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
