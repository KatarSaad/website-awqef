"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePosts } from "@/hooks/api/useContent";
import {
  Plus,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Share2,
  BarChart3,
  Calendar,
  TrendingUp,
  Edit,
  MoreHorizontal,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { PostEditor } from "./PostEditor";
import { PostsList } from "./PostsList";
import { PostsInterface } from "./PostsInterface";

export const PostsDashboard: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeView, setActiveView] = useState<"dashboard" | "interface">(
    "dashboard"
  );

  const { data: postsData, isLoading } = usePosts(currentPage, 10, searchTerm);

  const stats = [
    {
      title: "Total Posts",
      value: postsData?.total || 0,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
    },
    {
      title: "Published",
      value: postsData?.data?.filter((p: any) => p.publishedAt)?.length || 0,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8%",
    },
    {
      title: "Drafts",
      value: postsData?.data?.filter((p: any) => !p.publishedAt)?.length || 0,
      icon: Edit,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+5%",
    },
    {
      title: "Scheduled",
      value: 0,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+3%",
    },
  ];

  if (showEditor) {
    return (
      <PostEditor
        post={selectedPost}
        onClose={() => {
          setShowEditor(false);
          setSelectedPost(null);
        }}
      />
    );
  }

  if (activeView === "interface") {
    return <PostsInterface onBack={() => setActiveView("dashboard")} />;
  }

  return (
    <div
      className="min-h-screen bg-background-default"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Posts Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your content and track performance
            </p>
          </div>
          <Button
            onClick={() => setShowEditor(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Post
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    View Analytics
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Track performance metrics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center group-hover:bg-success/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Manage Comments
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Review and moderate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center group-hover:bg-info/20 transition-colors">
                  <Clock className="w-6 h-6 text-info" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Schedule Posts
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Plan content calendar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-4 bg-muted">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-background"
              >
                All Posts
              </TabsTrigger>
              <TabsTrigger
                value="published"
                className="data-[state=active]:bg-background"
              >
                Published
              </TabsTrigger>
              <TabsTrigger
                value="drafts"
                className="data-[state=active]:bg-background"
              >
                Drafts
              </TabsTrigger>
              <TabsTrigger
                value="scheduled"
                className="data-[state=active]:bg-background"
              >
                Scheduled
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64 border-border focus:border-primary bg-background"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-muted"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <PostsList
              posts={postsData?.data || []}
              isLoading={isLoading}
              onEdit={(post) => {
                setSelectedPost(post);
                setShowEditor(true);
              }}
            />
          </TabsContent>

          <TabsContent value="published" className="mt-0">
            <PostsList
              posts={postsData?.data?.filter((p: any) => p.publishedAt) || []}
              isLoading={isLoading}
              onEdit={(post) => {
                setSelectedPost(post);
                setShowEditor(true);
              }}
            />
          </TabsContent>

          <TabsContent value="drafts" className="mt-0">
            <PostsList
              posts={postsData?.data?.filter((p: any) => !p.publishedAt) || []}
              isLoading={isLoading}
              onEdit={(post) => {
                setSelectedPost(post);
                setShowEditor(true);
              }}
            />
          </TabsContent>

          <TabsContent value="scheduled" className="mt-0">
            <PostsList
              posts={[]}
              isLoading={false}
              onEdit={(post) => {
                setSelectedPost(post);
                setShowEditor(true);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
