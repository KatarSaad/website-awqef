/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectDto } from "../models/CreateProjectDto";
import type { PaginatedResponseDto } from "../models/PaginatedResponseDto";
import type { ProjectResponseDto } from "../models/ProjectResponseDto";
import type { UpdateProjectDto } from "../models/UpdateProjectDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class ProjectService {
  /**
   * Create a new project
   * @param requestBody
   * @returns ProjectResponseDto Project created
   * @throws ApiError
   */
  public static projectControllerCreate(
    requestBody: CreateProjectDto
  ): CancelablePromise<ProjectResponseDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/v1/project",
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * List all projects (paginated)
   * @param page Page number (default 1)
   * @param limit Items per page (default 10)
   * @returns PaginatedResponseDto
   * @throws ApiError
   */
  public static projectControllerListProjects(
    page?: number,
    limit?: number
  ): CancelablePromise<PaginatedResponseDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v1/project",
      query: {
        page: page,
        limit: limit,
      },
    });
  }
  /**
   * Get project by ID
   * @param id
   * @returns ProjectResponseDto
   * @throws ApiError
   */
  public static projectControllerGetProject(
    id: number
  ): CancelablePromise<ProjectResponseDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v1/project/{id}",
      path: {
        id: id,
      },
    });
  }
  /**
   * Update a project
   * @param id
   * @param requestBody
   * @returns ProjectResponseDto
   * @throws ApiError
   */
  public static projectControllerUpdateProject(
    id: number,
    requestBody: UpdateProjectDto
  ): CancelablePromise<ProjectResponseDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/v1/project/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
  /**
   * Delete (soft) a project
   * @param id
   * @returns ProjectResponseDto
   * @throws ApiError
   */
  public static projectControllerDeleteProject(
    id: number
  ): CancelablePromise<ProjectResponseDto> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/v1/project/{id}",
      path: {
        id: id,
      },
    });
  }
}
