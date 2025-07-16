/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePostDto } from '../models/CreatePostDto';
import type { CreateRatingDto } from '../models/CreateRatingDto';
import type { CreateShareLogDto } from '../models/CreateShareLogDto';
import type { CreateWebsiteCommentDto } from '../models/CreateWebsiteCommentDto';
import type { PostResponseDto } from '../models/PostResponseDto';
import type { RatingResponseDto } from '../models/RatingResponseDto';
import type { ShareLogResponseDto } from '../models/ShareLogResponseDto';
import type { UpdatePostDto } from '../models/UpdatePostDto';
import type { UpdateWebsiteCommentDto } from '../models/UpdateWebsiteCommentDto';
import type { WebsiteCommentResponseDto } from '../models/WebsiteCommentResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ContentService {
    /**
     * Paginated list of posts
     * @param search
     * @returns any
     * @throws ApiError
     */
    public static contentControllerListPosts(
        search: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/content/posts',
            query: {
                'search': search,
            },
        });
    }
    /**
     * Create a post
     * @param requestBody
     * @returns PostResponseDto
     * @throws ApiError
     */
    public static contentControllerCreatePost(
        requestBody: CreatePostDto,
    ): CancelablePromise<PostResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/content/posts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get post by ID
     * @param id
     * @returns PostResponseDto
     * @throws ApiError
     */
    public static contentControllerGetPost(
        id: number,
    ): CancelablePromise<PostResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/content/posts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a post
     * @param id
     * @param requestBody
     * @returns PostResponseDto
     * @throws ApiError
     */
    public static contentControllerUpdatePost(
        id: number,
        requestBody: UpdatePostDto,
    ): CancelablePromise<PostResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/content/posts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a post
     * @param id
     * @returns PostResponseDto
     * @throws ApiError
     */
    public static contentControllerDeletePost(
        id: number,
    ): CancelablePromise<PostResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/content/posts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get website comment by ID
     * @param id
     * @returns WebsiteCommentResponseDto
     * @throws ApiError
     */
    public static contentControllerGetWebsiteComment(
        id: number,
    ): CancelablePromise<WebsiteCommentResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/content/website-comments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a website comment
     * @param id
     * @param requestBody
     * @returns WebsiteCommentResponseDto
     * @throws ApiError
     */
    public static contentControllerUpdateWebsiteComment(
        id: number,
        requestBody: UpdateWebsiteCommentDto,
    ): CancelablePromise<WebsiteCommentResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/api/content/website-comments/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a website comment
     * @param id
     * @returns WebsiteCommentResponseDto
     * @throws ApiError
     */
    public static contentControllerDeleteWebsiteComment(
        id: number,
    ): CancelablePromise<WebsiteCommentResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/content/website-comments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Create a website comment
     * @param requestBody
     * @returns WebsiteCommentResponseDto
     * @throws ApiError
     */
    public static contentControllerCreateWebsiteComment(
        requestBody: CreateWebsiteCommentDto,
    ): CancelablePromise<WebsiteCommentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/content/website-comments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get rating by ID
     * @param id
     * @returns RatingResponseDto
     * @throws ApiError
     */
    public static contentControllerGetRating(
        id: number,
    ): CancelablePromise<RatingResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/content/ratings/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete a rating
     * @param id
     * @returns RatingResponseDto
     * @throws ApiError
     */
    public static contentControllerDeleteRating(
        id: number,
    ): CancelablePromise<RatingResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/content/ratings/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Create a rating
     * @param requestBody
     * @returns RatingResponseDto
     * @throws ApiError
     */
    public static contentControllerCreateRating(
        requestBody: CreateRatingDto,
    ): CancelablePromise<RatingResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/content/ratings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get share log by ID
     * @param id
     * @returns ShareLogResponseDto
     * @throws ApiError
     */
    public static contentControllerGetShareLog(
        id: number,
    ): CancelablePromise<ShareLogResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/content/share-logs/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete a share log
     * @param id
     * @returns ShareLogResponseDto
     * @throws ApiError
     */
    public static contentControllerDeleteShareLog(
        id: number,
    ): CancelablePromise<ShareLogResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/api/content/share-logs/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Create a share log
     * @param requestBody
     * @returns ShareLogResponseDto
     * @throws ApiError
     */
    public static contentControllerCreateShareLog(
        requestBody: CreateShareLogDto,
    ): CancelablePromise<ShareLogResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/content/share-logs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
