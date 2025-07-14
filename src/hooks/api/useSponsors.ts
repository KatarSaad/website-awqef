"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SponsorsService } from "@/api/generated/services/SponsorsService";
import type { SponsorResponseDto } from "@/api/generated/models/SponsorResponseDto";
import type { CreateSponsorDto } from "@/api/generated/models/CreateSponsorDto";
import { handleApiError } from "@/lib/api-client";

// All sponsor endpoints require a projectId
const sponsorsApi = {
  getAllSponsors: async (projectId: number) => {
    try {
      const response = await SponsorsService.sponsorControllerListSponsors(
        projectId
      );
      return { data: response, success: true };
    } catch (error) {
      return { data: [], success: false, message: handleApiError(error) };
    }
  },
  getSponsorById: async (id: number) => {
    try {
      const response = await SponsorsService.sponsorControllerGetSponsor(id);
      return { data: response, success: true };
    } catch (error) {
      return { data: null, success: false, message: handleApiError(error) };
    }
  },
  createSponsor: async (projectId: number, data: CreateSponsorDto) => {
    try {
      const response = await SponsorsService.sponsorControllerCreateSponsor(
        projectId,
        data
      );
      return { data: response, success: true };
    } catch (error) {
      return { data: null, success: false, message: handleApiError(error) };
    }
  },
  deleteSponsor: async (id: number) => {
    try {
      await SponsorsService.sponsorControllerDeleteSponsor(id);
      return { success: true };
    } catch (error) {
      return { success: false, message: handleApiError(error) };
    }
  },
};

// Require projectId for all sponsor queries
export const useSponsors = (projectId: number) => {
  return useQuery<{
    data: SponsorResponseDto[];
    success: boolean;
    message?: string;
  }>({
    queryKey: ["sponsors", projectId],
    queryFn: () => sponsorsApi.getAllSponsors(projectId),
    enabled: !!projectId,
  });
};

export const useSponsor = (id: number) => {
  return useQuery<{
    data: SponsorResponseDto | null;
    success: boolean;
    message?: string;
  }>({
    queryKey: ["sponsor", id],
    queryFn: () => sponsorsApi.getSponsorById(id),
    enabled: !!id,
  });
};

// Require projectId for create
export const useCreateSponsor = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSponsorDto) =>
      sponsorsApi.createSponsor(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsors", projectId] });
    },
  });
};

export const useDeleteSponsor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => sponsorsApi.deleteSponsor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsors"] });
    },
  });
};
