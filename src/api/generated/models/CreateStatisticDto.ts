/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type CreateStatisticDto = {
    /**
     * Statistic label (ID of MultiLanguageString or translation object)
     */
    label: (number | TranslationDto);
    /**
     * Value of the statistic
     */
    value: number;
    /**
     * Source of the statistic (optional)
     */
    source?: string;
    /**
     * ID of the section
     */
    sectionId?: number;
};

