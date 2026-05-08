package com.articleplatform.dto.response;

import java.time.Instant;

/**
 * Compact article response used in paginated list views.
 * {@code userReaction} is "LIKE", "DISLIKE", or null for anonymous users.
 */
public record ArticleListResponse(
    Long id,
    String title,
    String excerpt,
    String coverImageUrl,
    UserSummaryResponse author,
    Instant createdAt,
    long likeCount,
    long dislikeCount,
    long commentCount,
    String userReaction
) {}
