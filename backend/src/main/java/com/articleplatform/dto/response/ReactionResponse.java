package com.articleplatform.dto.response;

/**
 * Response DTO returned after toggling a reaction (like/dislike) on an article or comment.
 * {@code userReaction} is "LIKE", "DISLIKE", or null when the reaction was removed.
 */
public record ReactionResponse(long likeCount, long dislikeCount, String userReaction) {}
