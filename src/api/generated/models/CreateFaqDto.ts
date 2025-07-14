/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type CreateFaqDto = {
    /**
     * FAQ question (ID of MultiLanguageString or translation object)
     */
    question: (number | TranslationDto);
    /**
     * FAQ answer (ID of MultiLanguageString or translation object)
     */
    answer: (number | TranslationDto);
    /**
     * ID of the section
     */
    sectionId?: number;
    /**
     * Order of the FAQ in the section
     */
    order?: number;
};

