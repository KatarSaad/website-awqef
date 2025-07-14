import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentService } from "@/api/generated";
import { handleApiError } from "@/lib/api-client";

const sectionsApi = {
  getAllSections: async () => {
    try {
      const response = await ContentService.contentControllerListSections();
      return { data: response, success: true };
    } catch (error) {
      return { data: [], success: false, message: handleApiError(error) };
    }
  },
  getSectionById: async (id: number) => {
    try {
      const response = await ContentService.contentControllerGetSection(
        id.toString()
      );
      return { data: response, success: true };
    } catch (error) {
      return { data: null, success: false, message: handleApiError(error) };
    }
  },
  // No update endpoint for Section in ContentService
};

export const useSections = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: sectionsApi.getAllSections,
  });
};

export const useSection = (id: number) => {
  return useQuery({
    queryKey: ["section", id],
    queryFn: () => sectionsApi.getSectionById(id),
    enabled: !!id,
  });
};
