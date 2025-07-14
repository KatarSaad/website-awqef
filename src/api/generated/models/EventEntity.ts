/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserEntity } from './UserEntity';
export type EventEntity = {
    id: string;
    type: string;
    title: string;
    description?: string;
    date: string;
    userId: string;
    user: UserEntity;
    elementType?: string;
    createdAt: string;
    updatedAt: string;
};

