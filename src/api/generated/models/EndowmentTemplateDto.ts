/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EndowmentTemplateStepDto } from './EndowmentTemplateStepDto';
import type { TranslationDto } from './TranslationDto';
export type EndowmentTemplateDto = {
    name: TranslationDto;
    description: TranslationDto;
    introductionTextTemplate: TranslationDto;
    verificationPrice: number;
    steps: Array<EndowmentTemplateStepDto>;
};

