/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type CreateProjectDto = {
    /**
     * Unique slug for the project
     */
    slug: string;
    /**
     * Project title (ID of MultiLanguageString or translation object)
     */
    title: (number | TranslationDto);
    /**
     * Project description (ID of MultiLanguageString or translation object)
     */
    description: (number | TranslationDto);
    /**
     * Is this project featured?
     */
    featured?: boolean;
    /**
     * Status of the project
     */
    status?: CreateProjectDto.status;
    /**
     * Target amount for funding
     */
    targetAmount: number;
    /**
     * Amount already funded
     */
    fundedAmount?: number;
    /**
     * Number of backers
     */
    backersCount?: number;
    /**
     * Currency code
     */
    currency?: string;
    /**
     * ID of the organization
     */
    organizationId?: number;
    /**
     * ID of the category
     */
    categoryId?: number;
};
export namespace CreateProjectDto {
    /**
     * Status of the project
     */
    export enum status {
        DRAFT = 'DRAFT',
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
        FUNDING = 'FUNDING',
        COMPLETED = 'COMPLETED',
        CANCELLED = 'CANCELLED',
    }
}

