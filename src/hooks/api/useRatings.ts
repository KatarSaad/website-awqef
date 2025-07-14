import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentService } from "@/api/generated/services/ContentService";
import type { CreateRatingDto } from "@/api/generated/models/CreateRatingDto";
import { handleApiError } from "@/lib/api-client";

export const useCreateRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRatingDto) =>
      ContentService.contentControllerCreateRating(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
    onError: handleApiError,
  });
};
