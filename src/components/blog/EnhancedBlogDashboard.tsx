"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePosts, useDeletePost } from "@/hooks/api/useContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  BarChart, 
  FileText, 
  Filter,
  Calendar,
  MessageCircle,
  Heart,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreHorizontal
} from "lucide-react";
import { PostEditor } from "./PostEditor";
import { PostAnalytics } from "./PostAnalytics";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export const EnhancedBlogDashboard: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [viewingAnalytics, setViewingAnalytics] = useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  
  const { data: postsData, isLoading, error } = usePosts(currentPage, 10, searchTerm);
  const deletePostMutation = useDeletePost();

  const filteredPosts = React.useMemo(() => {
    if (!postsData?.data) return [];
    
    let posts = [...postsData.data];
    
    switch (activeTab) {
      case "published":
        return posts.filter(post => post.publishedAt);
      case "drafts":
        return posts.filter(post => !post.publishedAt);
      case "featured":
        return posts.filter(post => post.isFeatured);
      default: // all
        return posts;
    }
  }, [postsData?.data, activeTab]);

  const handleDeletePost = async (id: number) => {
    try {
      await deletePostMutation.mutateAsync(id);
      setDeleteConfirmId(null);
      toast.success(t("blog.postDeleted"));
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error(t("blog.deleteError"));
    }
  };

  const getPostStatusBadge = (post: any) => {
    if (!post.publishedAt) {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
          <Clock className="mr-1 h-3 w-3" />
          {t("blog.draft")}
        </Badge>
      );
    }
    
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        <CheckCircle className="mr-1 h-3 w-3" />
        {t("blog.published")}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field.en || Object.values(field)[0] || "";
  };

  return (
    <div className="w-full" dir={isRTL ? "rtl" : "ltr"}>
      {/* Editor Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("blog.createPost")}</DialogTitle>
          </DialogHeader>
          <PostEditor 
            onSave={() => setIsCreating(false)} 
            onCancel={() => setIsCreating(false)} 
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("blog.editPost")}</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <PostEditor 
              post={editingPost} 
              onSave={() => setEditingPost(null)} 
              onCancel={() => setEditingPost(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Analytics Dialog */}
      <Dialog open={!!viewingAnalytics} onOpenChange={() => setViewingAnalytics(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t("blog.analytics.title")}</DialogTitle>
          </DialogHeader>
          {viewingAnalytics && (
            <PostAnalytics postId={viewingAnalytics.id} />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("common.delete")}</DialogTitle>
            <DialogDescription>
              {t("blog.deleteConfirmation")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              {t("common.cancel")}
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteConfirmId && handleDeletePost(deleteConfirmId)}
              disabled={deletePostMutation.isPending}
            >
              {deletePostMutation.isPending ? t("common.deleting") : t("common.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("blog.dashboard.title")}</h1>
          <p className="text-gray-500">{t("blog.dashboard.subtitle")}</p>
        </div>
        
        <Button onClick={() => setIsCreating(true)} className="bg-primary-600 hover:bg-primary-700">
          <Plus className="mr-2 h-4 w-4" />
          {t("blog.createPost")}
        </Button>
      </div>
      
      {/* Filters and Tabs */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t("blog.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4 mr-2" />
              {t("blog.allPosts")}
            </TabsTrigger>
            <TabsTrigger value="published" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              {t("blog.published")}
            </TabsTrigger>
            <TabsTrigger value="drafts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Clock className="h-4 w-4 mr-2" />
              {t("blog.drafts")}
            </TabsTrigger>
            <TabsTrigger value="featured" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Heart className="h-4 w-4 mr-2" />
              {t("blog.featured")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}
      
      {/* Error State */}
      {error && !isLoading && (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">{t("common.error")}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            {t("common.tryAgain")}
          </Button>
        </div>
      )}
      
      {/* Empty State */}
      {!isLoading && !error && filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">{t("blog.noPosts")}</p>
          <Button 
            onClick={() => setIsCreating(true)}
            className="mt-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t("blog.createPost")}
          </Button>
        </div>
      )}
      
      {/* Posts Table */}
      {!isLoading && !error && filteredPosts.length > 0 && (
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">{t("blog.title")}</TableHead>
                <TableHead>{t("blog.status")}</TableHead>
                <TableHead>{t("blog.category")}</TableHead>
                <TableHead className="text-center">{t("blog.views")}</TableHead>
                <TableHead className="text-center">{t("blog.comments")}</TableHead>
                <TableHead>{t("blog.created")}</TableHead>
                <TableHead className="text-right">{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {post.featuredImage ? (
                        <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                          <img 
                            src={post.featuredImage} 
                            alt={getTranslatedText(post.title)} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      <div className="truncate">
                        <div className="font-medium truncate">{getTranslatedText(post.title)}</div>
                        <div className="text-xs text-gray-500 truncate">{post.slug}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getPostStatusBadge(post)}</TableCell>
                  <TableCell>
                    {post.category ? (
                      <Badge variant="outline" className="bg-gray-50">
                        {getTranslatedText(post.category.name)}
                      </Badge>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">{post.views || 0}</TableCell>
                  <TableCell className="text-center">{post.comments?.length || 0}</TableCell>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => window.open(`/blog/${post.slug || post.id}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setViewingAnalytics(post)}
                      >
                        <BarChart className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{t("common.actions")}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setEditingPost(post)}>
                            <Edit className="mr-2 h-4 w-4" />
                            {t("common.edit")}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600" 
                            onClick={() => setDeleteConfirmId(post.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t("common.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          {postsData && postsData.total > 10 && (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="text-sm text-gray-500">
                {t("blog.showing")} {(currentPage - 1) * 10 + 1}-
                {Math.min(currentPage * 10, postsData.total)} {t("blog.of")} {postsData.total}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  {t("common.previous")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage * 10 >= postsData.total}
                >
                  {t("common.next")}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};