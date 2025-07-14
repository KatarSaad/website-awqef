/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactFormDto } from '../models/ContactFormDto';
import type { EmailAuthenticationDto } from '../models/EmailAuthenticationDto';
import type { ForgotPasswordDto } from '../models/ForgotPasswordDto';
import type { IdNumberAuthenticationDto } from '../models/IdNumberAuthenticationDto';
import type { OtpVerifyDto } from '../models/OtpVerifyDto';
import type { PhoneAuthenticationDto } from '../models/PhoneAuthenticationDto';
import type { RefreshTokenDto } from '../models/RefreshTokenDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { TokenResponseDto } from '../models/TokenResponseDto';
import type { UserDto } from '../models/UserDto';
import type { ValidateTokenDto } from '../models/ValidateTokenDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns TokenResponseDto
     * @throws ApiError
     */
    public static authenticationControllerIdNumberLogin(
        requestBody: IdNumberAuthenticationDto,
    ): CancelablePromise<TokenResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/signin/id',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns TokenResponseDto
     * @throws ApiError
     */
    public static authenticationControllerPhoneLogin(
        requestBody: PhoneAuthenticationDto,
    ): CancelablePromise<TokenResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/signin/phone',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns TokenResponseDto
     * @throws ApiError
     */
    public static authenticationControllerLogin(
        requestBody: EmailAuthenticationDto,
    ): CancelablePromise<TokenResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/signin/staff',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns UserDto
     * @throws ApiError
     */
    public static authenticationControllerRegister(
        requestBody: RegisterDto,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns TokenResponseDto
     * @throws ApiError
     */
    public static authenticationControllerRegisterVerifyOtp(
        requestBody: OtpVerifyDto,
    ): CancelablePromise<TokenResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/register-otp-verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authenticationControllerForgotPassword(
        requestBody: ForgotPasswordDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param authorization
     * @returns void
     * @throws ApiError
     */
    public static authenticationControllerLogout(
        authorization: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/signout',
            headers: {
                'authorization': authorization,
            },
        });
    }
    /**
     * @param requestBody
     * @returns TokenResponseDto
     * @throws ApiError
     */
    public static authenticationControllerRefresh(
        requestBody: RefreshTokenDto,
    ): CancelablePromise<TokenResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static authenticationControllerSendConfirmationEmail(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/auth/send-confirmation-email',
        });
    }
    /**
     * @param token
     * @returns any
     * @throws ApiError
     */
    public static authenticationControllerConfirmEmail(
        token: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/auth/confirm-email',
            query: {
                'token': token,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static authenticationControllerSendPhoneOtp(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/auth/send-phone-otp',
        });
    }
    /**
     * @param requestBody
     * @returns TokenResponseDto
     * @throws ApiError
     */
    public static authenticationControllerVerifyOtp(
        requestBody: OtpVerifyDto,
    ): CancelablePromise<TokenResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/otp-verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static authenticationControllerDeleteAccount(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/api/auth/delete-my-account',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authenticationControllerCreateContactForm(
        requestBody: ContactFormDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/contact-us',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static authenticationControllerValidateToken(
        requestBody: ValidateTokenDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/api/auth/validate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
