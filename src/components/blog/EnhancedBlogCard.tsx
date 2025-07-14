"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  User,
  MessageCircle,
  Star,
  Eye,
  Share2,
  Bookmark,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PostResponseDto } from "@/api/generated/models/PostResponseDto";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreateShare } from "@/hooks/api/useContent";
import { cn } from "@/lib/utils";

interface EnhancedBlogCardProps {
  post: PostResponseDto;
  variant?: "default" | "featured" | "minimal" | "horizontal";
  className?: string;
}

export const EnhancedBlogCard: React.FC<EnhancedBlogCardProps> = ({
  post,
  variant = "default",
  className,
}) => {
  const { t, language, isRTL } = useLanguage();
  const [bookmarked, setBookmarked] = useState(false);
  const createShareMutation = useCreateShare();

  // Calculate estimated reading time
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || Object.values(field)[0] || "";
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: getTranslatedText(post.title),
          text: getTranslatedText(post.excerpt),
          url: `/blog/${post.slug || post.id}`,
        })
        .then(() => {
          // Log share after successful sharing
          createShareMutation.mutate({ postId: post.id });
        });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(
        window.location.origin + `/blog/${post.slug || post.id}`
      );
      createShareMutation.mutate({ postId: post.id });
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type?.toUpperCase()) {
      case "BLOG":
        return "bg-primary-100 text-primary-700 border-primary-200";
      case "NEWS":
        return "bg-secondary-100 text-secondary-700 border-secondary-200";
      case "EVENT":
        return "bg-accent-100 text-accent-700 border-accent-200";
      case "PAGE":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const averageRating =
    post.ratings?.length > 0
      ? post.ratings.reduce((sum, rating) => sum + rating.value, 0) /
        post.ratings.length
      : 0;

  const readingTime = getReadingTime(getTranslatedText(post.content));

  // Different card layouts based on variant
  if (variant === "minimal") {
    return (
      <Link href={`/blog/${post.slug || post.id}`} passHref>
        <motion.div
          whileHover={{ y: -3 }}
          className={cn(
            "flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all",
            className
          )}
          dir={isRTL ? "rtl" : "ltr"}
        >
          {post.featuredImage && (
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={post.featuredImage}
                alt={getTranslatedText(post.title)}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 line-clamp-1">
              {getTranslatedText(post.title)}
            </h3>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {post.views || 0}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={cn(
          "flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300",
          className
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {post.featuredImage && (
          <div className="md:w-1/3 h-48 md:h-auto relative">
            <Image
              src={post.featuredImage}
              alt={getTranslatedText(post.title)}
              fill
              className="object-cover"
            />
            {post.isFeatured && (
              <Badge className="absolute top-4 left-4 bg-primary-500 text-white shadow-lg">
                {t("blog.featured")}
              </Badge>
            )}
          </div>
        )}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge
                className={cn("border", getPostTypeColor(post.type || "BLOG"))}
              >
                {t(`blog.types.${post.type?.toLowerCase()}`) || post.type}
              </Badge>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar size={14} className="mr-1" />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <Link href={`/blog/${post.slug || post.id}`} passHref>
              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                {getTranslatedText(post.title)}
              </h3>
            </Link>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {getTranslatedText(post.excerpt)}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              {post.author && (
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={post.author.avatar || ""} />
                    <AvatarFallback>
                      {post.author.first_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {`${post.author.first_name || ""} ${
                      post.author.family_name || ""
                    }`.trim() || post.author.email}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {readingTime} min
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={14} />
                {post.comments?.length || 0}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {post.views || 0}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={cn(
          "group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300",
          className
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {post.featuredImage && (
          <div className="relative h-72 overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={getTranslatedText(post.title)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary-500 text-white border-none">
                  {t("blog.featured")}
                </Badge>
                <Badge
                  className={cn(
                    "border",
                    getPostTypeColor(post.type || "BLOG")
                  )}
                >
                  {t(`blog.types.${post.type?.toLowerCase()}`) || post.type}
                </Badge>
              </div>

              <Link href={`/blog/${post.slug || post.id}`} passHref>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary-200 transition-colors">
                  {getTranslatedText(post.title)}
                </h3>
              </Link>

              <div className="flex items-center gap-4 text-white/80">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={post.author.avatar || ""} />
                      <AvatarFallback>
                        {post.author.first_name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">
                      {`${post.author.first_name || ""} ${
                        post.author.family_name || ""
                      }`.trim() || post.author.email}
                    </span>
                  </div>
                )}
                <span className="flex items-center gap-1 text-sm">
                  <Calendar size={14} />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <p className="text-gray-600 mb-4 line-clamp-3">
            {getTranslatedText(post.excerpt)}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {readingTime} min
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {post.views || 0}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={14} />
                {post.comments?.length || 0}
              </span>
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
    );
  }

  // Default card variant
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300",
        className
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {post.featuredImage && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={getTranslatedText(post.title)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.isFeatured && (
            <Badge className="absolute top-4 left-4 bg-primary-500 text-white shadow-lg">
              {t("blog.featured")}
            </Badge>
          )}
          <Badge
            className={cn(
              "absolute top-4 right-4 border",
              getPostTypeColor(post.type || "BLOG")
            )}
          >
            {t(`blog.types.${post.type?.toLowerCase()}`) || post.type}
          </Badge>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className="text-primary-600 border-primary-200"
          >
            {getTranslatedText(post.category?.name) ||
              t("blog.defaultCategory")}
          </Badge>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <Link href={`/blog/${post.slug || post.id}`} passHref>
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {getTranslatedText(post.title)}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {getTranslatedText(post.excerpt)}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {post.author && (
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={post.author.avatar || ""} />
                  <AvatarFallback>
                    {post.author.first_name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700">
                  {`${post.author.first_name || ""} ${
                    post.author.family_name || ""
                  }`.trim() || post.author.email}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {readingTime} min
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {post.views || 0}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-primary-600 p-1 h-auto"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark
                className={cn(
                  "h-4 w-4",
                  bookmarked && "fill-primary-500 text-primary-500"
                )}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-primary-600 p-1 h-auto"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <span className="flex items-center gap-1 text-gray-500 text-sm">
              <MessageCircle size={14} />
              {post.comments?.length || 0}
            </span>
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
  );
};
