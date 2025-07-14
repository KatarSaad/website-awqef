/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type UpdateCertificationDto = {
    /**
     * Certification title (ID of MultiLanguageString or translation object)
     */
    title?: (number | TranslationDto);
    /**
     * Issuing body (ID of MultiLanguageString or translation object)
     */
    issuingBody?: (number | TranslationDto);
    /**
     * URL of the certification document
     */
    documentUrl?: string;
    /**
     * Date issued
     */
    issuedAt?: string;
    /**
     * Date valid until
     */
    validUntil?: string;
    /**
     * ID of the project
     */
    projectId?: number;
};

