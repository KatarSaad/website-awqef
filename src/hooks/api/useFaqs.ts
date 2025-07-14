import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaqService } from "@/api/generated/services/FaqService";
import type { CreateFaqDto } from "@/api/generated/models/CreateFaqDto";
import type { FaqResponseDto } from "@/api/generated/models/FaqResponseDto";
import { handleApiError } from "@/lib/api-client";

const faqsApi = {
  getAllFaqs: async () => {
    try {
      const response = await FaqService.faqControllerListFaqs();
      return { data: response, success: true };
    } catch (error) {
      return { data: [], success: false, message: handleApiError(error) };
    }
  },
  getFaqById: async (id: number) => {
    try {
      const response = await FaqService.faqControllerGetFaq(id);
      return { data: response, success: true };
    } catch (error) {
      return { data: null, success: false, message: handleApiError(error) };
    }
  },
  createFaq: async (data: CreateFaqDto) => {
    try {
      const response = await FaqService.faqControllerCreateFaq(data);
      return { data: response, success: true };
    } catch (error) {
      return { data: null, success: false, message: handleApiError(error) };
    }
  },
  deleteFaq: async (id: number) => {
    try {
      await FaqService.faqControllerDeleteFaq(id);
      return { success: true };
    } catch (error) {
      return { success: false, message: handleApiError(error) };
    }
  },
};

export const useFaqs = () => {
  return useQuery<{
    data: FaqResponseDto[];
    success: boolean;
    message?: string;
  }>({
    queryKey: ["faqs"],
    queryFn: faqsApi.getAllFaqs,
  });
};

export const useFaq = (id: number) => {
  return useQuery<{
    data: FaqResponseDto | null;
    success: boolean;
    message?: string;
  }>({
    queryKey: ["faq", id],
    queryFn: () => faqsApi.getFaqById(id),
    enabled: !!id,
  });
};

export const useCreateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateFaqDto) => faqsApi.createFaq(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => faqsApi.deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};
