"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePosts } from "@/hooks/api/useContent";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  ArrowRight,
  User,
} from "lucide-react";

interface SocialFeedBlogListProps {
  limit?: number;
  categoryId?: number;
}

export const SocialFeedBlogList: React.FC<SocialFeedBlogListProps> = ({
  limit = 5,
  categoryId,
}) => {
  const { t, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPosts, setLoadedPosts] = useState<any[]>([]);

  const {
    data: postsData,
    isLoading,
    error,
  } = usePosts(
    currentPage,
    limit,
    "",
    categoryId
  );

  // Add new posts to the loaded posts
  useEffect(() => {
    if (postsData?.data) {
      if (currentPage === 1) {
        setLoadedPosts(postsData.data);
      } else {
        setLoadedPosts(prev => [...prev, ...postsData.data]);
      }
    }
  }, [postsData?.data, currentPage]);

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || Object.values(field)[0] || "";
  };

  const totalPages = Math.ceil((postsData?.total || 0) / limit);

  if (error) {
    return (
      <div className="text-center py-8 bg-red-50 rounded-lg">
        <p className="text-red-600">{t("common.error")}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Posts Feed */}
      <div className="space-y-6">
        {/* Loading skeletons */}
        {isLoading && currentPage === 1 && (
          <>
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-48 w-full rounded-lg mb-4" />
                <div className="flex justify-between pt-4">
                  <div className="flex gap-3">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </>
        )}

        {/* Loaded posts */}
        {loadedPosts.map((post, index) => (
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
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author?.avatar} />
                    <AvatarFallback className="bg-primary-100 text-primary-600">
                      {post.author?.first_name?.[0] || <User className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {post.author ? 
                        `${post.author.first_name || ""} ${post.author.family_name || ""}`.trim() || 
                        post.author.email : 
                        "Anonymous"}
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
                <Link href={`/blog/${post.slug || post.id}`} className="hover:text-primary-600 transition-colors">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {getTranslatedText(post.title)}
                  </h3>
                </Link>
                <p className="text-gray-600">
                  {getTranslatedText(post.excerpt)}
                </p>
              </div>
              
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src={post.featuredImage} 
                    alt={getTranslatedText(post.title)}
                    className="w-full object-cover transition-transform hover:scale-105 duration-500"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              )}
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 5).map((tag: string, idx: number) => (
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
                    {t("blog.readMore")}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {loadedPosts.length > 0 && currentPage < totalPages && (
        <div className="mt-8 text-center">
          <Button 
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={isLoading}
            variant="outline"
            className="w-full max-w-md py-6"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>{t("blog.loadingMore")}</span>
              </div>
            ) : (
              t("blog.loadMore")
            )}
          </Button>
        </div>
      )}

      {/* No more posts message */}
      {loadedPosts.length > 0 && currentPage >= totalPages && (
        <div className="mt-8 text-center text-gray-500">
          {t("blog.noMorePosts")}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && loadedPosts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">{t("blog.noPosts")}</p>
        </div>
      )}
    </div>
  );
};