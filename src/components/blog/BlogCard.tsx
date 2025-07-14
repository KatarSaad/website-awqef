"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, MessageCircle, Star, Eye, Share2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PostResponseDto } from "@/api/generated";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SocialShare } from "./SocialShare";
import { RatingSystem } from "./RatingSystem";

interface BlogCardProps {
  post: PostResponseDto;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { t, language, isRTL } = useLanguage();

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || Object.values(field)[0] || "";
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "BLOG":
        return "bg-primary-100 text-primary-700";
      case "NEWS":
        return "bg-secondary-100 text-secondary-700";
      case "EVENT":
        return "bg-accent-100 text-accent-700";
      case "PAGE":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const averageRating =
    post.ratings?.length > 0
      ? post.ratings.reduce((sum, rating) => sum + rating.value, 0) /
        post.ratings.length
      : 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={getTranslatedText(post.title)}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {post.isFeatured && (
            <Badge className="absolute top-4 left-4 bg-primary-500 text-white shadow-lg shadow-primary-200/40">
              {t("blog.featured")}
            </Badge>
          )}
          <Badge
            className={`absolute top-4 right-4 ${getPostTypeColor(
              post.type || "BLOG"
            )} shadow-md`}
          >
            {t(`blog.types.${post.type?.toLowerCase()}`) || post.type}
          </Badge>
        </div>
      )}

      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className="text-primary-600 border-primary-200"
          >
            {getTranslatedText(post.category?.name) ||
              t("blog.defaultCategory")}
          </Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-primary-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
          {getTranslatedText(post.title) || t("blog.defaultTitle")}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-700 mb-4 line-clamp-3">
          {getTranslatedText(post.excerpt) || t("blog.defaultExcerpt")}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-primary-500 text-xs">
                +{post.tags.length - 3} {t("common.more")}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {post.author && (
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                <span>
                  {`${post.author.first_name || ""} ${
                    post.author.family_name || ""
                  }`.trim() ||
                    post.author.email ||
                    t("blog.author")}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <MessageCircle size={14} className="mr-1" />
              <span>{post.comments?.length || 0}</span>
            </div>
            {averageRating > 0 && (
              <div className="flex items-center">
                <Star size={14} className="mr-1 text-secondary-500" />
                <span>{averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          <Link href={`/blog/${post.slug || post.id}`} passHref legacyBehavior>
            <Button
              variant="outline"
              className="flex-1 mr-2 text-primary-700 border-primary-200 hover:bg-primary-50 shadow-sm"
            >
              {t("blog.readMore")}
            </Button>
          </Link>
          <SocialShare post={post} />
        </div>
        <div className="mt-4">
          <RatingSystem postId={post.id} allowRating={true} />
        </div>
      </div>
    </motion.div>
  );
};
