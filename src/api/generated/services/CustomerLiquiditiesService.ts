/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BeneficiaryDto } from '../models/BeneficiaryDto';
import type { CustomerLiquidityDto } from '../models/CustomerLiquidityDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomerLiquiditiesService {
    /**
     * Add menu item to liquidity menu
     * @param inputFieldId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesCustomerControllerAddLiquidityMenuItem(
        inputFieldId: string,
        requestBody: BeneficiaryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/customer/liquidities/{inputFieldId}/menu',
            path: {
                'inputFieldId': inputFieldId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get liquidity menu items
     * @param inputFieldId
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesCustomerControllerGetLiquidityMenuItems(
        inputFieldId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/customer/liquidities/{inputFieldId}/menu',
            path: {
                'inputFieldId': inputFieldId,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesCustomerControllerCreate(
        id: string,
        requestBody: CustomerLiquidityDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/customer/liquidities',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesCustomerControllerUpdate(
        id: string,
        requestBody: CustomerLiquidityDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/customer/liquidities',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static liquiditiesCustomerControllerGetLiquiditiesTypes(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/customer/liquidities/types',
        });
    }
}
