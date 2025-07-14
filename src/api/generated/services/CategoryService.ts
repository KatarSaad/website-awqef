/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryResponseDto } from '../models/CategoryResponseDto';
import type { CreateCategoryDto } from '../models/CreateCategoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoryService {
    /**
     * List all categories
     * @returns CategoryResponseDto
     * @throws ApiError
     */
    public static categoryControllerListCategories(): CancelablePromise<Array<CategoryResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/category',
        });
    }
    /**
     * Create a category
     * @param requestBody
     * @returns CategoryResponseDto
     * @throws ApiError
     */
    public static categoryControllerCreateCategory(
        requestBody: CreateCategoryDto,
    ): CancelablePromise<CategoryResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/category',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get category by ID
     * @param id
     * @returns CategoryResponseDto
     * @throws ApiError
     */
    public static categoryControllerGetCategory(
        id: number,
    ): CancelablePromise<CategoryResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/category/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete a category
     * @param id
     * @returns CategoryResponseDto
     * @throws ApiError
     */
    public static categoryControllerDeleteCategory(
        id: number,
    ): CancelablePromise<CategoryResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/category/{id}',
            path: {
                'id': id,
            },
        });
    }
}
