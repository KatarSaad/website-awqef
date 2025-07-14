"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileQuestion } from "lucide-react";

export default function BlogPostNotFound() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center py-16 bg-white rounded-xl shadow-sm">
          <FileQuestion className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("blog.postNotFound")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t("blog.postNotFoundDesc") || "The blog post you're looking for doesn't exist or has been removed."}
          </p>
          <Link href="/blog" passHref>
            <Button>
              {t("blog.backToBlog")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}