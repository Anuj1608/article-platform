package com.articleplatform.dto.response;

/**
 * Response DTO returned after successful registration or login.
 */
public record AuthResponse(
    String token,
    String username,
    Long userId
) {}
