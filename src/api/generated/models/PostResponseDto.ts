/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryDto } from './CategoryDto';
import type { RatingDto } from './RatingDto';
import type { TranslationDto } from './TranslationDto';
import type { UserDto } from './UserDto';
import type { WebsiteCommentDto } from './WebsiteCommentDto';
export type PostResponseDto = {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    slug: string;
    title: TranslationDto;
    content: TranslationDto;
    excerpt?: TranslationDto;
    featuredImage?: string;
    tags?: Array<string>;
    isFeatured?: boolean;
    type?: PostResponseDto.type;
    /**
     * ID of the author (User)
     */
    authorId?: number;
    categoryId?: number;
    category?: CategoryDto;
    author?: UserDto;
    comments: Array<WebsiteCommentDto>;
    ratings: Array<RatingDto>;
    publishedAt?: string;
};
export namespace PostResponseDto {
    export enum type {
        BLOG = 'BLOG',
        NEWS = 'NEWS',
        EVENT = 'EVENT',
        PAGE = 'PAGE',
    }
}

