/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFaqDto } from '../models/CreateFaqDto';
import type { FaqResponseDto } from '../models/FaqResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FaqService {
    /**
     * List all FAQs
     * @returns FaqResponseDto
     * @throws ApiError
     */
    public static faqControllerListFaqs(): CancelablePromise<Array<FaqResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/faq',
        });
    }
    /**
     * Create a FAQ
     * @param requestBody
     * @returns FaqResponseDto
     * @throws ApiError
     */
    public static faqControllerCreateFaq(
        requestBody: CreateFaqDto,
    ): CancelablePromise<FaqResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/faq',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get FAQ by ID
     * @param id
     * @returns FaqResponseDto
     * @throws ApiError
     */
    public static faqControllerGetFaq(
        id: number,
    ): CancelablePromise<FaqResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/faq/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete a FAQ
     * @param id
     * @returns FaqResponseDto
     * @throws ApiError
     */
    public static faqControllerDeleteFaq(
        id: number,
    ): CancelablePromise<FaqResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/faq/{id}',
            path: {
                'id': id,
            },
        });
    }
}
