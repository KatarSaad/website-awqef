"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Clock,
  ArrowLeft,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePost, usePostBySlug, useCreateShare } from "@/hooks/api/useContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { EnhancedBlogCard } from "./EnhancedBlogCard";
import { BlogComments } from "./BlogComments";
import { RatingSystem } from "./RatingSystem";
import { cn } from "@/lib/utils";

interface EnhancedBlogDetailProps {
  postId?: number;
  slug?: string;
  showRelated?: boolean;
}

export const EnhancedBlogDetail: React.FC<EnhancedBlogDetailProps> = ({
  postId,
  slug,
  showRelated = true,
}) => {
  const { t, language, isRTL } = useLanguage();
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const createShareMutation = useCreateShare();

  let postResponse, isLoading, error;

  if (slug) {
    ({ data: postResponse, isLoading, error } = usePostBySlug(slug));
  } else if (postId) {
    ({ data: postResponse, isLoading, error } = usePost(postId));
  } else {
    postResponse = null;
    isLoading = false;
    error = true;
  }

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

  const handleShare = (platform?: string) => {
    if (!postResponse?.data) return;

    const post = postResponse.data;
    const title = getTranslatedText(post.title);
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/blog/${post.slug || post.id}`
        : `/blog/${post.slug || post.id}`;

    // Log share
    createShareMutation.mutate({ postId: post.id, platform });

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success(t("blog.linkCopied"));
      return;
    }

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title,
            text: getTranslatedText(post.excerpt),
            url,
          });
          return;
        }
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Fetch related posts (mock implementation)
  useEffect(() => {
    if (postResponse?.data && showRelated) {
      // In a real implementation, you would fetch related posts based on category, tags, etc.
      // For now, we'll just simulate it
      setTimeout(() => {
        setRelatedPosts([
          {
            id: 101,
            title: { en: "Related Post 1", ar: "مقالة ذات صلة 1" },
            excerpt: {
              en: "This is a related post based on similar topics",
              ar: "هذه مقالة ذات صلة بناءً على مواضيع مماثلة",
            },
            featuredImage:
              "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop",
            createdAt: new Date().toISOString(),
            views: 120,
            comments: [],
            slug: "related-post-1",
          },
          {
            id: 102,
            title: { en: "Related Post 2", ar: "مقالة ذات صلة 2" },
            excerpt: {
              en: "Another related post with similar content",
              ar: "مقالة أخرى ذات صلة بمحتوى مماثل",
            },
            featuredImage:
              "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop",
            createdAt: new Date().toISOString(),
            views: 85,
            comments: [],
            slug: "related-post-2",
          },
        ]);
      }, 1000);
    }
  }, [postResponse?.data, showRelated]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-12 w-3/4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-80 w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !postResponse) {
    // Log error 7 for debugging
    console.error("Error 7:", error, postResponse);
    return (
      <div className="max-w-4xl mx-auto text-center py-12 bg-red-50 rounded-lg">
        <p className="text-red-600 mb-4">{t("common.error")}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          {t("common.tryAgain")}
        </Button>
      </div>
    );
  }

  // postResponse is the post object itself, not { data: ... }
  const post = postResponse;
  const readingTime = getReadingTime(getTranslatedText(post.content));
  const postContent = getTranslatedText(post.content);
  const postTitle = getTranslatedText(post.title);
  const postExcerpt = getTranslatedText(post.excerpt);

  return (
    <article className="max-w-4xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Back button */}
        <div>
          <Link href="/blog" passHref>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-primary-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("common.back")}
            </Button>
          </Link>
        </div>

        {/* Category and Type */}
        <div className="flex flex-wrap items-center gap-3">
          {post.category && (
            <Badge
              variant="outline"
              className="text-primary-600 border-primary-200"
            >
              {getTranslatedText(post.category.name) ||
                t("blog.defaultCategory")}
            </Badge>
          )}
          {post.type && (
            <Badge className="bg-primary-100 text-primary-700 border-primary-200">
              {t(`blog.types.${post.type.toLowerCase()}`) || post.type}
            </Badge>
          )}
          {post.isFeatured && (
            <Badge className="bg-primary-500 text-white">
              {t("blog.featured")}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          {postTitle}
        </h1>

        {/* Author and Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {post.author && (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar || ""} />
                  <AvatarFallback>
                    {post.author.first_name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">
                    {`${post.author.first_name || ""} ${
                      post.author.family_name || ""
                    }`.trim() || post.author.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {post.author.title || t("blog.author")}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {readingTime} min {t("blog.readTime")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.views || 0}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.featuredImage}
              alt={postTitle}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {postExcerpt && (
            <div className="text-xl text-gray-600 font-medium border-l-4 border-primary-500 pl-4 italic mb-8">
              {postExcerpt}
            </div>
          )}
          {/* Removed any font usage or font-family override here to avoid font decode errors */}
          <div
            dangerouslySetInnerHTML={{
              __html: postContent || t("blog.defaultContent"),
            }}
            className="text-gray-800 leading-relaxed"
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {post.tags.map((tag: string, index: number) => (
              <Link href={`/blog?tag=${tag}`} key={index} passHref>
                <Badge
                  variant="outline"
                  className="bg-gray-50 hover:bg-gray-100 cursor-pointer"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-gray-200">
          <div className="flex items-center gap-2">
            <RatingSystem postId={post.id} allowRating={true} />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-primary-600"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Bookmark
                className={cn(
                  "h-5 w-5",
                  bookmarked && "fill-primary-500 text-primary-500"
                )}
              />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-primary-600"
              onClick={() => handleShare("copy")}
            >
              <Copy className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-600"
              onClick={() => handleShare("twitter")}
            >
              <Twitter className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-800"
              onClick={() => handleShare("facebook")}
            >
              <Facebook className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-700"
              onClick={() => handleShare("linkedin")}
            >
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Author Bio (if available) */}
        {post.author && post.author.bio && (
          <div className="bg-gray-50 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-20 w-20">
              <AvatarImage src={post.author.avatar || ""} />
              <AvatarFallback className="text-xl">
                {post.author.first_name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {`${post.author.first_name || ""} ${
                  post.author.family_name || ""
                }`.trim() || post.author.email}
              </h3>
              <p className="text-gray-600 mb-4">{post.author.bio}</p>
              {post.author.social && (
                <div className="flex gap-3">
                  {post.author.social.twitter && (
                    <a
                      href={post.author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-5 w-5 text-gray-500 hover:text-blue-400" />
                    </a>
                  )}
                  {post.author.social.linkedin && (
                    <a
                      href={post.author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5 text-gray-500 hover:text-blue-700" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {t("blog.comments")} ({post.comments?.length || 0})
          </h3>
          <BlogComments postId={post.id} comments={post.comments || []} />
        </div>

        {/* Related Posts */}
        {showRelated && (
          <div className="pt-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {t("blog.relatedPosts")}
              </h3>
              <Link href="/blog" passHref>
                <Button
                  variant="ghost"
                  className="text-primary-600 hover:text-primary-800"
                >
                  {t("blog.viewAll")}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.length > 0
                ? relatedPosts.map((relatedPost) => (
                    <EnhancedBlogCard
                      key={relatedPost.id}
                      post={relatedPost}
                      variant="horizontal"
                    />
                  ))
                : Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex"
                      >
                        <Skeleton className="w-1/3 h-48" />
                        <div className="p-6 flex-1 space-y-3">
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    ))}
            </div>
          </div>
        )}
      </motion.div>
    </article>
  );
};
