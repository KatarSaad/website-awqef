/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type CreateSectionDto = {
    /**
     * Section name (ID of MultiLanguageString or translation object)
     */
    name: (number | TranslationDto);
    /**
     * Type of the section
     */
    type: CreateSectionDto.type;
    /**
     * Position/order of the section
     */
    position: number;
    /**
     * Is the section active?
     */
    isActive?: boolean;
};
export namespace CreateSectionDto {
    /**
     * Type of the section
     */
    export enum type {
        HERO = 'HERO',
        FEATURES = 'FEATURES',
        TESTIMONIALS = 'TESTIMONIALS',
        STATS = 'STATS',
        FAQ = 'FAQ',
        CONTACT = 'CONTACT',
        CUSTOM = 'CUSTOM',
        NEWSLETTER = 'NEWSLETTER',
    }
}

