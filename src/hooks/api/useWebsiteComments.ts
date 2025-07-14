import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentService } from "@/api/generated/services/ContentService";
import type { CreateWebsiteCommentDto } from "@/api/generated/models/CreateWebsiteCommentDto";
import { handleApiError } from "@/lib/api-client";

export const useCreateWebsiteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWebsiteCommentDto) =>
      ContentService.contentControllerCreateWebsiteComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["websiteComments"] });
    },
    onError: handleApiError,
  });
};
