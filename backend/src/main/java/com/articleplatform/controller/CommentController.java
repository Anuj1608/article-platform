package com.articleplatform.controller;

import com.articleplatform.dto.request.CreateCommentRequest;
import com.articleplatform.dto.response.ApiSuccessResponse;
import com.articleplatform.dto.response.CommentResponse;
import com.articleplatform.security.ArticlePlatformUserDetails;
import com.articleplatform.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for comment operations — listing, creation, and replies.
 * Contains no business logic — delegates entirely to {@link CommentService}.
 */
@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    /**
     * Returns all root-level comments for an article with their nested replies and reaction counts.
     *
     * @param id          the article ID
     * @param userDetails the currently authenticated user, or null if anonymous
     * @return 200 with list of CommentResponse trees
     */
    @GetMapping("/api/articles/{id}/comments")
    public ApiSuccessResponse<List<CommentResponse>> getComments(
            @PathVariable Long id,
            @AuthenticationPrincipal ArticlePlatformUserDetails userDetails) {
        Long userId = userDetails != null ? userDetails.getUserId() : null;
        return ApiSuccessResponse.of(commentService.getComments(id, userId));
    }

    /**
     * Adds a root-level comment to an article.
     *
     * @param id          the article ID
     * @param request     the comment creation request
     * @param userDetails the currently authenticated user
     * @return 201 with the created CommentResponse
     */
    @PostMapping("/api/articles/{id}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiSuccessResponse<CommentResponse> addComment(
            @PathVariable Long id,
            @Valid @RequestBody CreateCommentRequest request,
            @AuthenticationPrincipal ArticlePlatformUserDetails userDetails) {
        return ApiSuccessResponse.of(commentService.addComment(id, request, userDetails.getUserId()));
    }

    /**
     * Adds a reply to an existing comment.
     *
     * @param id          the parent comment ID
     * @param request     the reply creation request
     * @param userDetails the currently authenticated user
     * @return 201 with the created CommentResponse
     */
    @PostMapping("/api/comments/{id}/replies")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiSuccessResponse<CommentResponse> addReply(
            @PathVariable Long id,
            @Valid @RequestBody CreateCommentRequest request,
            @AuthenticationPrincipal ArticlePlatformUserDetails userDetails) {
        return ApiSuccessResponse.of(commentService.addReply(id, request, userDetails.getUserId()));
    }
}
