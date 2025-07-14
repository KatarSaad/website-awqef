"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { PostResponseDto } from "@/api/generated";
import { useCreateShare } from "@/hooks/api/useContent";

interface SocialShareProps {
  post: PostResponseDto;
}

export const SocialShare: React.FC<SocialShareProps> = ({ post }) => {
  const { t, isRTL, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const createShareMutation = useCreateShare();

  const getPostTitle = () => {
    if (typeof post.title === "object") {
      return post.title[language] || post.title.en || "Post";
    }
    return post.title || "Post";
  };

  const postUrl = `${window.location.origin}/blog/${post.slug}`;
  const postTitle = getPostTitle();

  const handleShare = async (platform: string, url: string) => {
    window.open(url, "_blank", "width=600,height=400");

    try {
      await createShareMutation.mutateAsync({
        platform,
        postId: post.id,
        userId: 1, // This should come from auth context
      });
    } catch (error) {
      console.error("Failed to log share:", error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        postUrl
      )}`,
      color: "text-blue-600 hover:bg-blue-50",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        postUrl
      )}&text=${encodeURIComponent(postTitle)}`,
      color: "text-sky-600 hover:bg-sky-50",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        postUrl
      )}`,
      color: "text-blue-700 hover:bg-blue-50",
    },
  ];

  return (
    <div className="bg-white rounded-lg border p-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center space-x-2 mb-4">
        <Share2 size={20} className="text-primary-500" />
        <h3 className="font-semibold text-gray-900">{t("blog.sharePost")}</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {shareOptions.map((option, index) => {
          const IconComponent = option.icon;
          return (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className={`w-full flex items-center justify-center space-x-2 bg-primary-50 hover:bg-primary-100 text-primary-700 border-primary-100 shadow`}
                onClick={() =>
                  handleShare(option.name.toLowerCase(), option.url)
                }
              >
                <IconComponent size={16} />
                <span className="hidden sm:inline">{option.name}</span>
              </Button>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            className={`w-full flex items-center justify-center space-x-2 bg-primary-50 hover:bg-primary-100 text-primary-700 border-primary-100 shadow`}
            onClick={handleCopyLink}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span className="hidden sm:inline">
              {copied ? t("blog.linkCopied") : t("blog.copyLink")}
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
