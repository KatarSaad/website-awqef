import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Pledge } from "@/api/generated";
import { apiClient } from "@/lib/api-client";

export const usePledges = () => {
  return useQuery({
    queryKey: ["pledges", projectId],
    queryFn: async () => {
      const endpoint = projectId
        ? `/pledges?projectId=${projectId}`
        : "/pledges";
      return apiClient.get<Pledge[]>(endpoint);
    },
  });
};

export const usePledge = (id: string) => {
  return useQuery({
    queryKey: ["pledge", id],
    queryFn: async () => {
      return apiClient.get<Pledge>(`/pledges/${id}`);
    },
    enabled: !!id,
  });
};

export const useCreatePledge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Pledge>) => {
      return apiClient.post<Pledge>("/pledges", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pledges"] });
      toast.success("Pledge created successfully");
    },
    onError: (error) => {
      console.error("Error creating pledge:", error);
      toast.error("Failed to create pledge");
    },
  });
};

export const useUpdatePledge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Pledge> }) => {
      return apiClient.put<Pledge>(`/pledges/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pledges"] });
      toast.success("Pledge updated successfully");
    },
    onError: (error) => {
      console.error("Error updating pledge:", error);
      toast.error("Failed to update pledge");
    },
  });
};

export const useDeletePledge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return apiClient.delete(`/pledges/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pledges"] });
      toast.success("Pledge deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting pledge:", error);
      toast.error("Failed to delete pledge");
    },
  });
};
