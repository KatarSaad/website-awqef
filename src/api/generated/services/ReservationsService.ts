/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CombinedResponseDto } from '../models/CombinedResponseDto';
import type { CreateReservationDto } from '../models/CreateReservationDto';
import type { ImportReservationsDto } from '../models/ImportReservationsDto';
import type { OtpVerifyDto } from '../models/OtpVerifyDto';
import type { PaginatedResponseDto } from '../models/PaginatedResponseDto';
import type { StatsResponseDto } from '../models/StatsResponseDto';
import type { UpdateReservationDto } from '../models/UpdateReservationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReservationsService {
    /**
     * @param formData
     * @returns any
     * @throws ApiError
     */
    public static reservationsControllerImport(
        formData: ImportReservationsDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/reservations/import',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static reservationsControllerRegisterVerifyOtp(
        requestBody: OtpVerifyDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/api/reservations/otp-verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static reservationsControllerCreate(
        requestBody: CreateReservationDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/reservations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static reservationsControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/reservations',
        });
    }
    /**
     * Get filtered reservations with pagination
     * Retrieve reservations with filtering and pagination support
     * @param source
     * @param status
     * @param type
     * @param dateFilter
     * @param startDate
     * @param endDate
     * @param sortOrder
     * @param sortBy
     * @param page
     * @param take
     * @returns PaginatedResponseDto Returns paginated list of reservations
     * @throws ApiError
     */
    public static reservationsControllerGetReservations(
        source?: 'WEBSITE' | 'FACEBOOK' | 'INSTAGRAM' | 'SNAPCHAT' | 'TWITTER' | 'LINKEDIN' | 'YOUTUBE' | 'TIKTOK' | 'GOOGLE' | 'OTHER' | 'WHATSAPP',
        status?: string,
        type?: 'INDIVIDUAL' | 'COMPANY',
        dateFilter?: 'currentYear' | 'currentMonth' | 'currentWeek' | 'previousMonth' | 'today' | 'all',
        startDate?: string,
        endDate?: string,
        sortOrder: 'asc' | 'desc' = 'desc',
        sortBy: 'createdAt' | 'updatedAt' | 'name' = 'createdAt',
        page: number = 1,
        take: number = 10,
    ): CancelablePromise<PaginatedResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/reservations/reservations-with-filters',
            query: {
                'source': source,
                'status': status,
                'type': type,
                'dateFilter': dateFilter,
                'startDate': startDate,
                'endDate': endDate,
                'sortOrder': sortOrder,
                'sortBy': sortBy,
                'page': page,
                'take': take,
            },
        });
    }
    /**
     * Get reservation statistics
     * Retrieve statistics for reservations grouped by source, status, and type
     * @param source
     * @param status
     * @param type
     * @param dateFilter
     * @param startDate
     * @param endDate
     * @param sortOrder
     * @param sortBy
     * @param statsSortOrder Sort order for statistics count (asc/desc)
     * @returns StatsResponseDto Returns reservation statistics
     * @throws ApiError
     */
    public static reservationsControllerGetReservationStats(
        source?: 'WEBSITE' | 'FACEBOOK' | 'INSTAGRAM' | 'SNAPCHAT' | 'TWITTER' | 'LINKEDIN' | 'YOUTUBE' | 'TIKTOK' | 'GOOGLE' | 'OTHER' | 'WHATSAPP',
        status?: string,
        type?: 'INDIVIDUAL' | 'COMPANY',
        dateFilter?: 'currentYear' | 'currentMonth' | 'currentWeek' | 'previousMonth' | 'today' | 'all',
        startDate?: string,
        endDate?: string,
        sortOrder?: 'asc' | 'desc',
        sortBy: 'createdAt' | 'updatedAt' | 'name' = 'createdAt',
        statsSortOrder: 'asc' | 'desc' = 'desc',
    ): CancelablePromise<StatsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/reservations/stats',
            query: {
                'source': source,
                'status': status,
                'type': type,
                'dateFilter': dateFilter,
                'startDate': startDate,
                'endDate': endDate,
                'sortOrder': sortOrder,
                'sortBy': sortBy,
                'statsSortOrder': statsSortOrder,
            },
        });
    }
    /**
     * Get combined reservations and stats data
     * Retrieve both reservations data and statistics in a single request
     * @param source
     * @param status
     * @param type
     * @param dateFilter
     * @param startDate
     * @param endDate
     * @param sortOrder
     * @param sortBy
     * @param page
     * @param take
     * @returns CombinedResponseDto Returns combined stats and reservations data
     * @throws ApiError
     */
    public static reservationsControllerGetCombinedData(
        source?: 'WEBSITE' | 'FACEBOOK' | 'INSTAGRAM' | 'SNAPCHAT' | 'TWITTER' | 'LINKEDIN' | 'YOUTUBE' | 'TIKTOK' | 'GOOGLE' | 'OTHER' | 'WHATSAPP',
        status?: string,
        type?: 'INDIVIDUAL' | 'COMPANY',
        dateFilter?: 'currentYear' | 'currentMonth' | 'currentWeek' | 'previousMonth' | 'today' | 'all',
        startDate?: string,
        endDate?: string,
        sortOrder: 'asc' | 'desc' = 'desc',
        sortBy: 'createdAt' | 'updatedAt' | 'name' = 'createdAt',
        page: number = 1,
        take: number = 10,
    ): CancelablePromise<CombinedResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/reservations/combined-data',
            query: {
                'source': source,
                'status': status,
                'type': type,
                'dateFilter': dateFilter,
                'startDate': startDate,
                'endDate': endDate,
                'sortOrder': sortOrder,
                'sortBy': sortBy,
                'page': page,
                'take': take,
            },
        });
    }
    /**
     * @param pubkey
     * @returns any
     * @throws ApiError
     */
    public static reservationsControllerFindOne(
        pubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/reservations/{pubkey}',
            path: {
                'pubkey': pubkey,
            },
        });
    }
    /**
     * @param pubkey
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static reservationsControllerUpdate(
        pubkey: string,
        requestBody: UpdateReservationDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/reservations/{pubkey}',
            path: {
                'pubkey': pubkey,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param pubkey
     * @returns any
     * @throws ApiError
     */
    public static reservationsControllerRemove(
        pubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/reservations/{pubkey}',
            path: {
                'pubkey': pubkey,
            },
        });
    }
}
