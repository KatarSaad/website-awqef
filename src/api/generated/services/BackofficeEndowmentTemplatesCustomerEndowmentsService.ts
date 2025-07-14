/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EndowmentTemplateDto } from '../models/EndowmentTemplateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackofficeEndowmentTemplatesCustomerEndowmentsService {
    /**
     * Create new endowment template
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerCreateEndowment(
        requestBody: EndowmentTemplateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/backoffice/endowments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all endowment templates
     * @returns EndowmentTemplateDto
     * @throws ApiError
     */
    public static endowmentsControllerGetEndowments(): CancelablePromise<Array<EndowmentTemplateDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/endowments',
        });
    }
    /**
     * Get endowment template by id
     * @param id
     * @returns EndowmentTemplateDto
     * @throws ApiError
     */
    public static endowmentsControllerGetEndowment(
        id: string,
    ): CancelablePromise<EndowmentTemplateDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/endowments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update endowment template
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerUpdateEndowment(
        id: string,
        requestBody: EndowmentTemplateDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/backoffice/endowments/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete endowment template
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerDeleteEndowment(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/backoffice/endowments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Change endowment template status
     * @param id
     * @param status
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerChangeEndowmentStatus(
        id: string,
        status: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/backoffice/endowments/{id}/{status}',
            path: {
                'id': id,
                'status': status,
            },
        });
    }
    /**
     * Get all customer endowments
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerGetCustomerEndowments(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/endowments/customer-endowments/get-all',
        });
    }
    /**
     * Accept customer endowment
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerAcceptEndowment(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/backoffice/endowments/customer-endowments/{id}/accept',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Reject customer endowment
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerRejectEndowment(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/backoffice/endowments/customer-endowments/{id}/reject',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete customer endowment
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerDeleteCustomerEndowment(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/backoffice/endowments/customer-endowments/{id}/delete',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Reset endowment state
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerResetEndowmentData(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/endowments/debug/reset',
        });
    }
}
