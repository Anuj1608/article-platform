package com.articleplatform.dto.response;

/**
 * Compact user representation used inside other response DTOs.
 */
public record UserSummaryResponse(
    Long id,
    String username
) {}
