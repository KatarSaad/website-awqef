/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateInvestmentDto = {
    /**
     * Investment amount
     */
    amount: number;
    /**
     * Currency code
     */
    currency: string;
    /**
     * ID of the investor (User)
     */
    investorId: number;
    /**
     * ID of the project
     */
    projectId: number;
    /**
     * Is the investment confirmed?
     */
    isConfirmed?: boolean;
};

