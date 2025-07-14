/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateContentReferenceDto = {
    /**
     * ID of the section
     */
    sectionId: number;
    /**
     * Type of the referenced content
     */
    contentType: CreateContentReferenceDto.contentType;
    /**
     * ID of the referenced content
     */
    contentId: number;
    /**
     * Order of the reference in the section
     */
    order?: number;
};
export namespace CreateContentReferenceDto {
    /**
     * Type of the referenced content
     */
    export enum contentType {
        POST = 'POST',
        PROJECT = 'PROJECT',
        ORGANIZATION = 'ORGANIZATION',
        STAFF = 'STAFF',
        PAGE = 'PAGE',
    }
}

