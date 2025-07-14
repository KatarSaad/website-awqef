"use client";

import React, { useState } from "react";

// Helper to get translated text from a field that may be a TranslationDto or string
function getTranslatedText(field: any, lang: string = "en") {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    return field[lang] || field[Object.keys(field)[0]] || "";
  }
  return "";
}
import { useQuery } from "@tanstack/react-query";
import { ContentService } from "@/api/generated/services/ContentService";
import { CategoryService } from "@/api/generated/services/CategoryService";
import { PostResponseDto } from "@/api/generated/models/PostResponseDto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash,
  Eye,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  useCreatePost,
  useDeletePost,
  useUpdatePost,
} from "@/hooks/api/useContent";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminContentPosts() {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState<PostResponseDto | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Fetch posts with pagination and search
  const { data: postsData, isLoading } = useQuery({
    queryKey: ["admin", "posts", page, limit, search],
    queryFn: () =>
      ContentService.contentControllerListPosts(page, limit, search),
  });

  // Fetch categories for filtering and post creation/editing
  const { data: categoriesData } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => CategoryService.categoryControllerListCategories(),
  });

  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();

  const handleCreatePost = (postData: any) => {
    createPostMutation.mutate(postData, {
      onSuccess: () => {
        setIsCreating(false);
        toast.success("Post created successfully");
      },
    });
  };

  const handleUpdatePost = (postData: any) => {
    if (!selectedPost?.id) return;

    updatePostMutation.mutate(
      { id: selectedPost.id, data: postData },
      {
        onSuccess: () => {
          setIsEditing(false);
          setSelectedPost(null);
          toast.success("Post updated successfully");
        },
      }
    );
  };

  const handleDeletePost = (id: number) => {
    deletePostMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
      },
    });
  };

  const posts = postsData?.data || [];
  const totalPosts = postsData?.meta?.total || 0;
  const totalPages = postsData?.meta?.totalPages || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("admin.sidebar.posts")}
        </h1>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t("admin.posts.newPost")}
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("admin.posts.searchPosts")}
            className="pl-8 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> {t("common.filter")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t("common.filter")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("admin.posts.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.all")}</SelectItem>
                  <SelectItem value="published">
                    {t("admin.posts.publishedPosts")}
                  </SelectItem>
                  <SelectItem value="draft">
                    {t("admin.posts.draftPosts")}
                  </SelectItem>
                  <SelectItem value="archived">
                    {t("admin.posts.archivedPosts")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("admin.posts.category")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.all")}</SelectItem>
                  {categoriesData?.map((category: any) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {getTranslatedText(category.name, language) ||
                        t("admin.posts.category")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
          <TabsTrigger value="published">
            {t("admin.posts.publishedPosts")}
          </TabsTrigger>
          <TabsTrigger value="draft">{t("admin.posts.draftPosts")}</TabsTrigger>
          <TabsTrigger value="archived">
            {t("admin.posts.archivedPosts")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.posts.title")}</TableHead>
                  <TableHead>{t("admin.posts.category")}</TableHead>
                  <TableHead>{t("admin.posts.status")}</TableHead>
                  <TableHead>{t("admin.posts.date")}</TableHead>
                  <TableHead className="text-right">
                    {t("admin.posts.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      {t("admin.posts.noPosts")}
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post: PostResponseDto) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate max-w-[300px]">
                            {getTranslatedText(post.title, language) ||
                              t("admin.posts.title")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTranslatedText(post.category?.name, language) ||
                          "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            post.publishedAt
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          }
                        >
                          {post.publishedAt
                            ? t("admin.posts.publishedPosts")
                            : t("admin.posts.draftPosts")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">
                                {t("common.actions")}
                              </span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                window.open(`/blog/${post.slug}`, "_blank")
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />{" "}
                              {t("common.view")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedPost(post);
                                setIsEditing(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />{" "}
                              {t("common.edit")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />{" "}
                              {t("common.delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              {t("admin.posts.showing")} {posts.length} {t("admin.posts.of")}{" "}
              {totalPosts} {t("admin.posts.posts")}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                {t("admin.posts.previous")}
              </Button>
              <div className="text-sm">
                {t("admin.posts.page")} {page} {t("admin.posts.of")}{" "}
                {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                {t("admin.posts.next")}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Other tab contents would be similar but with filtered data */}
        <TabsContent value="published" className="mt-4">
          {/* Similar table with published posts filter */}
        </TabsContent>

        <TabsContent value="draft" className="mt-4">
          {/* Similar table with draft posts filter */}
        </TabsContent>

        <TabsContent value="archived" className="mt-4">
          {/* Similar table with archived posts filter */}
        </TabsContent>
      </Tabs>

      {/* Edit Post Dialog */}
      <Dialog
        open={isEditing}
        onOpenChange={(open) => {
          if (!open) {
            setIsEditing(false);
            setSelectedPost(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.posts.editPost")}</DialogTitle>
            <DialogDescription>
              {t("admin.posts.makeChangesToPost")}
            </DialogDescription>
          </DialogHeader>

          {selectedPost && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("admin.posts.titleEnglish")}
                  </label>
                  <Input
                    defaultValue={
                      getTranslatedText(selectedPost?.title, language) || ""
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t("admin.posts.titleArabic")}
                  </label>
                  <Input
                    defaultValue={
                      getTranslatedText(selectedPost?.title, language) || ""
                    }
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("admin.posts.contentEnglish")}
                </label>
                <textarea
                  className="w-full min-h-[200px] p-2 border rounded-md"
                  defaultValue={
                    getTranslatedText(selectedPost?.content, language) || ""
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("admin.posts.contentArabic")}
                </label>
                <textarea
                  className="w-full min-h-[200px] p-2 border rounded-md"
                  defaultValue={
                    getTranslatedText(selectedPost?.content, language) || ""
                  }
                  dir="rtl"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedPost(null);
                  }}
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  onClick={() =>
                    handleUpdatePost({
                      // Form data would be collected here
                    })
                  }
                >
                  {t("common.saveChanges")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Post Dialog */}
      <Dialog
        open={isCreating}
        onOpenChange={(open) => {
          if (!open) setIsCreating(false);
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("admin.posts.createNewPost")}</DialogTitle>
            <DialogDescription>
              {t("admin.posts.fillInDetailsForNewPost")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("admin.posts.titleEnglish")}
                </label>
                <Input /* value and onChange for new post title (English) */ />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("admin.posts.titleArabic")}
                </label>
                <Input
                  dir="rtl" /* value and onChange for new post title (Arabic) */
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("admin.posts.contentEnglish")}
              </label>
              <textarea
                className="w-full min-h-[200px] p-2 border rounded-md"
                /* value and onChange for new post content (English) */
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("admin.posts.contentArabic")}
              </label>
              <textarea
                className="w-full min-h-[200px] p-2 border rounded-md"
                dir="rtl"
                /* value and onChange for new post content (Arabic) */
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                {t("common.cancel")}
              </Button>
              <Button
                onClick={() =>
                  handleCreatePost({
                    // Form data would be collected here
                  })
                }
              >
                {t("admin.posts.createPost")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
