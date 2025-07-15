/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateWebsiteCommentDto = {
    /**
     * Comment content
     */
    content: string;
    /**
     * ID of the author (optional)
     */
    authorId?: number;
    /**
     * ID of the post (optional)
     */
    postId?: number;
    /**
     * ID of the project (optional)
     */
    projectId?: number;
    /**
     * ID of the parent comment (optional)
     */
    parentId?: number;
};

