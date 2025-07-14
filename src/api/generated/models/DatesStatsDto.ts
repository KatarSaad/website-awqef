/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DatesStatsDto = {
    dateFilter: DatesStatsDto.dateFilter;
    count: number;
    percentage: number;
};
export namespace DatesStatsDto {
    export enum dateFilter {
        CURRENT_YEAR = 'currentYear',
        CURRENT_MONTH = 'currentMonth',
        CURRENT_WEEK = 'currentWeek',
        PREVIOUS_MONTH = 'previousMonth',
        TODAY = 'today',
        ALL = 'all',
    }
}

