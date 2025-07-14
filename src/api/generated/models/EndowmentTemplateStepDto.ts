/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EndowmentTemplateSectionDto } from './EndowmentTemplateSectionDto';
import type { TranslationDto } from './TranslationDto';
export type EndowmentTemplateStepDto = {
    name: TranslationDto;
    description: TranslationDto;
    order: number;
    sections: Array<EndowmentTemplateSectionDto>;
};

