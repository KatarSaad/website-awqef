/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFatwaDto } from '../models/CreateFatwaDto';
import type { FatwaResponseDto } from '../models/FatwaResponseDto';
import type { UpdateFatwaDto } from '../models/UpdateFatwaDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FatwasService {
    /**
     * List all fatwas
     * @returns FatwaResponseDto
     * @throws ApiError
     */
    public static fatwaControllerListFatwas(): CancelablePromise<Array<FatwaResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/fatwas',
        });
    }
    /**
     * Create a fatwa
     * @param requestBody
     * @returns FatwaResponseDto
     * @throws ApiError
     */
    public static fatwaControllerCreateFatwa(
        requestBody: CreateFatwaDto,
    ): CancelablePromise<FatwaResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/fatwas',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get fatwa by ID
     * @param id
     * @returns FatwaResponseDto
     * @throws ApiError
     */
    public static fatwaControllerGetFatwa(
        id: number,
    ): CancelablePromise<FatwaResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/fatwas/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a fatwa
     * @param id
     * @param requestBody
     * @returns FatwaResponseDto
     * @throws ApiError
     */
    public static fatwaControllerUpdateFatwa(
        id: number,
        requestBody: UpdateFatwaDto,
    ): CancelablePromise<FatwaResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/fatwas/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete (soft) a fatwa
     * @param id
     * @returns FatwaResponseDto
     * @throws ApiError
     */
    public static fatwaControllerDeleteFatwa(
        id: number,
    ): CancelablePromise<FatwaResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/fatwas/{id}',
            path: {
                'id': id,
            },
        });
    }
}
