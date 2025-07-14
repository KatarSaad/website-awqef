/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MassarefSectionDto } from './MassarefSectionDto';
import type { StringIds } from './StringIds';
export type CustomerSectionDto = {
    text: string;
    notes: Array<string>;
    items: Array<string>;
    multiSelectIds: Array<StringIds>;
    singleSelectPubkey: string;
    massaref: MassarefSectionDto;
    pubkey: string;
};

