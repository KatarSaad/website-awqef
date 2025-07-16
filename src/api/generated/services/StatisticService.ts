/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStatisticDto } from '../models/CreateStatisticDto';
import type { StatisticResponseDto } from '../models/StatisticResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StatisticService {
    /**
     * List all statistics
     * @returns StatisticResponseDto
     * @throws ApiError
     */
    public static statisticControllerListStatistics(): CancelablePromise<Array<StatisticResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/statistic',
        });
    }
    /**
     * Create a statistic
     * @param requestBody
     * @returns StatisticResponseDto
     * @throws ApiError
     */
    public static statisticControllerCreateStatistic(
        requestBody: CreateStatisticDto,
    ): CancelablePromise<StatisticResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/statistic',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get statistic by ID
     * @param id
     * @returns StatisticResponseDto
     * @throws ApiError
     */
    public static statisticControllerGetStatistic(
        id: number,
    ): CancelablePromise<StatisticResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/statistic/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete a statistic
     * @param id
     * @returns StatisticResponseDto
     * @throws ApiError
     */
    public static statisticControllerDeleteStatistic(
        id: number,
    ): CancelablePromise<StatisticResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/statistic/{id}',
            path: {
                'id': id,
            },
        });
    }
}
