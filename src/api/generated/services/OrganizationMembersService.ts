/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrganizationMemberDto } from '../models/CreateOrganizationMemberDto';
import type { OrganizationMemberResponseDto } from '../models/OrganizationMemberResponseDto';
import type { UpdateOrganizationMemberDto } from '../models/UpdateOrganizationMemberDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationMembersService {
    /**
     * List members of an organization
     * @param organizationId
     * @returns OrganizationMemberResponseDto
     * @throws ApiError
     */
    public static organizationMemberControllerListOrganizationMembers(
        organizationId: number,
    ): CancelablePromise<Array<OrganizationMemberResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/organization-members/{organizationId}',
            path: {
                'organizationId': organizationId,
            },
        });
    }
    /**
     * Add a member to organization
     * @param organizationId
     * @param requestBody
     * @returns OrganizationMemberResponseDto
     * @throws ApiError
     */
    public static organizationMemberControllerCreateOrganizationMember(
        organizationId: number,
        requestBody: CreateOrganizationMemberDto,
    ): CancelablePromise<OrganizationMemberResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/organization-members/{organizationId}',
            path: {
                'organizationId': organizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get organization member by ID
     * @param id
     * @returns OrganizationMemberResponseDto
     * @throws ApiError
     */
    public static organizationMemberControllerGetOrganizationMember(
        id: number,
    ): CancelablePromise<OrganizationMemberResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/organization-members/member/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update an organization member
     * @param id
     * @param requestBody
     * @returns OrganizationMemberResponseDto
     * @throws ApiError
     */
    public static organizationMemberControllerUpdateOrganizationMember(
        id: number,
        requestBody: UpdateOrganizationMemberDto,
    ): CancelablePromise<OrganizationMemberResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/organization-members/member/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete (soft) an organization member
     * @param id
     * @returns OrganizationMemberResponseDto
     * @throws ApiError
     */
    public static organizationMemberControllerDeleteOrganizationMember(
        id: number,
    ): CancelablePromise<OrganizationMemberResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/organization-members/member/{id}',
            path: {
                'id': id,
            },
        });
    }
}
