/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerLiquidityItemDto } from './CustomerLiquidityItemDto';
import type { CustomerSectionDto } from './CustomerSectionDto';
import type { LiquidityFieldInputType } from './LiquidityFieldInputType';
export type CustomerUpdateEndowmentDto = {
    alternateIntro?: string;
    sections: Array<CustomerSectionDto>;
    liquidities: Array<CustomerLiquidityItemDto>;
    status?: LiquidityFieldInputType;
};

