/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type CreateCategoryDto = {
    /**
     * Category name (ID of MultiLanguageString or translation object)
     */
    name: (number | TranslationDto);
    /**
     * Category description (ID of MultiLanguageString or translation object)
     */
    description?: (number | TranslationDto);
};

