"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePostBySlug } from "@/hooks/api/useContent";
import {
  Calendar,
  User,
  Clock,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ThumbsUp,
  ChevronUp,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { BlogComments } from "./BlogComments";

interface BlogDetailProps {
  slug: string;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ slug }) => {
  const { t, isRTL, language } = useLanguage();
  const { data: post, isLoading } = usePostBySlug(slug);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || field.ar || Object.values(field)[0] || "";
  };

  return (
    <article
      className="bg-background rounded-2xl shadow-xl p-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm shadow font-poppins font-arabic">
              {getTranslatedText(post.category?.name) ||
                t("blog.defaultCategory")}
            </span>
            {post.isFeatured && (
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm shadow-lg shadow-primary/20 font-poppins font-arabic">
                {t("blog.featured")}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-foreground font-poppins font-arabic">
            {getTranslatedText(post.titleId)}
          </h1>
          <div className="flex flex-wrap items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="text-primary font-semibold font-poppins font-arabic">
                  {post.author?.first_name} {post.author?.family_name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="text-secondary font-poppins font-arabic">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{post.views || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={16} />
                <span>{post.ratings?.length || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle size={16} />
                <span>{post.comments?.length || 0}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                aria-label={t("blog.share") || "Share"}
              >
                <Share2 size={16} />
              </Button>
            </div>
          </div>
        </div>
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl border border-primary/10">
            <img
              src={post.featuredImage}
              alt={getTranslatedText(post.titleId)}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* Content */}
        <div className="prose prose-lg max-w-none text-foreground font-poppins font-arabic">
          <div
            dangerouslySetInnerHTML={{
              __html:
                getTranslatedText(post.contentId) || t("blog.defaultContent"),
            }}
          />
        </div>
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-poppins font-arabic"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {/* Comments */}
        <BlogComments postId={post.id} comments={post.comments || []} />
        {/* Related/Recommended Posts Placeholder */}
        <div className="mt-8">
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
      </motion.div>
    </article>
  );
};
