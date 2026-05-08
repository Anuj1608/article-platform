package com.articleplatform.service;

import com.articleplatform.dto.request.CreateArticleRequest;
import com.articleplatform.dto.response.ArticleListResponse;
import com.articleplatform.dto.response.ArticleResponse;
import com.articleplatform.dto.response.ReactionResponse;
import com.articleplatform.entity.Article;
import com.articleplatform.entity.Reaction;
import com.articleplatform.entity.User;
import com.articleplatform.exception.ResourceNotFoundException;
import com.articleplatform.mapper.ArticleMapper;
import com.articleplatform.repository.ArticleRepository;
import com.articleplatform.repository.CommentRepository;
import com.articleplatform.repository.ReactionRepository;
import com.articleplatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

/**
 * Service for article CRUD operations, reactions, and paginated queries.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArticleService {

    private static final String TARGET_TYPE_ARTICLE = "ARTICLE";
    private static final String REACTION_LIKE = "LIKE";
    private static final String REACTION_DISLIKE = "DISLIKE";

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final ReactionRepository reactionRepository;
    private final CommentRepository commentRepository;
    private final ArticleMapper articleMapper;
    private final TagService tagService;

    /**
     * Returns a paginated list of articles ordered by newest first,
     * including like/dislike counts and the current user's reaction.
     *
     * @param pageable      pagination parameters
     * @param currentUserId the ID of the requesting user, or null if anonymous
     * @return page of ArticleListResponse
     */
    public Page<ArticleListResponse> getArticles(Pageable pageable, Long currentUserId) {
        return articleRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(article -> {
                    long likeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                            TARGET_TYPE_ARTICLE, article.getId(), REACTION_LIKE);
                    long dislikeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                            TARGET_TYPE_ARTICLE, article.getId(), REACTION_DISLIKE);
                    long commentCount = commentRepository.countByArticleIdAndParentCommentIdIsNull(article.getId());
                    String userReaction = resolveUserReaction(currentUserId, TARGET_TYPE_ARTICLE, article.getId());
                    String excerpt = buildExcerpt(article.getBody());
                    return articleMapper.toListResponse(article, excerpt, likeCount, dislikeCount, commentCount, userReaction);
                });
    }

    /**
     * Returns a paginated list of articles whose title or body contains the given query string,
     * case-insensitive, ordered by newest first.
     * Reaction counts, comment count, excerpt, and the current user's reaction are resolved
     * using the same logic as {@link #getArticles}.
     *
     * @param query         the search term
     * @param pageable      pagination parameters
     * @param currentUserId the ID of the requesting user, or null if anonymous
     * @return page of ArticleListResponse matching the search term
     */
    public Page<ArticleListResponse> searchArticles(String query, Pageable pageable, Long currentUserId) {
        return articleRepository.searchArticles(query, pageable)
                .map(article -> {
                    long likeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                            TARGET_TYPE_ARTICLE, article.getId(), REACTION_LIKE);
                    long dislikeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                            TARGET_TYPE_ARTICLE, article.getId(), REACTION_DISLIKE);
                    long commentCount = commentRepository.countByArticleIdAndParentCommentIdIsNull(article.getId());
                    String userReaction = resolveUserReaction(currentUserId, TARGET_TYPE_ARTICLE, article.getId());
                    String excerpt = buildExcerpt(article.getBody());
                    return articleMapper.toListResponse(article, excerpt, likeCount, dislikeCount, commentCount, userReaction);
                });
    }

    /**
     * Returns the full detail of a single article including like/dislike counts, comment count,
     * and the current user's reaction (null for anonymous users).
     *
     * @param id            the article ID
     * @param currentUserId the ID of the requesting user, or null if anonymous
     * @return ArticleResponse with all fields populated
     * @throws ResourceNotFoundException if no article with the given ID exists
     */
    public ArticleResponse getArticle(Long id, Long currentUserId) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found: " + id));
        long likeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                TARGET_TYPE_ARTICLE, id, REACTION_LIKE);
        long dislikeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                TARGET_TYPE_ARTICLE, id, REACTION_DISLIKE);
        long commentCount = commentRepository.countByArticleIdAndParentCommentIdIsNull(id);
        String userReaction = resolveUserReaction(currentUserId, TARGET_TYPE_ARTICLE, id);
        return articleMapper.toResponse(article, likeCount, dislikeCount, commentCount, userReaction);
    }

    /**
     * Creates a new article authored by the given user.
     * Parses and saves @mention tags from the article body.
     *
     * @param request  the article creation request
     * @param authorId the ID of the authenticated author
     * @return the created ArticleResponse with zero counts and null userReaction
     * @throws ResourceNotFoundException if the author does not exist
     */
    @Transactional
    public ArticleResponse createArticle(CreateArticleRequest request, Long authorId) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + authorId));

        Article article = Article.builder()
                .title(request.title())
                .body(request.body())
                .coverImageUrl(request.coverImageUrl())
                .author(author)
                .createdAt(Instant.now())
                .build();

        Article saved = articleRepository.save(article);
        tagService.parseAndSaveTags(request.body(), TARGET_TYPE_ARTICLE, saved.getId(), authorId);
        return articleMapper.toResponse(saved, 0L, 0L, 0L, null);
    }

    /**
     * Toggles a reaction (LIKE or DISLIKE) on an article for the given user.
     * <ul>
     *   <li>Same reaction already exists — removes it (userReaction returns null)</li>
     *   <li>Opposite reaction exists — replaces it with the new type</li>
     *   <li>No reaction exists — adds the new reaction</li>
     * </ul>
     *
     * @param articleId    the ID of the article to react to
     * @param userId       the ID of the authenticated user
     * @param reactionType "LIKE" or "DISLIKE"
     * @return ReactionResponse with updated counts and the user's current reaction
     * @throws ResourceNotFoundException if the article does not exist
     */
    @Transactional
    public ReactionResponse toggleReaction(Long articleId, Long userId, String reactionType) {
        if (!REACTION_LIKE.equals(reactionType) && !REACTION_DISLIKE.equals(reactionType)) {
            throw new IllegalArgumentException("Invalid reaction type: " + reactionType);
        }
        if (!articleRepository.existsById(articleId)) {
            throw new ResourceNotFoundException("Article not found: " + articleId);
        }
        Optional<Reaction> existing = reactionRepository
                .findByUserIdAndTargetTypeAndTargetId(userId, TARGET_TYPE_ARTICLE, articleId);
        if (existing.isPresent()) {
            if (existing.get().getReactionType().equals(reactionType)) {
                reactionRepository.deleteByUserIdAndTargetTypeAndTargetId(userId, TARGET_TYPE_ARTICLE, articleId);
            } else {
                existing.get().setReactionType(reactionType);
                reactionRepository.save(existing.get());
            }
        } else {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
            reactionRepository.save(Reaction.builder()
                    .user(user)
                    .targetType(TARGET_TYPE_ARTICLE)
                    .targetId(articleId)
                    .reactionType(reactionType)
                    .createdAt(Instant.now())
                    .build());
        }
        long likeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                TARGET_TYPE_ARTICLE, articleId, REACTION_LIKE);
        long dislikeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                TARGET_TYPE_ARTICLE, articleId, REACTION_DISLIKE);
        String userReaction = reactionRepository
                .findByUserIdAndTargetTypeAndTargetId(userId, TARGET_TYPE_ARTICLE, articleId)
                .map(Reaction::getReactionType)
                .orElse(null);
        return new ReactionResponse(likeCount, dislikeCount, userReaction);
    }

    /**
     * Strips inline image markdown from an article body and truncates to 160 characters.
     *
     * @param body the raw article body, may be null
     * @return plain-text excerpt of at most 160 characters, or null if body is null
     */
    private static String buildExcerpt(String body) {
        if (body == null) return null;
        // Strip inline image markdown before excerpting
        String plain = body.replaceAll("!\\[[^\\]]*\\]\\([^)]*\\)", "").trim();
        return plain.length() <= 160 ? plain : plain.substring(0, 160) + "…";
    }

    private String resolveUserReaction(Long userId, String targetType, Long targetId) {
        if (userId == null) {
            return null;
        }
        return reactionRepository.findByUserIdAndTargetTypeAndTargetId(userId, targetType, targetId)
                .map(Reaction::getReactionType)
                .orElse(null);
    }
}
