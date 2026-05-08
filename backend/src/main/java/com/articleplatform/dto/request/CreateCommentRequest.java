package com.articleplatform.dto.request;

import jakarta.validation.constraints.*;

/**
 * Request DTO for creating a comment or reply.
 * {@code parentCommentId} is null for root comments, populated for replies.
 */
public record CreateCommentRequest(

    @NotBlank(message = "Comment body is required")
    String body,

    Long parentCommentId
) {}
