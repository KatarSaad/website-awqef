"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePosts } from "@/hooks/api/useContent";
import {
  Search,
  Calendar,
  User,
  ArrowLeft,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  BookOpen,
} from "lucide-react";
import { BlogDetail } from "@/components/blog/BlogDetail";

interface PostsInterfaceProps {
  onBack: () => void;
  onReadMore?: (slug: string) => void;
}

export const PostsInterface: React.FC<PostsInterfaceProps> = ({
  onBack,
  onReadMore,
}) => {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const { data: postsData, isLoading } = usePosts(currentPage, 12, searchTerm);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateContent = (content: any, maxLength: number = 150) => {
    if (typeof content !== "string") content = String(content ?? "");
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field.en) return field.en;
    return Object.values(field)[0] || "";
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="border-border hover:bg-muted focus-ring"
              aria-label={t("nav.home")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("nav.home")}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground font-poppins font-arabic">
                {t("blog.latestStories") || "Latest Stories"}
              </h1>
              <p className="text-muted-foreground">
                {t("blog.subtitle") ||
                  "Discover insights and stories from the world of Islamic finance"}
              </p>
            </div>
          </div>
        </div>
        {/* Filters & Trending Tags */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("blog.searchPlaceholder") || "Search articles..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 border-border focus:border-primary bg-background focus-ring"
              aria-label={t("blog.searchPlaceholder") || "Search articles"}
            />
          </div>
          {/* Trending tags (static for now) */}
          <div className="flex flex-wrap gap-2">
            {["Waqf", "Investment", "Sharia", "Innovation", "Impact"].map(
              (tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer bg-primary/10 text-primary border-0 font-poppins font-arabic"
                  onClick={() => setSelectedCategory(tag)}
                  aria-label={tag}
                >
                  #{tag}
                </Badge>
              )
            )}
          </div>
        </div>
        {/* Posts Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(postsData && (postsData as any).data
                ? (postsData as any).data
                : []
              ).map((post: any, index: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:border-primary/20 card-hover card-glow bg-card">
                    {post.featuredImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={getTranslatedText(post.title)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary border-0 font-poppins font-arabic"
                        >
                          <BookOpen className="w-3 h-3 mr-1" />
                          {post.type || "BLOG"}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors font-poppins font-arabic">
                        {getTranslatedText(post.title)}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 font-poppins font-arabic">
                        {truncateContent(
                          getTranslatedText(post.excerpt) ||
                            getTranslatedText(post.content) ||
                            ""
                        )}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {post.comments?.length || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary focus-ring"
                            aria-label={t("blog.share") || "Share"}
                          >
                            <Share2 className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:bg-primary/10 focus-ring"
                            aria-label={t("blog.readMore") || "Read More"}
                            onClick={() => {
                              if (
                                typeof onReadMore === "function" &&
                                post.slug
                              ) {
                                onReadMore(post.slug);
                              } else {
                                setSelectedPost(post);
                                setShowDetail(true);
                              }
                            }}
                          >
                            {t("blog.readMore") || "Read More"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {/* Load More */}
            {postsData &&
              (postsData as any).data &&
              (postsData as any).data.length > 0 && (
                <div className="flex justify-center mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="border-border hover:bg-muted focus-ring"
                    aria-label={t("blog.loadMore") || "Load More Articles"}
                  >
                    {t("blog.loadMore") || "Load More Articles"}
                  </Button>
                </div>
              )}
          </>
        )}
      </div>
      {/* BlogDetail Modal */}
      {showDetail && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl mx-auto bg-background rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <Button
              variant="ghost"
              className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-primary focus-ring"
              onClick={() => setShowDetail(false)}
              aria-label={t("common.close") || "Close"}
            >
              ×
            </Button>
            <BlogDetail postId={selectedPost.id} />
            {/* Related posts placeholder */}
            <div className="p-6 border-t border-border">
              <h4 className="text-lg font-semibold mb-4 text-foreground font-poppins font-arabic">
                {t("blog.relatedPosts") || "Related Posts"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* TODO: Map related posts here */}
                <div className="bg-muted rounded-lg p-4 text-muted-foreground">
                  Coming soon...
                </div>
                <div className="bg-muted rounded-lg p-4 text-muted-foreground">
                  Coming soon...
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
