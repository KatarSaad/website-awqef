/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryDto } from './CategoryDto';
import type { CreateCertificationDto } from './CreateCertificationDto';
import type { CreateFatwaDto } from './CreateFatwaDto';
import type { CreateInvestmentDto } from './CreateInvestmentDto';
import type { CreatePledgeDto } from './CreatePledgeDto';
import type { CreateProjectStepDto } from './CreateProjectStepDto';
import type { CreateSponsorDto } from './CreateSponsorDto';
import type { CreateWebsiteOrganizationDto } from './CreateWebsiteOrganizationDto';
import type { TranslationEntity } from './TranslationEntity';
import type { WebsiteCommentDto } from './WebsiteCommentDto';
export type ProjectResponseDto = {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    slug: string;
    titleId: number;
    title: TranslationEntity;
    descriptionId: number;
    description: TranslationEntity;
    featured?: boolean;
    status?: ProjectResponseDto.status;
    targetAmount: number;
    fundedAmount?: number;
    backersCount?: number;
    currency?: string;
    organizationId?: number;
    organization: CreateWebsiteOrganizationDto;
    categoryId?: number;
    category?: CategoryDto;
    steps: Array<CreateProjectStepDto>;
    investments: Array<CreateInvestmentDto>;
    pledges: Array<CreatePledgeDto>;
    sponsors: Array<CreateSponsorDto>;
    certifications: Array<CreateCertificationDto>;
    fatwa?: CreateFatwaDto;
    WebsiteComment: Array<WebsiteCommentDto>;
};
export namespace ProjectResponseDto {
    export enum status {
        DRAFT = 'DRAFT',
        PENDING = 'PENDING',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
        FUNDING = 'FUNDING',
        COMPLETED = 'COMPLETED',
        CANCELLED = 'CANCELLED',
    }
}

