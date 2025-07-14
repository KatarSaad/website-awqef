/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackofficeDashboardStatisticsService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static statisticsControllerGetUsersStatistics(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/statistics/users',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static statisticsControllerGetLiquiditiesStatistics(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/statistics/liquidities',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static statisticsControllerGetEndowmentsStatusStatistics(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/statistics/endowments-status',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static statisticsControllerGetEmployeesStatistics(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/statistics/employees',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static statisticsControllerGetEndowmentsStatistics(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/statistics/endowments',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static statisticsControllerGetAllStatistics(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/statistics',
        });
    }
}
