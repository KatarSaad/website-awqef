/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type UpdateWebsiteOrganizationDto = {
    /**
     * Organization name (ID of MultiLanguageString or translation object)
     */
    name?: (number | TranslationDto);
    /**
     * Organization description (ID of MultiLanguageString or translation object)
     */
    description?: (number | TranslationDto);
    /**
     * Logo URL
     */
    logo?: string;
    /**
     * Sponsor tier
     */
    tier?: UpdateWebsiteOrganizationDto.tier;
    /**
     * Is the organization verified?
     */
    isVerified?: boolean;
};
export namespace UpdateWebsiteOrganizationDto {
    /**
     * Sponsor tier
     */
    export enum tier {
        BRONZE = 'BRONZE',
        SILVER = 'SILVER',
        GOLD = 'GOLD',
        PLATINUM = 'PLATINUM',
    }
}

