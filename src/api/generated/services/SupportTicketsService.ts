/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentDto } from "../models/CommentDto";
import type { CreateCommentDto } from "../models/CreateCommentDto";
import type { CreateSupportTicketDto } from "../models/CreateSupportTicketDto";
import type { PaginatedResponseDto } from "../models/PaginatedResponseDto";
import type { SupportTicketDto } from "../models/SupportTicketDto";
import type { TicketTypeEnum } from "../models/TicketTypeEnum";
import type { UpdateSupportTicketDto } from "../models/UpdateSupportTicketDto";
import type { UpdateSupportTicketStatusDto } from "../models/UpdateSupportTicketStatusDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class SupportTicketsService {
  /**
   * Get all active support tickets
   * Returns a list of all non-deleted support tickets in the system.
   * @returns SupportTicketDto List of active support tickets returned successfully
   * @throws ApiError
   */
  public static supportTicketsControllerList(): CancelablePromise<
    Array<SupportTicketDto>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v1/api/support-tickets/list",
      errors: {
        401: `Unauthorized if access token is missing or invalid`,
      },
    });
  }
  /**
   * Search and filter support tickets
   * Returns paginated support tickets with filtering and search capabilities.
   * @param search
   * @param status
   * @param type
   * @param createdById Filter by creator ID
   * @param assignedToId Filter by an assigned user ID
   * @param tag Filter by a specific tag
   * @param page
   * @param limit
   * @param orderBy
   * @param order
   * @param search
   * @param status
   * @param type
   * @param createdById Filter by creator ID
   * @param assignedToId Filter by an assigned user ID
   * @param tag Filter by a specific tag
   * @param page
   * @param limit
   * @param orderBy
   * @param order
   * @returns PaginatedResponseDto Paginated list of support tickets returned successfully
   * @throws ApiError
   */
  public static supportTicketsControllerFindAll(
    search?: string,
    status?: string,
    type?: TicketTypeEnum,
    createdById?: number,
    assignedToId?: number,
    tag?: string,
    page?: number,
    limit?: number,
    orderBy?: string,
    order?: string
  ): CancelablePromise<PaginatedResponseDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v1/api/support-tickets",
      query: {
        search: search,
        status: status,
        type: type,
        createdById: createdById,
        assignedToId: assignedToId,
        tag: tag,
        page: page,
        limit: limit,
        orderBy: orderBy,
        order: order,
      },
      errors: {
        400: `Invalid query parameters provided`,
      },
    });
  }
  /**
   * Create new support ticket
   * Creates a new support ticket with the provided details.
   * @param requestBody
   * @returns SupportTicketDto Support ticket created successfully
   * @throws ApiError
   */
  public static supportTicketsControllerCreate(
    requestBody: CreateSupportTicketDto
  ): CancelablePromise<SupportTicketDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/v1/api/support-tickets",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        400: `Invalid input data provided`,
      },
    });
  }
  /**
   * Get support ticket details
   * Returns complete details of a specific support ticket by its public key.
   * @param pubkey Unique public identifier of the support ticket
   * @returns SupportTicketDto Support ticket details returned successfully
   * @throws ApiError
   */
  public static supportTicketsControllerFindOne(
    pubkey: string
  ): CancelablePromise<SupportTicketDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v1/api/support-tickets/{pubkey}",
      path: {
        pubkey: pubkey,
      },
      errors: {
        404: `Support ticket with specified pubkey not found`,
      },
    });
  }
  /**
   * Update support ticket
   * Updates the details of an existing support ticket.
   * @param pubkey Public key of the support ticket to update
   * @param requestBody
   * @returns SupportTicketDto Support ticket updated successfully
   * @throws ApiError
   */
  public static supportTicketsControllerUpdate(
    pubkey: string,
    requestBody: UpdateSupportTicketDto
  ): CancelablePromise<SupportTicketDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/v1/api/support-tickets/{pubkey}",
      path: {
        pubkey: pubkey,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        409: `Version conflict during update`,
      },
    });
  }
  /**
   * Delete support ticket
   * Soft-deletes a support ticket by marking it as deleted.
   * @param pubkey Public key of the support ticket to delete
   * @returns void
   * @throws ApiError
   */
  public static supportTicketsControllerRemove(
    pubkey: string
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/v1/api/support-tickets/{pubkey}",
      path: {
        pubkey: pubkey,
      },
      errors: {
        404: `Support ticket with specified pubkey not found`,
      },
    });
  }
  /**
   * Add comment to ticket
   * Adds a new comment to the specified support ticket.
   * @param pubkey Public key of the support ticket to comment on
   * @param requestBody
   * @returns CommentDto Comment added successfully
   * @throws ApiError
   */
  public static supportTicketsControllerAddComment(
    pubkey: string,
    requestBody: CreateCommentDto
  ): CancelablePromise<CommentDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/v1/api/support-tickets/{pubkey}/comments",
      path: {
        pubkey: pubkey,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        404: `Support ticket with specified pubkey not found`,
      },
    });
  }
  /**
   * Mark comments as seen
   * Marks all unread comments on a ticket as seen by the current user.
   * @param pubkey Public key of the support ticket
   * @returns CommentDto Comments marked as seen successfully
   * @throws ApiError
   */
  public static supportTicketsControllerMarkCommentsAsSeen(
    pubkey: string
  ): CancelablePromise<Array<CommentDto>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/v1/api/support-tickets/{pubkey}/comments/mark-as-seen",
      path: {
        pubkey: pubkey,
      },
    });
  }
  /**
   * Update ticket status
   * Updates the workflow status of a support ticket with optional additional fields.
   * @param pubkey Public key of the support ticket to update
   * @param requestBody
   * @returns SupportTicketDto Ticket status updated successfully
   * @throws ApiError
   */
  public static supportTicketsControllerUpdateStatus(
    pubkey: string,
    requestBody: UpdateSupportTicketStatusDto
  ): CancelablePromise<SupportTicketDto> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/v1/api/support-tickets/{pubkey}/status",
      path: {
        pubkey: pubkey,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `User not authorized to perform this status change`,
      },
    });
  }
}
