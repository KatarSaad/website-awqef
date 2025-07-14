
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Heart, MessageCircle, Share2, TrendingUp, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PostResponseDto } from "@/api/generated";

interface PostAnalyticsProps {
  post: PostResponseDto;
  analytics?: {
    views: number;
    likes: number;
    shares: number;
    avgReadTime: number;
    engagement: number;
  };
}

export const PostAnalytics: React.FC<PostAnalyticsProps> = ({ post, analytics }) => {
  const { t, isRTL } = useLanguage();

  const mockAnalytics = {
    views: 1250,
    likes: 89,
    shares: 34,
    avgReadTime: 4.5,
    engagement: 7.1,
    ...analytics
  };

  const stats = [
    {
      label: t("blog.analytics.views"),
      value: mockAnalytics.views.toLocaleString(),
      icon: Eye,
      color: "text-blue-600"
    },
    {
      label: t("blog.analytics.likes"),
      value: mockAnalytics.likes.toString(),
      icon: Heart,
      color: "text-red-600"
    },
    {
      label: t("blog.analytics.comments"),
      value: (post.comments?.length || 0).toString(),
      icon: MessageCircle,
      color: "text-green-600"
    },
    {
      label: t("blog.analytics.shares"),
      value: mockAnalytics.shares.toString(),
      icon: Share2,
      color: "text-purple-600"
    },
    {
      label: t("blog.analytics.readTime"),
      value: `${mockAnalytics.avgReadTime}m`,
      icon: Clock,
      color: "text-orange-600"
    },
    {
      label: t("blog.analytics.engagement"),
      value: `${mockAnalytics.engagement}%`,
      icon: TrendingUp,
      color: "text-emerald-600"
    }
  ];

  return (
    <div className="bg-white rounded-lg border p-6" dir={isRTL ? "rtl" : "ltr"}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("blog.analytics.title")}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 rounded-lg bg-gray-50"
            >
              <IconComponent className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
