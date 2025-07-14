/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDto } from './UserDto';
export type CommentDto = {
    /**
     * The public key of the comment.
     */
    pubkey: string;
    content?: string;
    seen?: boolean;
    user: UserDto;
    /**
     * The date and time the comment was created.
     */
    createdAt?: string;
};

