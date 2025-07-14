"use client";

import React from "react";
import { EnhancedBlogDetail } from "@/components/blog/EnhancedBlogDetail";
import { EnhancedComments } from "@/components/blog/EnhancedComments";
import { usePost, usePostBySlug } from "@/hooks/api/useContent";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { isRTL, t } = useLanguage();
  const { slug } = params;
  
  // Fetch post data to get comments
  const { data: postData, isLoading } = usePostBySlug(slug);
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
          <EnhancedBlogDetail slug={slug} showRelated={true} />
        </div>
        
        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : postData ? (
            <EnhancedComments 
              postId={postData.id} 
              comments={postData.comments || []} 
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">{t("common.error")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}