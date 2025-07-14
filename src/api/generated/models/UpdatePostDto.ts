/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TranslationDto } from './TranslationDto';
export type UpdatePostDto = {
    /**
     * Unique slug for the post
     */
    slug?: string;
    /**
     * Post title (ID of MultiLanguageString or translation object)
     */
    title?: (number | TranslationDto);
    /**
     * Post content (ID of MultiLanguageString or translation object)
     */
    content?: (number | TranslationDto);
    /**
     * Post excerpt (ID of MultiLanguageString or translation object)
     */
    excerpt?: (number | TranslationDto);
    /**
     * Featured image URL
     */
    featuredImage?: string;
    /**
     * Tags for the post
     */
    tags?: Array<string>;
    /**
     * Is this post featured?
     */
    isFeatured?: boolean;
    /**
     * Type of the post
     */
    type?: UpdatePostDto.type;
    /**
     * ID of the author (User)
     */
    authorId?: number;
    /**
     * ID of the category
     */
    categoryId?: number;
};
export namespace UpdatePostDto {
    /**
     * Type of the post
     */
    export enum type {
        BLOG = 'BLOG',
        NEWS = 'NEWS',
        EVENT = 'EVENT',
        PAGE = 'PAGE',
    }
}

