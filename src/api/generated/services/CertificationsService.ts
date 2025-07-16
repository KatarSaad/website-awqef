/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CertificationResponseDto } from '../models/CertificationResponseDto';
import type { CreateCertificationDto } from '../models/CreateCertificationDto';
import type { UpdateCertificationDto } from '../models/UpdateCertificationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CertificationsService {
    /**
     * List all certifications
     * @returns CertificationResponseDto
     * @throws ApiError
     */
    public static certificationControllerListCertifications(): CancelablePromise<Array<CertificationResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/certifications',
        });
    }
    /**
     * Create a certification
     * @param requestBody
     * @returns CertificationResponseDto
     * @throws ApiError
     */
    public static certificationControllerCreateCertification(
        requestBody: CreateCertificationDto,
    ): CancelablePromise<CertificationResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/certifications',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get certification by ID
     * @param id
     * @returns CertificationResponseDto
     * @throws ApiError
     */
    public static certificationControllerGetCertification(
        id: number,
    ): CancelablePromise<CertificationResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/certifications/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a certification
     * @param id
     * @param requestBody
     * @returns CertificationResponseDto
     * @throws ApiError
     */
    public static certificationControllerUpdateCertification(
        id: number,
        requestBody: UpdateCertificationDto,
    ): CancelablePromise<CertificationResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/certifications/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete (soft) a certification
     * @param id
     * @returns CertificationResponseDto
     * @throws ApiError
     */
    public static certificationControllerDeleteCertification(
        id: number,
    ): CancelablePromise<CertificationResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/certifications/{id}',
            path: {
                'id': id,
            },
        });
    }
}
