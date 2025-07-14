/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type StatisticResponseDto = {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    label: TranslationDto;
    value: number;
    source: string;
    sectionId?: number;
};

