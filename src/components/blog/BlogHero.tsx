"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePosts } from "@/hooks/api/useContent";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const BlogHero: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  
  // Fetch featured posts
  const { data: postsData, isLoading } = usePosts(1, 3, "", undefined, true);
  
  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || Object.values(field)[0] || "";
  };
  
  // Calculate estimated reading time
  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  };
  
  // Get featured post
  const featuredPost = postsData?.data?.find(post => post.isFeatured) || postsData?.data?.[0];
  
  if (isLoading) {
    return (
      <div className="relative w-full h-[500px] bg-gradient-to-r from-primary-900 to-primary-800 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12">
          <div className="space-y-4 max-w-3xl">
            <Skeleton className="h-6 w-32 bg-white/20" />
            <Skeleton className="h-12 w-3/4 bg-white/20" />
            <Skeleton className="h-6 w-full bg-white/20" />
            <Skeleton className="h-6 w-2/3 bg-white/20" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-10 w-32 bg-white/20" />
              <Skeleton className="h-10 w-32 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!featuredPost) {
    return (
      <div className="relative w-full h-[300px] bg-gradient-to-r from-primary-900 to-primary-800 rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h2 className="text-3xl font-bold mb-4">{t("blog.title")}</h2>
          <p className="text-xl text-white/80 mb-6">{t("blog.subtitle")}</p>
          <Button asChild>
            <Link href="/blog">
              {t("blog.exploreAll")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-[500px] rounded-2xl overflow-hidden group"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Image */}
      {featuredPost.featuredImage ? (
        <Image
          src={featuredPost.featuredImage}
          alt={getTranslatedText(featuredPost.title)}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-800"></div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12">
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-primary-500 text-white border-none">
              {t("blog.featured")}
            </Badge>
            {featuredPost.category && (
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                {getTranslatedText(featuredPost.category.name)}
              </Badge>
            )}
          </div>
          
          <Link href={`/blog/${featuredPost.slug || featuredPost.id}`} passHref>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-primary-200 transition-colors">
              {getTranslatedText(featuredPost.title)}
            </h2>
          </Link>
          
          <p className="text-white/80 text-lg md:text-xl line-clamp-2">
            {getTranslatedText(featuredPost.excerpt)}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-white/70">
            {featuredPost.author && (
              <div className="flex items-center gap-2">
                {featuredPost.author.avatar ? (
                  <img 
                    src={featuredPost.author.avatar} 
                    alt={`${featuredPost.author.first_name || ""} ${featuredPost.author.family_name || ""}`.trim() || featuredPost.author.email}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    {featuredPost.author.first_name?.[0] || "U"}
                  </div>
                )}
                <span>
                  {`${featuredPost.author.first_name || ""} ${featuredPost.author.family_name || ""}`.trim() || featuredPost.author.email}
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {getReadingTime(getTranslatedText(featuredPost.content))} {t("blog.readTime")}
              </span>
            </div>
          </div>
          
          <div className="pt-4">
            <Button asChild className="bg-white text-primary-800 hover:bg-white/90">
              <Link href={`/blog/${featuredPost.slug || featuredPost.id}`}>
                {t("blog.readMore")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};