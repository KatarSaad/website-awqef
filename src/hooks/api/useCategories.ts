"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "@/api/generated/services/CategoryService";
import { CreateCategoryDto } from "@/api/generated/models/CreateCategoryDto";
import { handleApiError } from "@/lib/api-client";

const categoriesApi = {
  getAllCategories: async () => {
    try {
      const response = await CategoryService.categoryControllerListCategories();
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { data: [], success: false, message: handleApiError(error) };
    }
  },

  getCategoryById: async (id: number) => {
    try {
      const response = await CategoryService.categoryControllerGetCategory(id);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching category:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  createCategory: async (data: CreateCategoryDto) => {
    try {
      // No slug in CreateCategoryDto, just pass data as is
      const response = await CategoryService.categoryControllerCreateCategory(
        data
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating category:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  deleteCategory: async (id: number) => {
    try {
      await CategoryService.categoryControllerDeleteCategory(id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting category:", error);
      return { success: false, message: handleApiError(error) };
    }
  },
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoriesApi.getAllCategories,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDto) => categoriesApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => categoriesApi.getCategoryById(id),
    enabled: !!id,
  });
};
