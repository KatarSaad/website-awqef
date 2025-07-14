"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCreateComment } from "@/hooks/api/useContent";
import { CreateWebsiteCommentDto } from "@/api/generated/models/CreateWebsiteCommentDto";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Reply } from "lucide-react";
import { useCreateWebsiteComment } from "@/hooks/api/useWebsiteComments";

interface BlogCommentsProps {
  postId: number;
  comments: any[];
}

export const BlogComments: React.FC<BlogCommentsProps> = ({
  postId,
  comments = [],
}) => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuthContext();
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const createCommentMutation = useCreateWebsiteComment();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const commentData = {
        content: commentText,
        postId,
        parentId: replyingTo || undefined,
        authorId: user?.id,
      };

      await createCommentMutation.mutateAsync(commentData);

      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Group comments by parent/child relationship
  const commentThreads = comments.reduce((acc: any, comment: any) => {
    if (!comment.parentId) {
      // This is a top-level comment
      if (!acc[comment.id]) {
        acc[comment.id] = {
          comment,
          replies: [],
        };
      } else {
        acc[comment.id].comment = comment;
      }
    } else {
      // This is a reply
      if (!acc[comment.parentId]) {
        acc[comment.parentId] = {
          comment: null,
          replies: [comment],
        };
      } else {
        acc[comment.parentId].replies.push(comment);
      }
    }
    return acc;
  }, {});

  const renderComment = (comment: any, isReply = false) => {
    if (!comment) return null;

    return (
      <div
        key={comment.id}
        className={`${
          isReply
            ? "ml-12 mt-4"
            : "mb-8 border-b border-gray-100 pb-6 last:border-0"
        }`}
      >
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.author?.avatar || ""} />
            <AvatarFallback>
              {comment.author?.first_name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium">
                {comment.author
                  ? `${comment.author.first_name || ""} ${
                      comment.author.family_name || ""
                    }`.trim() || comment.author.email
                  : "Anonymous"}
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(comment.createdAt)}
              </div>
            </div>

            <div className="text-gray-700 mb-3">{comment.content}</div>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-primary-600 text-xs"
              onClick={() => setReplyingTo(comment.id)}
            >
              <Reply className="h-3 w-3 mr-1" />
              {t("blog.reply")}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar || ""} />
            <AvatarFallback>{user?.first_name?.[0] || "G"}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            {replyingTo && (
              <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md text-sm">
                <span>Replying to comment</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-gray-500 hover:text-gray-700"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </Button>
              </div>
            )}

            <Textarea
              placeholder={t("blog.addComment")}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[100px] resize-none"
              required
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={
                  !commentText.trim() || createCommentMutation.isPending
                }
                className="bg-primary-600 hover:bg-primary-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {t("blog.postComment")}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {Object.values(commentThreads).length > 0 ? (
        <div className="space-y-6">
          {Object.values(commentThreads).map((thread: any) => (
            <div key={thread.comment?.id || `thread-${Math.random()}`}>
              {thread.comment && renderComment(thread.comment)}
              {thread.replies.map((reply: any) => renderComment(reply, true))}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">{t("blog.noComments")}</p>
        </div>
      )}
    </div>
  );
};
