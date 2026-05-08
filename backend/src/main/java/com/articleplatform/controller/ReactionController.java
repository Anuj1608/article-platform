package com.articleplatform.controller;

import com.articleplatform.dto.response.ApiSuccessResponse;
import com.articleplatform.dto.response.ReactionResponse;
import com.articleplatform.security.ArticlePlatformUserDetails;
import com.articleplatform.service.ArticleService;
import com.articleplatform.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for reaction toggle operations on articles and comments.
 * All endpoints require JWT authentication.
 */
@RestController
@RequiredArgsConstructor
public class ReactionController {

    private final ArticleService articleService;
    private final CommentService commentService;

    /**
     * Toggles a LIKE reaction on an article for the authenticated user.
     * Removes the like if already liked; replaces a dislike if present.
     *
     * @param id the article ID
     * @param u  the currently authenticated user
     * @return 200 with updated ReactionResponse
     */
    @PostMapping("/api/articles/{id}/like")
    public ApiSuccessResponse<ReactionResponse> likeArticle(
            @PathVariable Long id,
            @AuthenticationPrincipal ArticlePlatformUserDetails u) {
        return ApiSuccessResponse.of(articleService.toggleReaction(id, u.getUserId(), "LIKE"));
    }

    /**
     * Toggles a DISLIKE reaction on an article for the authenticated user.
     * Removes the dislike if already disliked; replaces a like if present.
     *
     * @param id the article ID
     * @param u  the currently authenticated user
     * @return 200 with updated ReactionResponse
     */
    @PostMapping("/api/articles/{id}/dislike")
    public ApiSuccessResponse<ReactionResponse> dislikeArticle(
            @PathVariable Long id,
            @AuthenticationPrincipal ArticlePlatformUserDetails u) {
        return ApiSuccessResponse.of(articleService.toggleReaction(id, u.getUserId(), "DISLIKE"));
    }

    /**
     * Toggles a LIKE reaction on a comment for the authenticated user.
     * Removes the like if already liked; replaces a dislike if present.
     *
     * @param id the comment ID
     * @param u  the currently authenticated user
     * @return 200 with updated ReactionResponse
     */
    @PostMapping("/api/comments/{id}/like")
    public ApiSuccessResponse<ReactionResponse> likeComment(
            @PathVariable Long id,
            @AuthenticationPrincipal ArticlePlatformUserDetails u) {
        return ApiSuccessResponse.of(commentService.toggleReaction(id, u.getUserId(), "LIKE"));
    }

    /**
     * Toggles a DISLIKE reaction on a comment for the authenticated user.
     * Removes the dislike if already disliked; replaces a like if present.
     *
     * @param id the comment ID
     * @param u  the currently authenticated user
     * @return 200 with updated ReactionResponse
     */
    @PostMapping("/api/comments/{id}/dislike")
    public ApiSuccessResponse<ReactionResponse> dislikeComment(
            @PathVariable Long id,
            @AuthenticationPrincipal ArticlePlatformUserDetails u) {
        return ApiSuccessResponse.of(commentService.toggleReaction(id, u.getUserId(), "DISLIKE"));
    }
}
