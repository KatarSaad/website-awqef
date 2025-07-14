"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentService } from "@/api/generated/services/ContentService";
import {
  CreatePostDto,
  UpdatePostDto,
  PostResponseDto,
} from "@/api/generated/models";
import { CreateWebsiteCommentDto } from "@/api/generated/models/CreateWebsiteCommentDto";
import { CreateRatingDto } from "@/api/generated/models/CreateRatingDto";

import { toast } from "sonner";

// Query keys
export const contentKeys = {
  all: ["content"] as const,
  posts: () => [...contentKeys.all, "posts"] as const,
  post: (id: number) => [...contentKeys.posts(), id] as const,
  postBySlug: (slug: string) => [...contentKeys.posts(), "slug", slug] as const,
  comments: (postId: number) =>
    [...contentKeys.all, "comments", postId] as const,
  ratings: (postId: number) => [...contentKeys.all, "ratings", postId] as const,
};

// Get all posts with pagination and search
export const usePosts = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: [...contentKeys.posts(), page, limit, search],
    queryFn: () =>
      ContentService.contentControllerListPosts(page, limit, search),
    keepPreviousData: true,
  });
};

// Get post by ID
export const usePost = (id: number) => {
  return useQuery({
    queryKey: contentKeys.post(id),
    queryFn: () => ContentService.contentControllerGetPost(id),
    enabled: !!id,
  });
};

// Get post by slug
export const usePostBySlug = (slug: string) => {
  return useQuery({
    queryKey: contentKeys.postBySlug(slug),
    queryFn: async () => {
      const response = await ContentService.contentControllerListPosts(
        1,
        100,
        ""
      );
      const posts = response?.data || [];
      return posts.find((post: PostResponseDto) => post.slug === slug) || null;
    },
    enabled: !!slug,
  });
};

// Create post mutation
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostDto) =>
      ContentService.contentControllerCreatePost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.posts() });
      toast.success("Post created successfully");
    },
    onError: (error) => {
      console.error("Create post error:", error);
      toast.error("Failed to create post");
    },
  });
};

// Update post mutation
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostDto }) =>
      ContentService.contentControllerUpdatePost(id, data),
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: contentKeys.post(id) });
      queryClient.invalidateQueries({ queryKey: contentKeys.posts() });
      toast.success("Post updated successfully");
    },
    onError: (error) => {
      console.error("Update post error:", error);
      toast.error("Failed to update post");
    },
  });
};

// Delete post mutation
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ContentService.contentControllerDeletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.posts() });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      console.error("Delete post error:", error);
      toast.error("Failed to delete post");
    },
  });
};

// Comments
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      ContentService.contentControllerCreateWebsiteComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      console.error("Create comment error:", error);
      toast.error("Failed to add comment");
    },
  });
};

// Ratings
export const useRatingsForPost = (postId: number) => {
  return useQuery({
    queryKey: contentKeys.ratings(postId),
    queryFn: () => ContentService.contentControllerGetRating(postId),
    enabled: !!postId,
  });
};

export const useCreateRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRatingDto) =>
      ContentService.contentControllerCreateRating(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
      toast.success("Rating added successfully");
    },
    onError: (error) => {
      console.error("Create rating error:", error);
      toast.error("Failed to add rating");
    },
  });
};

// Share logs
export const useCreateShare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      ContentService.contentControllerCreateShareLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contentKeys.all });
      toast.success("Share logged successfully");
    },
    onError: (error) => {
      console.error("Create share error:", error);
      toast.error("Failed to log share");
    },
  });
};
