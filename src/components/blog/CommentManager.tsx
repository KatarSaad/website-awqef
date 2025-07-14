import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  useCreateComment,
  useCommentsForProject,
} from "@/hooks/api/useContent";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  MessageCircle,
  Reply,
  ThumbsUp,
  ThumbsDown,
  Flag,
  MoreHorizontal,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CommentManagerProps {
  projectId?: number;
  postId?: number;
  allowPosting?: boolean;
}

export const CommentManager: React.FC<CommentManagerProps> = ({
  projectId,
  postId,
  allowPosting = true,
}) => {
  const { t, isRTL } = useLanguage();
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const { data: commentsResult, isLoading } = useCommentsForProject(
    projectId || 0
  );
  const createCommentMutation = useCreateComment();

  const comments = commentsResult?.data || [];

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      await createCommentMutation.mutateAsync({
        content: newComment,
        projectId: projectId,
        postId: postId,
        parentId: null,
      });
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleSubmitReply = async (parentId: number) => {
    if (!replyText.trim()) return;

    try {
      await createCommentMutation.mutateAsync({
        content: replyText,
        projectId: projectId,
        postId: postId,
        parentId: parentId,
      });
      setReplyText("");
      setReplyTo(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: any;
    isReply?: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-lg border p-4 ${
        isReply ? "ml-8 mt-2" : "mb-4"
      }`}
    >
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.user?.avatar} />
          <AvatarFallback>
            {comment.user?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm">
                {comment.user?.name || t("common.user")}
              </span>
              <Badge variant="outline" className="text-xs">
                {comment.user?.role || "User"}
              </Badge>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock size={12} />
                <span>
                  {new Date(
                    comment.createdAt || Date.now()
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Flag size={14} className="mr-2" />
                  {t("common.report")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Reply size={14} className="mr-2" />
                  {t("blog.reply")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-gray-700 mb-3">{comment.content}</p>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-xs">
              <ThumbsUp size={14} className="mr-1" />
              {comment.likes || 0}
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <ThumbsDown size={14} className="mr-1" />
              {comment.dislikes || 0}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() =>
                setReplyTo(replyTo === comment.id ? null : comment.id)
              }
            >
              <Reply size={14} className="mr-1" />
              {t("blog.reply")}
            </Button>
          </div>

          {/* Reply Form */}
          <AnimatePresence>
            {replyTo === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <div className="flex space-x-2">
                  <Textarea
                    placeholder={t("blog.addComment")}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 min-h-[80px]"
                  />
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={
                        !replyText.trim() || createCommentMutation.isPending
                      }
                      size="sm"
                    >
                      {t("blog.postComment")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReplyTo(null);
                        setReplyText("");
                      }}
                    >
                      {t("common.cancel")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle size={20} />
            <span>
              {t("blog.comments")} ({comments.length})
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Add Comment Form */}
          {allowPosting && (
            <div className="mb-6">
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder={t("blog.addComment")}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSubmitComment}
                      disabled={
                        !newComment.trim() || createCommentMutation.isPending
                      }
                    >
                      {createCommentMutation.isPending
                        ? t("common.sending")
                        : t("blog.postComment")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>{t("blog.noComments")}</p>
              </div>
            ) : (
              <AnimatePresence>
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <CommentItem comment={comment} />
                    {/* Nested replies would go here */}
                  </div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
