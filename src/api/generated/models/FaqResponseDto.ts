/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type FaqResponseDto = {
    id: number;
    question: TranslationDto;
    answer: TranslationDto;
    sectionId?: number;
    order: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
};

