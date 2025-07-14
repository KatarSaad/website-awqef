
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
  ChevronDown
} from "lucide-react";

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

<<<<<<< HEAD
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
=======
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = getTranslatedText(post?.title);
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header Navigation */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {language === 'ar' ? 'العودة' : 'Back'}
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : "text-gray-500"}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={isBookmarked ? "text-blue-500" : "text-gray-500"}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShareOpen(!shareOpen)}
              className="text-gray-500"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-full px-4 py-2">
              {post.category?.name || post.type}
            </Badge>
            <span className="text-sm text-gray-500">
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-arabic">
            {getTranslatedText(post.title)}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="font-medium">
                {post.author?.first_name} {post.author?.family_name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{calculateReadTime(getTranslatedText(post.content) || '')} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span>{post.views || 0} views</span>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.featuredImage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={post.featuredImage}
                alt={getTranslatedText(post.title)}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
>>>>>>> fc7084d8be839aafc2de939092f780d5d176f07b
        )}
        {/* Content */}
<<<<<<< HEAD
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
=======
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <div className="text-lg leading-relaxed text-gray-700 space-y-6">
            {getTranslatedText(post.content)?.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: any) => (
                <Badge key={tag.id} variant="outline" className="rounded-full px-3 py-1">
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        <Separator className="my-12" />

        {/* Engagement Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between py-6"
        >
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => setIsLiked(!isLiked)}
              className={`gap-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{(post.likes || 0) + (isLiked ? 1 : 0)}</span>
            </Button>
            
            <div className="flex items-center gap-2 text-gray-500">
              <MessageSquare className="h-5 w-5" />
              <span>{post.comments?.length || 0} comments</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500">
              <Share2 className="h-5 w-5" />
              <span>{post.shares || 0} shares</span>
            </div>
          </div>

          {/* Share Buttons */}
          {shareOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="gap-2"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="gap-2"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
                className="gap-2"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Author Bio */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 rounded-2xl p-8 mb-12"
        >
          <div className="flex items-start gap-4">
            {post.author?.avatar && (
              <img
                src={post.author.avatar}
                alt={`${post.author.first_name} ${post.author.family_name}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.author?.first_name} {post.author?.family_name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === 'ar' 
                  ? 'كاتب ومحلل في مجال التمويل الإسلامي والاستثمار الأخلاقي'
                  : 'Writer and analyst specializing in Islamic finance and ethical investment'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 font-arabic">
            {language === 'ar' ? 'التعليقات' : 'Comments'} ({post.comments?.length || 0})
          </h3>
          
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-6">
              {post.comments.map((comment: any) => (
                <Card key={comment.id} className="p-6 border-0 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900">{comment.author}</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{language === 'ar' ? 'لا توجد تعليقات بعد' : 'No comments yet'}</p>
              <p className="text-sm mt-2">
                {language === 'ar' ? 'كن أول من يعلق على هذا المقال' : 'Be the first to comment on this article'}
              </p>
            </div>
          )}
        </motion.section>
      </article>
    </div>
>>>>>>> fc7084d8be839aafc2de939092f780d5d176f07b
  );
};
