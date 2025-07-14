/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DatesStatsDto } from './DatesStatsDto';
import type { GroupedStatsWithTotalsDto } from './GroupedStatsWithTotalsDto';
import type { PaginatedResponseDto } from './PaginatedResponseDto';
export type CombinedResponseDto = {
    sources: GroupedStatsWithTotalsDto;
    statuses: GroupedStatsWithTotalsDto;
    types: GroupedStatsWithTotalsDto;
    reservations: PaginatedResponseDto;
    datesStats: Array<DatesStatsDto>;
};

