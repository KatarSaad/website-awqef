
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePosts } from "@/hooks/api/useContent";
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Eye, 
  MessageSquare,
  Heart,
  Share2,
  Clock,
  TrendingUp,
  Bookmark,
  Filter
} from "lucide-react";

export const BlogHomepage: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: postsData, isLoading } = usePosts(currentPage, 12, searchTerm);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object" && field[language]) return field[language];
    return field.en || field.ar || Object.values(field)[0] || "";
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const featuredPost = postsData?.data?.[0];
  const regularPosts = postsData?.data?.slice(1) || [];

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-6 font-arabic">
              {language === 'ar' ? 'المدونة' : 'Our Stories'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              {language === 'ar' 
                ? 'اكتشف أحدث القصص والرؤى من عالم التمويل الإسلامي والتمويل الجماعي'
                : 'Discover the latest stories and insights from the world of Islamic finance and ethical investment'
              }
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder={language === 'ar' ? 'البحث في المقالات...' : 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 rounded-full">
                <Filter className="h-4 w-4" />
                {language === 'ar' ? 'فلترة' : 'Filter'}
              </Button>
              <Button variant="outline" className="gap-2 rounded-full">
                <TrendingUp className="h-4 w-4" />
                {language === 'ar' ? 'الأكثر قراءة' : 'Trending'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 font-arabic">
              {language === 'ar' ? 'المقال المميز' : 'Featured Story'}
            </h2>
            <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl">
              <div className="lg:flex">
                {featuredPost.featuredImage && (
                  <div className="lg:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.featuredImage}
                      alt={getTranslatedText(featuredPost.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-full px-4 py-1">
                      {featuredPost.category?.name || featuredPost.type}
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredPost.createdAt)}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {getTranslatedText(featuredPost.title)}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {getTranslatedText(featuredPost.excerpt) || 
                     getTranslatedText(featuredPost.content)?.substring(0, 200) + "..."}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {featuredPost.author?.first_name} {featuredPost.author?.family_name}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {calculateReadTime(getTranslatedText(featuredPost.content) || '')} min read
                      </span>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
                      {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>
        )}

        {/* Posts Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-arabic">
              {language === 'ar' ? 'أحدث المقالات' : 'Latest Stories'}
            </h2>
            <Button variant="outline" className="rounded-full">
              {language === 'ar' ? 'عرض الكل' : 'View All'}
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-2xl">
                  <div className="animate-pulse">
                    <div className="aspect-[16/10] bg-gray-200"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post: any, index: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white h-full">
                    {post.featuredImage && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={getTranslatedText(post.title)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100 rounded-full px-3 py-1 text-xs">
                          {post.category?.name || post.type}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {getTranslatedText(post.title)}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                        {getTranslatedText(post.excerpt) || 
                         getTranslatedText(post.content)?.substring(0, 120) + "..."}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {post.comments?.length || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {post.likes || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600 p-1">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600 p-1">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Load More */}
        {postsData?.data && postsData.data.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-8 py-3 rounded-full border-2 hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              {language === 'ar' ? 'تحميل المزيد' : 'Load More Stories'}
            </Button>
          </motion.div>
        )}

        {/* Newsletter Subscription */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4 font-arabic">
            {language === 'ar' ? 'ابق على اطلاع' : 'Stay Updated'}
          </h3>
          <p className="text-xl mb-8 opacity-90">
            {language === 'ar' 
              ? 'احصل على أحدث المقالات والرؤى مباشرة في بريدك الإلكتروني'
              : 'Get the latest stories and insights delivered to your inbox'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-full"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8">
              {language === 'ar' ? 'اشترك' : 'Subscribe'}
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
