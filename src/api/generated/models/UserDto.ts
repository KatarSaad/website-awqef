/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressDto } from './AddressDto';
import type { ContactDto } from './ContactDto';
import type { MassarefSectionDto } from './MassarefSectionDto';
export type UserDto = {
    id_number: string;
    id: number;
    email: string;
    phone_number: string;
    nationality?: string;
    educational_level?: string;
    current_occupation?: string;
    first_name: string;
    father_name?: string;
    grandfather_name?: string;
    family_name: string;
    birthday?: string;
    secondary_email?: string;
    secondary_phone_number?: string;
    is_id_number_confirmed: boolean;
    is_email_confirmed: boolean;
    is_phone_confirmed: boolean;
    roles: Array<string>;
    address: AddressDto;
    more_contacts?: ContactDto;
    massaref?: MassarefSectionDto;
};

