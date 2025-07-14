"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Eye,
  MessageSquare,
  Share2,
  Edit,
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  FileText,
} from "lucide-react";

interface PostsListProps {
  posts: any[];
  isLoading: boolean;
  onEdit: (post: any) => void;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  isLoading,
  onEdit,
}) => {
  const { language, isRTL } = useLanguage();

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || field.ar || Object.values(field)[0] || "";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      language === "ar" ? "ar-AE" : "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                <div className="flex space-x-4">
                  <div className="h-3 bg-muted rounded w-16"></div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No posts found
          </h3>
          <p className="text-muted-foreground">
            Create your first post to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4" dir={isRTL ? "rtl" : "ltr"}>
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="border-border shadow-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    {post.featuredImage && (
                      <img
                        src={post.featuredImage}
                        alt={getTranslatedText(post.title)}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {getTranslatedText(post.title)}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {getTranslatedText(post.excerpt) ||
                          getTranslatedText(post.content)?.substring(0, 150) +
                            "..."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>
                        {post.author?.first_name} {post.author?.family_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>
                    {post.category && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{getTranslatedText(post.category.name)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={post.publishedAt ? "default" : "secondary"}
                        className={
                          post.publishedAt
                            ? "bg-success/10 text-success border-0"
                            : "bg-warning/10 text-warning border-0"
                        }
                      >
                        {post.publishedAt ? "Published" : "Draft"}
                      </Badge>
                      {post.isFeatured && (
                        <Badge
                          variant="outline"
                          className="text-primary border-primary"
                        >
                          Featured
                        </Badge>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <Badge variant="outline">{post.tags.length} tags</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-primary">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        {post.shares || 0}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(post)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity border-border hover:bg-muted"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity border-border hover:bg-muted"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
