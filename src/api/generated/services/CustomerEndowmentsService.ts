/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BeneficiaryDto } from '../models/BeneficiaryDto';
import type { CustomerUpdateEndowmentDto } from '../models/CustomerUpdateEndowmentDto';
import type { EndowmentTemplateDto } from '../models/EndowmentTemplateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomerEndowmentsService {
    /**
     * Get customer's current endowment
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerGetEndowment(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/customer/endowments',
        });
    }
    /**
     * Update customer endowment
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerUpdateEndowment(
        requestBody: CustomerUpdateEndowmentDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/api/customer/endowments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get available endowment templates
     * @returns EndowmentTemplateDto
     * @throws ApiError
     */
    public static endowmentsControllerGetEndowmentTemplates(): CancelablePromise<Array<EndowmentTemplateDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/customer/endowments/templates',
        });
    }
    /**
     * Get available endowment types
     * @returns EndowmentTemplateDto
     * @throws ApiError
     */
    public static endowmentsControllerGetEndowmentTypes(): CancelablePromise<Array<EndowmentTemplateDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/customer/endowments/endowmentsTypes',
        });
    }
    /**
     * Initialize endowment with selected template
     * @param endowmentTemplatePubkey
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerInitializeEndowment(
        endowmentTemplatePubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/customer/endowments/{endowmentTemplatePubkey}',
            path: {
                'endowmentTemplatePubkey': endowmentTemplatePubkey,
            },
        });
    }
    /**
     * Publish customer endowment to be available to staffers
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerPublishEndowment(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/customer/endowments/publish',
        });
    }
    /**
     * Add beneficiary to endowment
     * @param endowmentTemplateSection
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerAddBeneficiary(
        endowmentTemplateSection: string,
        requestBody: BeneficiaryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/customer/endowments/{endowmentTemplateSection}/beneficiaries',
            path: {
                'endowmentTemplateSection': endowmentTemplateSection,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get beneficiaries list of distribution section
     * @param endowmentTemplateSection
     * @returns any
     * @throws ApiError
     */
    public static endowmentsControllerGetBeneficiaries(
        endowmentTemplateSection: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/customer/endowments/{endowmentTemplateSection}/beneficiaries',
            path: {
                'endowmentTemplateSection': endowmentTemplateSection,
            },
        });
    }
}
