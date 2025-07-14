/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type ProjectStepResponseDto = {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    projectId: number;
    title: TranslationDto;
    description: TranslationDto;
    order: number;
    isCompleted?: boolean;
    completedAt?: string;
};

