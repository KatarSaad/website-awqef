/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectDto } from '../models/CreateProjectDto';
import type { UpdateProjectDto } from '../models/UpdateProjectDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProjectsService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static projectsControllerCreate(
        requestBody: CreateProjectDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/backoffice/projects',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static projectsControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/projects',
        });
    }
    /**
     * @param pubkey
     * @returns any
     * @throws ApiError
     */
    public static projectsControllerFindOne(
        pubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/projects/{pubkey}',
            path: {
                'pubkey': pubkey,
            },
        });
    }
    /**
     * @param pubkey
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static projectsControllerUpdate(
        pubkey: string,
        requestBody: UpdateProjectDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/backoffice/projects/{pubkey}',
            path: {
                'pubkey': pubkey,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param pubkey
     * @returns any
     * @throws ApiError
     */
    public static projectsControllerRemove(
        pubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/backoffice/projects/{pubkey}',
            path: {
                'pubkey': pubkey,
            },
        });
    }
}
