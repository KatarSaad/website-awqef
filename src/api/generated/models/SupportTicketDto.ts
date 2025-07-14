/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentDto } from './CommentDto';
import type { EventEntity } from './EventEntity';
import type { FileDto } from './FileDto';
import type { TicketTypeEnum } from './TicketTypeEnum';
import type { UserDto } from './UserDto';
export type SupportTicketDto = {
    /**
     * Unique identifier for the support ticket
     */
    id: number;
    /**
     * The title of the support ticket
     */
    title: string;
    /**
     * Detailed description of the support ticket
     */
    description?: string;
    /**
     * Type of the support ticket
     */
    type: TicketTypeEnum;
    status: string;
    /**
     * Priority of the support ticket
     */
    priority: string;
    /**
     * Working days for the support ticket
     */
    workingDays: number;
    /**
     * Deadline for the support ticket
     */
    deadline?: string;
    /**
     * Progress value of the support ticket in percentage
     */
    progressValue: number;
    /**
     * Order of the support ticket
     */
    order: number;
    /**
     * Version sequence of the support ticket
     */
    versionSequence?: string;
    /**
     * Reason for reopening the support ticket
     */
    reopenReason?: string;
    /**
     * Tags associated with the support ticket
     */
    tags: Array<string>;
    createdBy: UserDto;
    /**
     * Users assigned to the support ticket
     */
    assignedTo: Array<UserDto>;
    createdAt?: string;
    updatedAt?: string;
    /**
     * Attachments for the support ticket
     */
    attachments?: Array<FileDto>;
    /**
     * Comments on the support ticket
     */
    comments?: Array<CommentDto>;
    /**
     * Comments on the support ticket
     */
    events?: Array<EventEntity>;
};

