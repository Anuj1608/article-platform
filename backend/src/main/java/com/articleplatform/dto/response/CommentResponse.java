package com.articleplatform.dto.response;

import java.time.Instant;
import java.util.List;

/**
 * Response DTO for a comment with its nested replies and reaction counts.
 * {@code userReaction} is "LIKE", "DISLIKE", or null for anonymous users or when
 * the user has no reaction on this comment.
 */
public record CommentResponse(
    Long id,
    String body,
    UserSummaryResponse author,
    Instant createdAt,
    long likeCount,
    long dislikeCount,
    String userReaction,
    List<CommentResponse> replies
) {}
