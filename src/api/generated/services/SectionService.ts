/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSectionDto } from '../models/CreateSectionDto';
import type { SectionResponseDto } from '../models/SectionResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SectionService {
    /**
     * List all sections
     * @returns SectionResponseDto
     * @throws ApiError
     */
    public static sectionControllerListSections(): CancelablePromise<Array<SectionResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/section',
        });
    }
    /**
     * Create a section
     * @param requestBody
     * @returns SectionResponseDto
     * @throws ApiError
     */
    public static sectionControllerCreateSection(
        requestBody: CreateSectionDto,
    ): CancelablePromise<SectionResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/section',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get section by ID
     * @param id
     * @returns SectionResponseDto
     * @throws ApiError
     */
    public static sectionControllerGetSection(
        id: number,
    ): CancelablePromise<SectionResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/section/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete a section
     * @param id
     * @returns SectionResponseDto
     * @throws ApiError
     */
    public static sectionControllerDeleteSection(
        id: number,
    ): CancelablePromise<SectionResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/section/{id}',
            path: {
                'id': id,
            },
        });
    }
}
