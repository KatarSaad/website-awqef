/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ManagementFetchUserResponse } from '../models/ManagementFetchUserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BackofficeManagementService {
    /**
     * @param search
     * @param take
     * @param page
     * @returns ManagementFetchUserResponse Returns endowment owners, as in, anyone who has created an endowment and their total count depending on the parameters
     * @throws ApiError
     */
    public static managementControllerFetchEndowmentOwners(
        search?: string,
        take?: number,
        page?: number,
    ): CancelablePromise<ManagementFetchUserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/management/endowment-owners',
            query: {
                'search': search,
                'take': take,
                'page': page,
            },
        });
    }
    /**
     * @param search
     * @param take
     * @param page
     * @returns ManagementFetchUserResponse Returns list of employees and their total count depending on the parameters
     * @throws ApiError
     */
    public static managementControllerFetchEmployees(
        search?: string,
        take?: number,
        page?: number,
    ): CancelablePromise<ManagementFetchUserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/management/employees',
            query: {
                'search': search,
                'take': take,
                'page': page,
            },
        });
    }
    /**
     * @param pubkey
     * @returns any
     * @throws ApiError
     */
    public static managementControllerUserChangeStatus(
        pubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/backoffice/management/{pubkey}/toggle-status',
            path: {
                'pubkey': pubkey,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static managementControllerChangeStaffMembersStatus(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/backoffice/management/activate-staff-members-status',
        });
    }
    /**
     * @param search
     * @param take
     * @param page
     * @returns ManagementFetchUserResponse Returns list of employees and their total count depending on the parameters
     * @throws ApiError
     */
    public static managementControllerFetchCustomer(
        search?: string,
        take?: number,
        page?: number,
    ): CancelablePromise<ManagementFetchUserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/management/customers',
            query: {
                'search': search,
                'take': take,
                'page': page,
            },
        });
    }
}
