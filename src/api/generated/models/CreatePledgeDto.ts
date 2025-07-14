/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreatePledgeDto = {
    /**
     * Pledge amount
     */
    amount: number;
    /**
     * Currency code
     */
    currency: string;
    /**
     * ID of the user
     */
    userId: number;
    /**
     * ID of the project
     */
    projectId: number;
    /**
     * Is the pledge confirmed?
     */
    isConfirmed?: boolean;
};

