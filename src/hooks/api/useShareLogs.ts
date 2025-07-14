"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ContentService } from "@/api/generated/services/ContentService";
import type { CreateShareLogDto } from "@/api/generated/models/CreateShareLogDto";

// Mock data for now - replace with actual API calls when backend is ready
const mockShareLogs = [
  {
    id: 1,
    platform: "facebook",
    postId: 1,
    userId: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    platform: "twitter",
    postId: 1,
    userId: 2,
    createdAt: new Date().toISOString(),
  },
];

const shareLogsApi = {
  getAllShareLogs: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { data: mockShareLogs, success: true };
  },

  getShareLogsByPost: async (postId: number) => {
    const shares = mockShareLogs.filter((s) => s.postId === postId);
    return { data: shares, success: true };
  },

  createShareLog: async (data: {
    platform: string;
    postId: number;
    userId?: number;
  }) => {
    const newShare = {
      id: mockShareLogs.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
    };
    mockShareLogs.push(newShare);
    return { data: newShare, success: true };
  },
};

export const useShareLogs = () => {
  return useQuery({
    queryKey: ["shareLogs"],
    queryFn: shareLogsApi.getAllShareLogs,
  });
};

export const useShareLogsByPost = (postId: number) => {
  return useQuery({
    queryKey: ["shareLogs", "post", postId],
    queryFn: () => shareLogsApi.getShareLogsByPost(postId),
    enabled: !!postId,
  });
};

export const useCreateShare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: shareLogsApi.createShareLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shareLogs"] });
      toast.success("Share logged successfully");
    },
    onError: (error) => {
      console.error("Create share error:", error);
      toast.error("Failed to log share");
    },
  });
};

export const useCreateShareLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateShareLogDto) =>
      ContentService.contentControllerCreateShareLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shareLogs"] });
      toast.success("Share logged successfully");
    },
    onError: (error) => {
      console.error("Create share error:", error);
      toast.error("Failed to log share");
    },
  });
};
