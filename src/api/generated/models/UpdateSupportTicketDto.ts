/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TicketTypeEnum } from './TicketTypeEnum';
export type UpdateSupportTicketDto = {
    /**
     * The title of the support ticket
     */
    title?: string;
    /**
     * Detailed description of the support ticket
     */
    description?: string;
    type?: TicketTypeEnum;
    /**
     * Status of the support ticket
     */
    status?: string;
    /**
     * Tags associated with the support ticket
     */
    tags?: Array<string>;
    /**
     * Pubkeys of users to be assigned to the ticket
     */
    assignedToPubkeys?: Array<string>;
    /**
     * Files Ids
     */
    attachmentsPubkeys?: Array<number>;
    /**
     * Deadline for the support ticket
     */
    deadline?: string;
    /**
     * Estimated working days to resolve the ticket
     */
    workingDays?: number;
    /**
     * Priority of the support ticket
     */
    priority?: UpdateSupportTicketDto.priority;
    /**
     * Progress value of the support ticket in percentage
     */
    progressValue?: number;
    /**
     * Order of the support ticket
     */
    order?: number;
    /**
     * Version sequence of the support ticket
     */
    versionSequence?: string;
    /**
     * Reason for reopening the support ticket
     */
    reopenReason?: string;
    /**
     * Public key of the support ticket to update
     */
    pubkey?: string;
};
export namespace UpdateSupportTicketDto {
    /**
     * Priority of the support ticket
     */
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
        URGENT = 'URGENT',
    }
}

