"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePosts } from "@/hooks/api/useContent";
import { EnhancedBlogCard } from "./EnhancedBlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  ArrowRight,
  LayoutGrid,
  List,
  Badge,
} from "lucide-react";
import Link from "next/link";

interface EnhancedBlogListProps {
  showFilters?: boolean;
  featured?: boolean;
  limit?: number;
  categoryId?: number;
  showPagination?: boolean;
  layout?: "grid" | "list" | "feed";
}

export const EnhancedBlogList: React.FC<EnhancedBlogListProps> = ({
  showFilters = true,
  featured = false,
  limit = 6,
  categoryId,
  showPagination = true,
  layout: initialLayout = "feed",
}) => {
  const { t, isRTL, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryId?.toString() || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("recent");
  const [layout, setLayout] = useState<"grid" | "list" | "feed">(initialLayout);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Helper function to get translated text
  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || Object.values(field)[0] || "";
  };

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, activeTab]);

  const {
    data: postsData,
    isLoading,
    error,
  } = usePosts(currentPage, limit, debouncedSearch);

  // Sort posts based on active tab
  const sortedPosts = React.useMemo(() => {
    if (!postsData?.data) return [];

    let posts = [...postsData.data];

    if (featured) {
      posts = posts.filter((post) => post.isFeatured);
    }

    switch (activeTab) {
      case "trending":
        return posts.sort((a, b) => (b.views || 0) - (a.views || 0));
      case "popular":
        return posts.sort(
          (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
        );
      case "featured":
        return posts.filter((post) => post.isFeatured);
      default: // recent
        return posts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [postsData?.data, activeTab, featured]);

  const totalPages = Math.ceil((postsData?.total || 0) / limit);

  return (
    <div className="w-full" dir={isRTL ? "rtl" : "ltr"}>
      {/* Filters Section */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t("blog.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-200"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-[180px] bg-white border-gray-200">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-gray-400" />
                  <SelectValue placeholder={t("blog.selectCategory")} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">{t("blog.categories.all")}</SelectItem>
                {/* Map through categories here */}
                <SelectItem value="1">
                  {t("blog.categories.islamicFinance")}
                </SelectItem>
                <SelectItem value="2">
                  {t("blog.categories.successStories")}
                </SelectItem>
                <SelectItem value="3">
                  {t("blog.categories.marketAnalysis")}
                </SelectItem>
                <SelectItem value="4">
                  {t("blog.categories.compliance")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Tabs
              defaultValue="recent"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="recent"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {t("blog.filters.recent")}
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Star className="h-4 w-4 mr-2" />
                  {t("blog.filters.popular")}
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {t("blog.filters.trending")}
                </TabsTrigger>
                <TabsTrigger
                  value="featured"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t("blog.filters.featured")}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <Button
                variant={layout === "feed" ? "default" : "outline"}
                size="sm"
                onClick={() => setLayout("feed" as any)}
                className="flex items-center gap-1"
              >
                <MessageCircle className="h-4 w-4" />
                Feed
              </Button>
              <Button
                variant={layout === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setLayout("grid" as any)}
                className="flex items-center gap-1"
              >
                <LayoutGrid className="h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={layout === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setLayout("list" as any)}
                className="flex items-center gap-1"
              >
                <List className="h-4 w-4" />
                List
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div
          className={`grid grid-cols-1 ${
            layout === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : ""
          } gap-8`}
        >
          {Array(limit)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between pt-4">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-2">{t("common.error")}</p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            {t("common.tryAgain")}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && sortedPosts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2">{t("blog.noPosts")}</p>
          {debouncedSearch && (
            <Button
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="mt-2"
            >
              {t("common.clearAll")}
            </Button>
          )}
        </div>
      )}

      {/* Posts Grid/List/Feed */}
      {!isLoading && !error && sortedPosts.length > 0 && (
        <>
          {/* Featured Post (if available and not in featured mode) */}
          {!featured &&
            activeTab !== "featured" &&
            sortedPosts.some((post) => post.isFeatured) && (
              <div className="mb-8">
                <EnhancedBlogCard
                  post={
                    sortedPosts.find((post) => post.isFeatured) ||
                    sortedPosts[0]
                  }
                  variant="featured"
                />
              </div>
            )}

          {/* Feed Layout */}
          {layout === "feed" && (
            <div className="space-y-6">
              {sortedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="p-6">
                    {/* Author and Date */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                          {post.author?.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt={post.author.first_name || "Author"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-primary-600 font-semibold">
                              {post.author?.first_name?.[0] || "A"}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {post.author
                              ? `${post.author.first_name || ""} ${
                                  post.author.family_name || ""
                                }`.trim() || post.author.email
                              : "Anonymous"}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {post.category && (
                        <Badge
                          variant="outline"
                          className="text-primary-600 border-primary-200"
                        >
                          {getTranslatedText(post.category.name)}
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {getTranslatedText(post.title)}
                      </h3>
                      <p className="text-gray-600">
                        {getTranslatedText(post.excerpt)}
                      </p>
                    </div>

                    {/* Featured Image */}
                    {post.featuredImage && (
                      <div className="rounded-lg overflow-hidden mb-4 max-h-96">
                        <img
                          src={post.featuredImage}
                          alt={getTranslatedText(post.title)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600">
                          <Heart className="h-5 w-5" />
                          <span>{post.ratings?.length || 0}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600">
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments?.length || 0}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600">
                          <Share2 className="h-5 w-5" />
                          <span>Share</span>
                        </button>
                      </div>

                      <Link href={`/blog/${post.slug || post.id}`} passHref>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary-600 hover:text-primary-800 hover:bg-primary-50"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Grid/List Layout */}
          {layout !== "feed" && (
            <div
              className={`grid grid-cols-1 ${
                layout === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : ""
              } gap-8`}
            >
              {sortedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <EnhancedBlogCard
                    post={post}
                    variant={layout === "list" ? "horizontal" : "default"}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {showPagination &&
            (layout === "feed" ? (
              // Infinite scroll style pagination for feed layout
              <div className="mt-8 text-center">
                <Button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage >= totalPages || isLoading}
                  variant="outline"
                  className="w-full max-w-md py-6"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span>Loading more posts...</span>
                    </div>
                  ) : currentPage >= totalPages ? (
                    "No more posts to load"
                  ) : (
                    "Load more posts"
                  )}
                </Button>
              </div>
            ) : (
              // Traditional pagination for grid/list layouts
              totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Logic to show pagination numbers around current page
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={i}
                          variant={
                            currentPage === pageNum ? "default" : "ghost"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`h-8 w-8 p-0 ${
                            currentPage === pageNum
                              ? "bg-primary-500 text-white"
                              : ""
                          }`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            ))}
        </>
      )}
    </div>
  );
};
