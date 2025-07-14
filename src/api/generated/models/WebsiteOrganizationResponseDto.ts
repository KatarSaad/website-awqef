/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type WebsiteOrganizationResponseDto = {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    name: TranslationDto;
    description?: TranslationDto;
    logo?: string;
    tier?: WebsiteOrganizationResponseDto.tier;
    isVerified?: boolean;
};
export namespace WebsiteOrganizationResponseDto {
    export enum tier {
        BRONZE = 'BRONZE',
        SILVER = 'SILVER',
        GOLD = 'GOLD',
        PLATINUM = 'PLATINUM',
    }
}

