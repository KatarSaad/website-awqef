/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PdfGeneratorService {
    /**
     * Fetch customer's endowment by their pubkey
     * @param pubkey
     * @returns any Returns a PDF document with the endowment of the customer with the specified pubkey
     * @throws ApiError
     */
    public static pdfGeneratorControllerGetEndowmentDocument(
        pubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/documents/backoffice/endowment/{pubkey}',
            path: {
                'pubkey': pubkey,
            },
        });
    }
    /**
     * Fetch personal endowment
     * @returns any Returns a PDF document with the personal endowment of the authenticated user
     * @throws ApiError
     */
    public static pdfGeneratorControllerGetPersonalEndowmentDocument(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/documents/customer/endowment',
        });
    }
}
