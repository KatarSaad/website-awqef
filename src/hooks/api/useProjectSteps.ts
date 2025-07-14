import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectStepsService } from "@/api/generated/services/ProjectStepsService";
import type { CreateProjectStepDto } from "@/api/generated/models/CreateProjectStepDto";
import { handleApiError } from "@/lib/api-client";

export const useCreateProjectStep = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectStepDto) =>
      ProjectStepsService.projectStepControllerCreateProjectStep(
        projectId,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectSteps", projectId] });
    },
    onError: handleApiError,
  });
};
