package com.articleplatform.controller;

import com.articleplatform.dto.request.CreateArticleRequest;
import com.articleplatform.dto.response.ApiSuccessResponse;
import com.articleplatform.dto.response.ArticleListResponse;
import com.articleplatform.dto.response.ArticleResponse;
import com.articleplatform.security.ArticlePlatformUserDetails;
import com.articleplatform.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for article listing, detail, and creation.
 * Contains no business logic — delegates entirely to {@link ArticleService}.
 */
@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    /**
     * Returns a paginated list of articles sorted by newest first.
     * Page size is capped at 50 to prevent unbounded result sets.
     *
     * @param pageable    pagination parameters (page, size — max 50)
     * @param userDetails the currently authenticated user, or null if anonymous
     * @return 200 with paginated ArticleListResponse
     */
    @GetMapping
    public ApiSuccessResponse<Page<ArticleListResponse>> getArticles(
            @PageableDefault(size = 20) Pageable pageable,
            @AuthenticationPrincipal ArticlePlatformUserDetails userDetails) {
        Long userId = userDetails != null ? userDetails.getUserId() : null;
        Pageable capped = pageable.getPageSize() > 50
                ? PageRequest.of(pageable.getPageNumber(), 50, pageable.getSort())
                : pageable;
        return ApiSuccessResponse.of(articleService.getArticles(capped, userId));
    }

    /**
     * Returns the full detail of a single article.
     *
     * @param id          the article ID
     * @param userDetails the currently authenticated user, or null if anonymous
     * @return 200 with ArticleResponse
     */
    @GetMapping("/{id}")
    public ApiSuccessResponse<ArticleResponse> getArticle(
            @PathVariable Long id,
            @AuthenticationPrincipal ArticlePlatformUserDetails userDetails) {
        Long userId = userDetails != null ? userDetails.getUserId() : null;
        return ApiSuccessResponse.of(articleService.getArticle(id, userId));
    }

    /**
     * Searches articles whose title or body contains the given query string,
     * case-insensitive, ordered by newest first. Public endpoint — no authentication required.
     *
     * @param q           the search term
     * @param pageable    pagination parameters (page, size, sort)
     * @param userDetails the currently authenticated user, or null if anonymous
     * @return 200 with a paginated list of matching ArticleListResponse objects
     */
    @GetMapping("/search")
    public ApiSuccessResponse<Page<ArticleListResponse>> searchArticles(
            @RequestParam String q,
            Pageable pageable,
            @AuthenticationPrincipal ArticlePlatformUserDetails userDetails) {
        Long userId = userDetails != null ? userDetails.getUserId() : null;
        return ApiSuccessResponse.of(articleService.searchArticles(q, pageable, userId));
    }

    /**
     * Creates a new article for the currently authenticated user.
     *
     * @param request     the article creation request
     * @param userDetails the currently authenticated user
     * @return 201 with the created ArticleResponse
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiSuccessResponse<ArticleResponse> createArticle(
            @Valid @RequestBody CreateArticleRequest request,
            @AuthenticationPrincipal ArticlePlatformUserDetails userDetails) {
        return ApiSuccessResponse.of(articleService.createArticle(request, userDetails.getUserId()));
    }
}
