/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type CreateFatwaDto = {
    /**
     * Scholar name (ID of MultiLanguageString or translation object)
     */
    scholarName: (number | TranslationDto);
    /**
     * URL of the fatwa document
     */
    documentUrl: string;
    /**
     * Fatwa summary (ID of MultiLanguageString or translation object)
     */
    summary: (number | TranslationDto);
    /**
     * Approval status
     */
    status?: CreateFatwaDto.status;
    /**
     * Date issued
     */
    issuedAt?: string;
    /**
     * Date expires
     */
    expiresAt?: string;
};
export namespace CreateFatwaDto {
    /**
     * Approval status
     */
    export enum status {
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
        EXPIRED = 'EXPIRED',
    }
}

