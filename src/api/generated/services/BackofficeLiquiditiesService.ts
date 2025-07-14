/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateLiquidityItemDto } from '../models/CreateLiquidityItemDto';
import type { UpdateLiquidityItemDto } from '../models/UpdateLiquidityItemDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackofficeLiquiditiesService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesBackOfficeControllerCreate(
        requestBody: CreateLiquidityItemDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/backoffice/liquidities',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesBackOfficeControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/liquidities',
        });
    }
    /**
     * @param uuid
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesBackOfficeControllerFindOne(
        uuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/liquidities/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * @param uuid
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesBackOfficeControllerUpdate(
        uuid: string,
        requestBody: UpdateLiquidityItemDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/backoffice/liquidities/{uuid}',
            path: {
                'uuid': uuid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param uuid
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesBackOfficeControllerRemove(
        uuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/backoffice/liquidities/{uuid}',
            path: {
                'uuid': uuid,
            },
        });
    }
    /**
     * Change liquidity status
     * @param uuid
     * @param status
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesBackOfficeControllerChangeEndowmentStatus(
        uuid: string,
        status: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/backoffice/liquidities/{uuid}/{status}',
            path: {
                'uuid': uuid,
                'status': status,
            },
        });
    }
}
