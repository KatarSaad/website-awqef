/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateInvestmentDto } from '../models/CreateInvestmentDto';
import type { InvestmentResponseDto } from '../models/InvestmentResponseDto';
import type { UpdateInvestmentDto } from '../models/UpdateInvestmentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InvestmentsService {
    /**
     * List investments for a project
     * @param projectId
     * @returns InvestmentResponseDto
     * @throws ApiError
     */
    public static investmentControllerListInvestments(
        projectId: number,
    ): CancelablePromise<Array<InvestmentResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/investments/{projectId}',
            path: {
                'projectId': projectId,
            },
        });
    }
    /**
     * Create an investment
     * @param projectId
     * @param requestBody
     * @returns InvestmentResponseDto
     * @throws ApiError
     */
    public static investmentControllerCreateInvestment(
        projectId: number,
        requestBody: CreateInvestmentDto,
    ): CancelablePromise<InvestmentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/investments/{projectId}',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get investment by ID
     * @param id
     * @returns InvestmentResponseDto
     * @throws ApiError
     */
    public static investmentControllerGetInvestment(
        id: number,
    ): CancelablePromise<InvestmentResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/investments/investment/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update an investment
     * @param id
     * @param requestBody
     * @returns InvestmentResponseDto
     * @throws ApiError
     */
    public static investmentControllerUpdateInvestment(
        id: number,
        requestBody: UpdateInvestmentDto,
    ): CancelablePromise<InvestmentResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/investments/investment/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete (soft) an investment
     * @param id
     * @returns InvestmentResponseDto
     * @throws ApiError
     */
    public static investmentControllerDeleteInvestment(
        id: number,
    ): CancelablePromise<InvestmentResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/investments/investment/{id}',
            path: {
                'id': id,
            },
        });
    }
}
