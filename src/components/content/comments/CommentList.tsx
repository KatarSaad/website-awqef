
"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, User, Calendar, ThumbsUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Comment {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  likes?: number;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
  postId?: number;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, postId }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary-900 flex items-center space-x-2">
          <MessageCircle size={24} />
          <span>{t("content.comments")} ({comments.length})</span>
        </h2>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">
                      {t("content.user")} #{comment.authorId}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  {comment.likes && comment.likes > 0 && (
                    <div className="flex items-center space-x-1 mt-2 text-sm text-gray-500">
                      <ThumbsUp size={14} />
                      <span>{comment.likes} {t("content.likes")}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
          <p>{t("content.noComments")}</p>
        </div>
      )}
    </div>
  );
};
