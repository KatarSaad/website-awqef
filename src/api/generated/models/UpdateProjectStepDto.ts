/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type UpdateProjectStepDto = {
    /**
     * Step title (ID of MultiLanguageString or translation object)
     */
    title?: (number | TranslationDto);
    /**
     * Step description (ID of MultiLanguageString or translation object)
     */
    description?: (number | TranslationDto);
    /**
     * Order of the step in the project
     */
    order?: number;
    /**
     * Is the step completed?
     */
    isCompleted?: boolean;
    /**
     * Date completed
     */
    completedAt?: string;
};

