/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @returns any The Health Check is successful
     * @throws ApiError
     */
    public static healthControllerCheck(): CancelablePromise<{
        status?: string;
        info?: Record<string, Record<string, string>> | null;
        error?: Record<string, Record<string, string>> | null;
        details?: Record<string, Record<string, string>>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/health',
            errors: {
                503: `The Health Check is not successful`,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static prometheusControllerIndex(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/metrics',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static filesControllerUploadFile(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/files',
        });
    }
    /**
     * @param pubkey
     * @returns any
     * @throws ApiError
     */
    public static filesControllerGetFile(
        pubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/files/{pubkey}',
            path: {
                'pubkey': pubkey,
            },
        });
    }
    /**
     * @param pubkey
     * @returns any
     * @throws ApiError
     */
    public static filesControllerDeleteFile(
        pubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/files/{pubkey}',
            path: {
                'pubkey': pubkey,
            },
        });
    }
}
