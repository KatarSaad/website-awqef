/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type CertificationResponseDto = {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    title: TranslationDto;
    issuingBody: TranslationDto;
    documentUrl: string;
    issuedAt?: string;
    validUntil?: string;
    projectId: number;
};

