/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePledgeDto } from '../models/CreatePledgeDto';
import type { PledgeResponseDto } from '../models/PledgeResponseDto';
import type { UpdatePledgeDto } from '../models/UpdatePledgeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PledgesService {
    /**
     * List pledges for a project
     * @param projectId
     * @returns PledgeResponseDto
     * @throws ApiError
     */
    public static pledgeControllerListPledges(
        projectId: number,
    ): CancelablePromise<Array<PledgeResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/pledges/{projectId}',
            path: {
                'projectId': projectId,
            },
        });
    }
    /**
     * Create a pledge
     * @param projectId
     * @param requestBody
     * @returns PledgeResponseDto
     * @throws ApiError
     */
    public static pledgeControllerCreatePledge(
        projectId: number,
        requestBody: CreatePledgeDto,
    ): CancelablePromise<PledgeResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/pledges/{projectId}',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get pledge by ID
     * @param id
     * @returns PledgeResponseDto
     * @throws ApiError
     */
    public static pledgeControllerGetPledge(
        id: number,
    ): CancelablePromise<PledgeResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/pledges/pledge/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a pledge
     * @param id
     * @param requestBody
     * @returns PledgeResponseDto
     * @throws ApiError
     */
    public static pledgeControllerUpdatePledge(
        id: number,
        requestBody: UpdatePledgeDto,
    ): CancelablePromise<PledgeResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/pledges/pledge/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete (soft) a pledge
     * @param id
     * @returns PledgeResponseDto
     * @throws ApiError
     */
    public static pledgeControllerDeletePledge(
        id: number,
    ): CancelablePromise<PledgeResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/pledges/pledge/{id}',
            path: {
                'id': id,
            },
        });
    }
}
