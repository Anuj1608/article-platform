package com.articleplatform.dto.request;

import jakarta.validation.constraints.*;

/**
 * Request DTO for creating a new article.
 */
public record CreateArticleRequest(

    @NotBlank(message = "Title is required")
    @Size(max = 500, message = "Title must not exceed 500 characters")
    String title,

    @NotBlank(message = "Body is required")
    String body,

    @Size(max = 500, message = "Cover image URL must not exceed 500 characters")
    String coverImageUrl
) {}
