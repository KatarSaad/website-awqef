/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MassarefBeneficiaryDto } from './MassarefBeneficiaryDto';
export type MassarefSectionDto = {
    id: string;
    sourceType: string;
    amount: number;
    percentage: number;
    mainDistribution: number;
    beneficiaries: Array<MassarefBeneficiaryDto>;
};

