"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { InvestmentsService } from "@/api/generated/services/InvestmentsService";
import type { CreateInvestmentDto } from "@/api/generated/models/CreateInvestmentDto";
import type { UpdateInvestmentDto } from "@/api/generated/models/UpdateInvestmentDto";
import { handleApiError } from "@/lib/api-client";

const investmentsApi = {
  // All investment endpoints require projectId for list/create, id for get/update/delete
  getAllInvestments: async (projectId: number) => {
    try {
      const response =
        await InvestmentsService.investmentControllerListInvestments(projectId);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching investments:", error);
      return { data: [], success: false, message: handleApiError(error) };
    }
  },

  getInvestmentById: async (id: number) => {
    try {
      const response =
        await InvestmentsService.investmentControllerGetInvestment(id);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching investment:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  createInvestment: async (projectId: number, data: CreateInvestmentDto) => {
    try {
      const response =
        await InvestmentsService.investmentControllerCreateInvestment(
          projectId,
          data
        );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating investment:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  updateInvestment: async (id: number, data: UpdateInvestmentDto) => {
    try {
      const response =
        await InvestmentsService.investmentControllerUpdateInvestment(id, data);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error updating investment:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  deleteInvestment: async (id: number) => {
    try {
      await InvestmentsService.investmentControllerDeleteInvestment(id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting investment:", error);
      return { success: false, message: handleApiError(error) };
    }
  },
};

// Require projectId for all investment queries
export const useInvestments = (projectId: number) => {
  return useQuery({
    queryKey: ["investments", projectId],
    queryFn: () =>
      InvestmentsService.investmentControllerListInvestments(projectId),
    enabled: !!projectId,
  });
};

export const useInvestment = (id: number) => {
  return useQuery({
    queryKey: ["investment", id],
    queryFn: () => InvestmentsService.investmentControllerGetInvestment(id),
    enabled: !!id,
  });
};

// Require projectId for create
export const useCreateInvestment = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvestmentDto) =>
      InvestmentsService.investmentControllerCreateInvestment(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments", projectId] });
    },
  });
};

export const useUpdateInvestment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateInvestmentDto }) =>
      investmentsApi.updateInvestment(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      queryClient.invalidateQueries({ queryKey: ["investment", id] });
    },
  });
};

export const useDeleteInvestment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => investmentsApi.deleteInvestment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
    },
  });
};
