/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectStepDto } from '../models/CreateProjectStepDto';
import type { ProjectStepResponseDto } from '../models/ProjectStepResponseDto';
import type { UpdateProjectStepDto } from '../models/UpdateProjectStepDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProjectStepsService {
    /**
     * List steps for a project
     * @param projectId
     * @returns ProjectStepResponseDto
     * @throws ApiError
     */
    public static projectStepControllerListProjectSteps(
        projectId: number,
    ): CancelablePromise<Array<ProjectStepResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/project-steps/{projectId}',
            path: {
                'projectId': projectId,
            },
        });
    }
    /**
     * Create a project step
     * @param projectId
     * @param requestBody
     * @returns ProjectStepResponseDto
     * @throws ApiError
     */
    public static projectStepControllerCreateProjectStep(
        projectId: number,
        requestBody: CreateProjectStepDto,
    ): CancelablePromise<ProjectStepResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/project-steps/{projectId}',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get project step by ID
     * @param id
     * @returns ProjectStepResponseDto
     * @throws ApiError
     */
    public static projectStepControllerGetProjectStep(
        id: number,
    ): CancelablePromise<ProjectStepResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/project-steps/step/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a project step
     * @param id
     * @param requestBody
     * @returns ProjectStepResponseDto
     * @throws ApiError
     */
    public static projectStepControllerUpdateProjectStep(
        id: number,
        requestBody: UpdateProjectStepDto,
    ): CancelablePromise<ProjectStepResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/project-steps/step/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete (soft) a project step
     * @param id
     * @returns ProjectStepResponseDto
     * @throws ApiError
     */
    public static projectStepControllerDeleteProjectStep(
        id: number,
    ): CancelablePromise<ProjectStepResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/project-steps/step/{id}',
            path: {
                'id': id,
            },
        });
    }
}
