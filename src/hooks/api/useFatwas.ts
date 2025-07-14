"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FatwasService } from "@/api/generated/services/FatwasService";
import type { CreateFatwaDto } from "@/api/generated/models/CreateFatwaDto";
import type { UpdateFatwaDto } from "@/api/generated/models/UpdateFatwaDto";
import { handleApiError } from "@/lib/api-client";

const fatwasApi = {
  getAllFatwas: async () => {
    try {
      const response = await FatwasService.fatwaControllerListFatwas();
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching fatwas:", error);
      return { data: [], success: false, message: handleApiError(error) };
    }
  },

  getFatwaById: async (id: number) => {
    try {
      const response = await FatwasService.fatwaControllerGetFatwa(id);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching fatwa:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  createFatwa: async (data: CreateFatwaDto) => {
    try {
      const response = await FatwasService.fatwaControllerCreateFatwa(data);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating fatwa:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  updateFatwa: async (id: number, data: UpdateFatwaDto) => {
    try {
      const response = await FatwasService.fatwaControllerUpdateFatwa(id, data);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error updating fatwa:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  deleteFatwa: async (id: number) => {
    try {
      await FatwasService.fatwaControllerDeleteFatwa(id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting fatwa:", error);
      return { success: false, message: handleApiError(error) };
    }
  },
};

export const useFatwas = () => {
  return useQuery({
    queryKey: ["fatwas"],
    queryFn: fatwasApi.getAllFatwas,
  });
};

export const useFatwa = (id: number) => {
  return useQuery({
    queryKey: ["fatwa", id],
    queryFn: () => fatwasApi.getFatwaById(id),
    enabled: !!id,
  });
};

export const useCreateFatwa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFatwaDto) => fatwasApi.createFatwa(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fatwas"] });
    },
  });
};

export const useUpdateFatwa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFatwaDto }) =>
      fatwasApi.updateFatwa(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["fatwas"] });
      queryClient.invalidateQueries({ queryKey: ["fatwa", id] });
    },
  });
};

export const useDeleteFatwa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => fatwasApi.deleteFatwa(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fatwas"] });
    },
  });
};
