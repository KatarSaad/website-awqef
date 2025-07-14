/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrganizationDto } from '../models/CreateOrganizationDto';
import type { RegisterOrganizationDto } from '../models/RegisterOrganizationDto';
import type { UpdateOrganizationDto } from '../models/UpdateOrganizationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationsService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static organizationsControllerRegister(
        requestBody: RegisterOrganizationDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/backoffice/organizations/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static organizationsControllerCreate(
        requestBody: CreateOrganizationDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/backoffice/organizations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static organizationsControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/organizations',
        });
    }
    /**
     * @param pubkey
     * @returns any
     * @throws ApiError
     */
    public static organizationsControllerFindOne(
        pubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/backoffice/organizations/{pubkey}',
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
    public static organizationsControllerUpdate(
        pubkey: string,
        requestBody: UpdateOrganizationDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/backoffice/organizations/{pubkey}',
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
    public static organizationsControllerRemove(
        pubkey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/backoffice/organizations/{pubkey}',
            path: {
                'pubkey': pubkey,
            },
        });
    }
}
