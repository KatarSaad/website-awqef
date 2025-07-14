/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MultiSelectDto } from './MultiSelectDto';
import type { TranslationDto } from './TranslationDto';
export type EndowmentTemplateSectionDto = {
    title: TranslationDto;
    text_template: TranslationDto;
    text_enabled: boolean;
    notes_enabled: boolean;
    type: string;
    max_items: number;
    min_items: number;
    order: number;
    default_items?: Array<string>;
    beneficiaryList?: Array<string>;
    selectItems?: Array<MultiSelectDto>;
};

