"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCreateComment } from "@/hooks/api/useContent";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  MessageCircle,
  Reply,
  ThumbsUp,
  ThumbsDown,
  Flag,
  MoreHorizontal,
  Clock,
  Send,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EnhancedCommentsProps {
  postId: number;
  comments: any[];
  onCommentAdded?: () => void;
}

export const EnhancedComments: React.FC<EnhancedCommentsProps> = ({
  postId,
  comments = [],
  onCommentAdded,
}) => {
  const { t, isRTL } = useLanguage();
  const { user, isAuthenticated } = useAuthContext();
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>({});
  const [dislikedComments, setDislikedComments] = useState<Record<number, boolean>>({});
  
  const createCommentMutation = useCreateComment();
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    if (!isAuthenticated) {
      toast.error("Please sign in to comment");
      return;
    }
    
    try {
      await createCommentMutation.mutateAsync({
        postId,
        content: commentText,
        parentId: null,
      });
      
      setCommentText("");
      toast.success("Comment posted successfully!");
      onCommentAdded?.();
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to post comment. Please try again.");
    }
  };
  
  const handleSubmitReply = async (parentId: number) => {
    if (!replyText.trim()) return;
    
    if (!isAuthenticated) {
      toast.error("Please sign in to reply");
      return;
    }
    
    try {
      await createCommentMutation.mutateAsync({
        postId,
        content: replyText,
        parentId: parentId,
      });
      
      setReplyText("");
      setReplyingTo(null);
      toast.success("Reply posted successfully!");
      onCommentAdded?.();
    } catch (error) {
      console.error("Error submitting reply:", error);
      toast.error("Failed to post reply. Please try again.");
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
      }
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  };
  
  const handleLike = (commentId: number) => {
    if (likedComments[commentId]) {
      setLikedComments({...likedComments, [commentId]: false});
    } else {
      setLikedComments({...likedComments, [commentId]: true});
      setDislikedComments({...dislikedComments, [commentId]: false});
    }
  };
  
  const handleDislike = (commentId: number) => {
    if (dislikedComments[commentId]) {
      setDislikedComments({...dislikedComments, [commentId]: false});
    } else {
      setDislikedComments({...dislikedComments, [commentId]: true});
      setLikedComments({...likedComments, [commentId]: false});
    }
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
    
    const likesCount = (comment.likes || 0) + (likedComments[comment.id] ? 1 : 0);
    const dislikesCount = (comment.dislikes || 0) + (dislikedComments[comment.id] ? 1 : 0);
    
    return (
      <motion.div 
        key={comment.id} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`${isReply ? 'ml-12 mt-4' : 'mb-6 pb-4 border-b border-gray-100 last:border-0'}`}
      >
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.author?.avatar || ""} />
            <AvatarFallback className="bg-primary-100 text-primary-600">
              {comment.author?.first_name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="font-medium">
                    {comment.author ? 
                      `${comment.author.first_name || ""} ${comment.author.family_name || ""}`.trim() || 
                      comment.author.email : 
                      "Anonymous"}
                  </div>
                  {comment.author?.role === "admin" && (
                    <Badge variant="outline" className="bg-primary-50 text-primary-700 text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(comment.createdAt || Date.now())}</span>
                </div>
              </div>
              
              <p className="text-gray-800 mb-3">{comment.content}</p>
            </div>
            
            <div className="flex items-center gap-4 mt-2 text-sm">
              <button 
                className={`flex items-center gap-1 ${likedComments[comment.id] ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'}`}
                onClick={() => handleLike(comment.id)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{likesCount}</span>
              </button>
              
              <button 
                className={`flex items-center gap-1 ${dislikedComments[comment.id] ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
                onClick={() => handleDislike(comment.id)}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{dislikesCount}</span>
              </button>
              
              <button 
                className="flex items-center gap-1 text-gray-500 hover:text-primary-600"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <Reply className="h-4 w-4" />
                <span>{t("blog.reply")}</span>
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-700">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                    <Flag className="h-4 w-4" />
                    <span>{t("common.report")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Reply Form */}
            <AnimatePresence>
              {replyingTo === comment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || ""} />
                      <AvatarFallback className="bg-primary-100 text-primary-600">
                        {user?.first_name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder={`Reply to ${comment.author?.first_name || "this comment"}...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="min-h-[80px] mb-2"
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText("");
                          }}
                        >
                          {t("common.cancel")}
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={!replyText.trim() || createCommentMutation.isPending}
                        >
                          {createCommentMutation.isPending ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              {t("common.sending")}
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              {t("blog.reply")}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-primary-600" />
        <h3 className="text-xl font-bold text-gray-900">
          {t("blog.comments")} ({comments.length})
        </h3>
      </div>
      
      {/* Add Comment Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar || ""} />
              <AvatarFallback className="bg-primary-100 text-primary-600">
                {user?.first_name?.[0] || "G"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder={isAuthenticated ? t("blog.addComment") : "Sign in to comment..."}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-[100px] resize-none"
                disabled={!isAuthenticated}
              />
              
              {!isAuthenticated && (
                <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-2 rounded">
                  <AlertCircle className="h-4 w-4" />
                  <span>You need to sign in to comment</span>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={!commentText.trim() || createCommentMutation.isPending || !isAuthenticated}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  {createCommentMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t("common.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t("blog.postComment")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">{t("blog.noComments")}</p>
          <p className="text-gray-400 text-sm mt-1">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {Object.values(commentThreads).map((thread: any) => (
              <div key={thread.comment?.id || `thread-${Math.random()}`} className="mb-2">
                {thread.comment && renderComment(thread.comment)}
                {thread.replies.map((reply: any) => renderComment(reply, true))}
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};