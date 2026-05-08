package com.articleplatform.dto.response;

import java.time.Instant;

/**
 * Full article detail response including like/dislike counts, comment count,
 * and the authenticated user's current reaction.
 * {@code userReaction} is "LIKE", "DISLIKE", or null when the requesting user is anonymous
 * or has no reaction.
 */
public record ArticleResponse(
    Long id,
    String title,
    String body,
    String coverImageUrl,
    UserSummaryResponse author,
    Instant createdAt,
    long likeCount,
    long dislikeCount,
    long commentCount,
    String userReaction
) {}
