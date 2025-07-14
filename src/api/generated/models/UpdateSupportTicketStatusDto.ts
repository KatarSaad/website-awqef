/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateSupportTicketStatusDto = {
    /**
     * The new status of the support ticket
     */
    status: UpdateSupportTicketStatusDto.status;
    /**
     * Number of working days for the support ticket
     */
    workingDays?: number;
    /**
     * Deadline for the support ticket
     */
    deadline?: string;
    /**
     * Progress value of the support ticket as a percentage (0-100)
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
};
export namespace UpdateSupportTicketStatusDto {
    /**
     * The new status of the support ticket
     */
    export enum status {
        PROGRESS = 'PROGRESS',
        HOLD = 'HOLD',
        CLOSED = 'CLOSED',
        REOPENED = 'REOPENED',
    }
}

