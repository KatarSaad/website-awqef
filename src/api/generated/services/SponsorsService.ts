/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSponsorDto } from '../models/CreateSponsorDto';
import type { SponsorResponseDto } from '../models/SponsorResponseDto';
import type { UpdateSponsorDto } from '../models/UpdateSponsorDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SponsorsService {
    /**
     * List sponsors for a project
     * @param projectId
     * @returns SponsorResponseDto
     * @throws ApiError
     */
    public static sponsorControllerListSponsors(
        projectId: number,
    ): CancelablePromise<Array<SponsorResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/sponsors/{projectId}',
            path: {
                'projectId': projectId,
            },
        });
    }
    /**
     * Create a sponsor
     * @param projectId
     * @param requestBody
     * @returns SponsorResponseDto
     * @throws ApiError
     */
    public static sponsorControllerCreateSponsor(
        projectId: number,
        requestBody: CreateSponsorDto,
    ): CancelablePromise<SponsorResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/sponsors/{projectId}',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get sponsor by ID
     * @param id
     * @returns SponsorResponseDto
     * @throws ApiError
     */
    public static sponsorControllerGetSponsor(
        id: number,
    ): CancelablePromise<SponsorResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/sponsors/sponsor/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a sponsor
     * @param id
     * @param requestBody
     * @returns SponsorResponseDto
     * @throws ApiError
     */
    public static sponsorControllerUpdateSponsor(
        id: number,
        requestBody: UpdateSponsorDto,
    ): CancelablePromise<SponsorResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/sponsors/sponsor/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete (soft) a sponsor
     * @param id
     * @returns SponsorResponseDto
     * @throws ApiError
     */
    public static sponsorControllerDeleteSponsor(
        id: number,
    ): CancelablePromise<SponsorResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/sponsors/sponsor/{id}',
            path: {
                'id': id,
            },
        });
    }
}
