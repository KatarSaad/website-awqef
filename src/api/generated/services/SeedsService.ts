/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SeedsService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static seedsControllerSeedReservations(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/seeds/reservations',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static seedsControllerSeedEndowments(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/seeds/endowments',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static seedsControllerRunSeeds(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/seeds/run',
        });
    }
    /**
     * Seed content module data
     * @returns any
     * @throws ApiError
     */
    public static seedControllerSeedContent(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/seeds/content',
        });
    }
    /**
     * Seed project module data
     * @returns any
     * @throws ApiError
     */
    public static seedControllerSeedProject(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/seeds/project',
        });
    }
    /**
     * Seed all modules
     * @returns any
     * @throws ApiError
     */
    public static seedControllerSeedAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/seeds/all',
        });
    }
}
