import {
  ProjectService,
  CreateProjectDto,
  UpdateProjectDto,
} from "@/api/generated";
import { handleApiError } from "@/lib/api-client";

export const projectsApi = {
  // Get all projects
  getAllProjects: async () => {
    try {
      const response = await ProjectService.projectControllerFindAll();
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching projects:", error);
      return { data: [], success: false, message: handleApiError(error) };
    }
  },

  // Get project by ID
  getProjectById: async (id: number) => {
    try {
      const response = await ProjectService.projectControllerFindOne(
        id.toString()
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching project:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  // Get full project with all details
  getFullProject: async (id: number) => {
    try {
      const response = await ProjectService.projectControllerGetFullProject(
        id.toString()
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching full project:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  // Create new project
  createProject: async (data: CreateProjectDto) => {
    try {
      const response = await ProjectService.projectControllerCreate(data);
      return { data: response, success: true };
    } catch (error) {
      console.error("Error creating project:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  // Update project
  updateProject: async (id: number, data: UpdateProjectDto) => {
    try {
      const response = await ProjectService.projectControllerUpdate(
        id.toString(),
        data
      );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error updating project:", error);
      return { data: null, success: false, message: handleApiError(error) };
    }
  },

  // Delete project
  deleteProject: async (id: number) => {
    try {
      await ProjectService.projectControllerRemove(id.toString());
      return { success: true };
    } catch (error) {
      console.error("Error deleting project:", error);
      return { success: false, message: handleApiError(error) };
    }
  },

  // Get projects by organization
  getProjectsByOrganization: async (organizationId: number) => {
    try {
      const response =
        await ProjectService.projectControllerListProjectsByOrganization(
          organizationId.toString()
        );
      return { data: response, success: true };
    } catch (error) {
      console.error("Error fetching organization projects:", error);
      return { data: [], success: false, message: handleApiError(error) };
    }
  },
};
