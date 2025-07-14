/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InputMenuDto } from './InputMenuDto';
import type { LiquidityFieldInputType } from './LiquidityFieldInputType';
import type { TranslationDto } from './TranslationDto';
export type InputFieldDto = {
    pubkey?: string;
    name: TranslationDto;
    placeholder: TranslationDto;
    type: LiquidityFieldInputType;
    items: Array<InputMenuDto>;
};

