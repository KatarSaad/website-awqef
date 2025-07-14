import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentReferenceService } from "@/api/generated/services/ContentReferenceService";
import type { CreateContentReferenceDto } from "@/api/generated/models/CreateContentReferenceDto";
import { handleApiError } from "@/lib/api-client";

export const useCreateContentReference = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateContentReferenceDto) =>
      ContentReferenceService.contentReferenceControllerCreateContentReference(
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contentReferences"] });
    },
    onError: handleApiError,
  });
};
