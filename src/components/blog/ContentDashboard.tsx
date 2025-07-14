"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePosts } from "@/hooks/api/useContent";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FileText,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Edit,
  Trash2,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

export const ContentDashboard = () => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: postsResult, isLoading } = usePosts();
  const posts = postsResult?.data || [];

  // Calculate dashboard stats
  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter((p) => p.status === "published").length,
    draftPosts: posts.filter((p) => p.status === "draft").length,
    totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
    totalLikes: posts.reduce((sum, p) => sum + (p.likes || 0), 0),
    totalComments: posts.reduce((sum, p) => sum + (p.comments || 0), 0),
    totalShares: posts.reduce((sum, p) => sum + (p.shares || 0), 0),
  };

  const recentPosts = posts
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 10);

  const topPerformingPosts = posts
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    color = "blue",
  }: {
    title: string;
    value: number | string;
    icon: any;
    trend?: number;
    color?: string;
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <p
                className={`text-xs flex items-center mt-1 ${
                  trend > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                <TrendingUp size={12} className="mr-1" />
                {trend > 0 ? "+" : ""}
                {trend}%
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full bg-${color}-100`}>
            <Icon size={24} className={`text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PostRow = ({ post }: { post: any }) => (
    <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50">
      <div className="flex-1">
        <h3 className="font-medium line-clamp-1">
          {isRTL ? post.title?.ar : post.title?.en}
        </h3>
        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
          <Badge
            variant={post.status === "published" ? "default" : "secondary"}
          >
            {t(`blog.${post.status || "draft"}`)}
          </Badge>
          <span>
            {new Date(post.createdAt || Date.now()).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-2">
            <Eye size={14} />
            <span>{post.views || 0}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart size={14} />
            <span>{post.likes || 0}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Edit size={16} />
        </Button>
        <Button variant="ghost" size="sm">
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">
            {t("blog.dashboard.title")}
          </h1>
          <p className="text-gray-600 mt-1">{t("blog.subtitle")}</p>
        </div>
        <Button>
          <Plus size={20} className="mr-2" />
          {t("blog.createPost")}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            {t("compliance.tabs.overview")}
          </TabsTrigger>
          <TabsTrigger value="posts">{t("content.posts")}</TabsTrigger>
          <TabsTrigger value="analytics">
            {t("blog.analytics.title")}
          </TabsTrigger>
          <TabsTrigger value="settings">{t("common.settings")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title={t("blog.totalPosts")}
              value={stats.totalPosts}
              icon={FileText}
              trend={12}
              color="blue"
            />
            <StatCard
              title={t("blog.analytics.views")}
              value={stats.totalViews.toLocaleString()}
              icon={Eye}
              trend={8}
              color="green"
            />
            <StatCard
              title={t("blog.analytics.likes")}
              value={stats.totalLikes}
              icon={Heart}
              trend={-3}
              color="red"
            />
            <StatCard
              title={t("blog.analytics.comments")}
              value={stats.totalComments}
              icon={MessageCircle}
              trend={15}
              color="purple"
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("blog.filters.recent")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentPosts.slice(0, 5).map((post) => (
                    <PostRow key={post.id} post={post} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("blog.filters.popular")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topPerformingPosts.map((post) => (
                    <PostRow key={post.id} post={post} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Input
                  placeholder={t("blog.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">
                  <Filter size={16} className="mr-2" />
                  {t("common.filter")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle>{t("blog.allPosts")}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {posts.map((post) => (
                  <PostRow key={post.id} post={post} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 size={20} />
                  <span>{t("blog.analytics.engagement")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{t("blog.analytics.views")}</span>
                    <span className="font-bold">
                      {stats.totalViews.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t("blog.analytics.likes")}</span>
                    <span className="font-bold">{stats.totalLikes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t("blog.analytics.comments")}</span>
                    <span className="font-bold">{stats.totalComments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t("blog.analytics.shares")}</span>
                    <span className="font-bold">{stats.totalShares}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>{t("content.user")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>{t("blog.analytics.title")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>{t("common.settings")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Settings configuration will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
