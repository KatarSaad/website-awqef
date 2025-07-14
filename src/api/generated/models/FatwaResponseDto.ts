/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type FatwaResponseDto = {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    scholarName: TranslationDto;
    documentUrl: string;
    summary: TranslationDto;
    status?: FatwaResponseDto.status;
    issuedAt?: string;
    expiresAt?: string;
};
export namespace FatwaResponseDto {
    export enum status {
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
        EXPIRED = 'EXPIRED',
    }
}

