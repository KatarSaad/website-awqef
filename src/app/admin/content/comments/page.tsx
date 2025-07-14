"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ContentService } from "@/api/generated/services/ContentService";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  Search,
  Trash,
  Eye,
  MoreHorizontal,
  Check,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminContentComments() {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fetch comments with pagination and search
  const {
    data: commentsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin", "comments", page, limit, search, activeTab],
    queryFn: () => Websitem.contentControllerListComments(page, limit, search),
  });

  const handleApproveComment = async (id: number) => {
    try {
      await ContentService.comm(id);
      toast.success("Comment approved successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to approve comment");
      console.error(error);
    }
  };

  const handleRejectComment = async (id: number) => {
    try {
      await ContentService.contentControllerRejectComment(id);
      toast.success("Comment rejected successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to reject comment");
      console.error(error);
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await ContentService.contentControllerDeleteComment(id);
      toast.success("Comment deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error(error);
    }
  };

  const comments = commentsData?.data || [];
  const totalComments = commentsData?.meta?.total || 0;
  const totalPages = commentsData?.meta?.totalPages || 0;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const filteredComments =
    activeTab === "all"
      ? comments
      : comments.filter((comment: any) => comment.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("admin.sidebar.comments")}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("admin.ui.searchComments")}
            className="pl-8 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
          <TabsTrigger value="approved">{t("admin.ui.approved")}</TabsTrigger>
          <TabsTrigger value="pending">{t("admin.ui.pending")}</TabsTrigger>
          <TabsTrigger value="rejected">{t("admin.ui.rejected")}</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{t("admin.sidebar.comments")}</CardTitle>
              <CardDescription>{t("admin.ui.manageComments")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.ui.comment")}</TableHead>
                      <TableHead>{t("admin.ui.author")}</TableHead>
                      <TableHead>{t("admin.ui.post")}</TableHead>
                      <TableHead>{t("admin.ui.status")}</TableHead>
                      <TableHead>{t("admin.ui.date")}</TableHead>
                      <TableHead className="text-right">
                        {t("admin.ui.actions")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredComments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No comments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredComments.map((comment: any) => (
                        <TableRow key={comment.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate max-w-[200px]">
                                {comment.content}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {comment.author?.name || "Anonymous"}
                          </TableCell>
                          <TableCell>
                            <span className="truncate max-w-[150px]">
                              {comment.post?.title?.en ||
                                comment.post?.title ||
                                "Unknown Post"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getStatusBadgeClass(comment.status)}
                            >
                              {comment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {comment.createdAt
                              ? new Date(comment.createdAt).toLocaleDateString()
                              : "N/A"}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    window.open(
                                      `/blog/${comment.post?.slug}#comment-${comment.id}`,
                                      "_blank"
                                    )
                                  }
                                >
                                  <Eye className="mr-2 h-4 w-4" /> View on Post
                                </DropdownMenuItem>
                                {comment.status !== "approved" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleApproveComment(comment.id)
                                    }
                                  >
                                    <Check className="mr-2 h-4 w-4" /> Approve
                                  </DropdownMenuItem>
                                )}
                                {comment.status !== "rejected" && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleRejectComment(comment.id)
                                    }
                                  >
                                    <X className="mr-2 h-4 w-4" /> Reject
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleDeleteComment(comment.id)
                                  }
                                >
                                  <Trash className="mr-2 h-4 w-4" /> Delete
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
                  Showing {filteredComments.length} of {totalComments} comments
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <div className="text-sm">
                    Page {page} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
