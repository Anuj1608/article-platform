package com.articleplatform.dto.request;

import jakarta.validation.constraints.*;

/**
 * Request DTO for user authentication.
 */
public record LoginRequest(

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid email address")
    String email,

    @NotBlank(message = "Password is required")
    String password
) {}
