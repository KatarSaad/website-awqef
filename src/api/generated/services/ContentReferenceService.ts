/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContentReferenceResponseDto } from '../models/ContentReferenceResponseDto';
import type { CreateContentReferenceDto } from '../models/CreateContentReferenceDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ContentReferenceService {
    /**
     * List all content references
     * @returns ContentReferenceResponseDto
     * @throws ApiError
     */
    public static contentReferenceControllerListContentReferences(): CancelablePromise<Array<ContentReferenceResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/content-reference',
        });
    }
    /**
     * Create a content reference
     * @param requestBody
     * @returns ContentReferenceResponseDto
     * @throws ApiError
     */
    public static contentReferenceControllerCreateContentReference(
        requestBody: CreateContentReferenceDto,
    ): CancelablePromise<ContentReferenceResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/content-reference',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get content reference by ID
     * @param id
     * @returns ContentReferenceResponseDto
     * @throws ApiError
     */
    public static contentReferenceControllerGetContentReference(
        id: number,
    ): CancelablePromise<ContentReferenceResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/content-reference/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete a content reference
     * @param id
     * @returns ContentReferenceResponseDto
     * @throws ApiError
     */
    public static contentReferenceControllerDeleteContentReference(
        id: number,
    ): CancelablePromise<ContentReferenceResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/content-reference/{id}',
            path: {
                'id': id,
            },
        });
    }
}
