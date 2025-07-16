/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWebsiteOrganizationDto } from '../models/CreateWebsiteOrganizationDto';
import type { UpdateWebsiteOrganizationDto } from '../models/UpdateWebsiteOrganizationDto';
import type { WebsiteOrganizationResponseDto } from '../models/WebsiteOrganizationResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebsiteOrganizationsService {
    /**
     * List all website organizations
     * @returns WebsiteOrganizationResponseDto
     * @throws ApiError
     */
    public static websiteOrganizationControllerListWebsiteOrganizations(): CancelablePromise<Array<WebsiteOrganizationResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/website-organizations',
        });
    }
    /**
     * Create a website organization
     * @param requestBody
     * @returns WebsiteOrganizationResponseDto
     * @throws ApiError
     */
    public static websiteOrganizationControllerCreateWebsiteOrganization(
        requestBody: CreateWebsiteOrganizationDto,
    ): CancelablePromise<WebsiteOrganizationResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/website-organizations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get website organization by ID
     * @param id
     * @returns WebsiteOrganizationResponseDto
     * @throws ApiError
     */
    public static websiteOrganizationControllerGetWebsiteOrganization(
        id: number,
    ): CancelablePromise<WebsiteOrganizationResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/website-organizations/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a website organization
     * @param id
     * @param requestBody
     * @returns WebsiteOrganizationResponseDto
     * @throws ApiError
     */
    public static websiteOrganizationControllerUpdateWebsiteOrganization(
        id: number,
        requestBody: UpdateWebsiteOrganizationDto,
    ): CancelablePromise<WebsiteOrganizationResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/website-organizations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete (soft) a website organization
     * @param id
     * @returns WebsiteOrganizationResponseDto
     * @throws ApiError
     */
    public static websiteOrganizationControllerDeleteWebsiteOrganization(
        id: number,
    ): CancelablePromise<WebsiteOrganizationResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/website-organizations/{id}',
            path: {
                'id': id,
            },
        });
    }
}
