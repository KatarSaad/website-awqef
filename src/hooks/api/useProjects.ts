"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectService } from "@/api/generated/services/ProjectService";
import { CreateProjectDto, UpdateProjectDto } from "@/api/generated";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => ProjectService.projectControllerListProjects(),
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => ProjectService.projectControllerGetProject(id),
    enabled: !!id,
  });
};

export const useFullProject = (id: number) => {
  return useQuery({
    queryKey: ["fullProject", id],
    queryFn: () => ProjectService.projectControllerGetProject(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectDto) =>
      ProjectService.projectControllerCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProjectDto }) =>
      ProjectService.projectControllerUpdateProject(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      queryClient.invalidateQueries({ queryKey: ["fullProject", id] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      ProjectService.projectControllerDeleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

// Paginated, filterable, and searchable projects
export const usePaginatedProjects = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["projects", page, limit],
    queryFn: () => ProjectService.projectControllerListProjects(page, limit),
  });
};
