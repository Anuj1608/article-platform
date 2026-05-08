package com.articleplatform.service;

import com.articleplatform.dto.request.CreateCommentRequest;
import com.articleplatform.dto.response.CommentResponse;
import com.articleplatform.dto.response.ReactionResponse;
import com.articleplatform.entity.Article;
import com.articleplatform.entity.Comment;
import com.articleplatform.entity.Reaction;
import com.articleplatform.entity.User;
import com.articleplatform.exception.ResourceNotFoundException;
import com.articleplatform.mapper.CommentMapper;
import com.articleplatform.repository.ArticleRepository;
import com.articleplatform.repository.CommentRepository;
import com.articleplatform.repository.ReactionRepository;
import com.articleplatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Service for comment management including threaded replies and reactions.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private static final String TARGET_TYPE_COMMENT = "COMMENT";
    private static final int MAX_REPLY_DEPTH = 10;
    private static final String REACTION_LIKE = "LIKE";
    private static final String REACTION_DISLIKE = "DISLIKE";

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final ReactionRepository reactionRepository;
    private final CommentMapper commentMapper;
    private final TagService tagService;

    /**
     * Returns the root-level comments for an article with nested replies and reaction counts.
     *
     * @param articleId     the ID of the article
     * @param currentUserId the ID of the requesting user, or null if anonymous
     * @return list of root CommentResponse objects with replies embedded recursively
     */
    public List<CommentResponse> getComments(Long articleId, Long currentUserId) {
        return commentRepository
                .findByArticleIdAndParentCommentIdIsNullOrderByCreatedAtAsc(articleId)
                .stream()
                .map(comment -> buildCommentResponse(comment, currentUserId, 0))
                .toList();
    }

    /**
     * Adds a root-level comment to an article.
     * Parses @mentions from the body and persists Tag records.
     *
     * @param articleId the ID of the article to comment on
     * @param req       the comment creation request
     * @param authorId  the ID of the authenticated user
     * @return the created CommentResponse with zero reaction counts
     * @throws ResourceNotFoundException if the article or author does not exist
     */
    @Transactional
    public CommentResponse addComment(Long articleId, CreateCommentRequest req, Long authorId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found: " + articleId));
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + authorId));

        Comment comment = Comment.builder()
                .body(req.body())
                .article(article)
                .author(author)
                .parentComment(null)
                .createdAt(Instant.now())
                .build();

        Comment saved = commentRepository.save(comment);
        tagService.parseAndSaveTags(req.body(), TARGET_TYPE_COMMENT, saved.getId(), authorId);
        return commentMapper.toResponse(saved, 0L, 0L, null, List.of());
    }

    /**
     * Adds a reply to an existing comment.
     * Parses @mentions from the body and persists Tag records.
     *
     * @param parentCommentId the ID of the comment being replied to
     * @param req             the reply creation request
     * @param authorId        the ID of the authenticated user
     * @return the created CommentResponse with zero reaction counts
     * @throws ResourceNotFoundException if the parent comment or author does not exist
     */
    @Transactional
    public CommentResponse addReply(Long parentCommentId, CreateCommentRequest req, Long authorId) {
        Comment parent = commentRepository.findById(parentCommentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found: " + parentCommentId));
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + authorId));

        Comment reply = Comment.builder()
                .body(req.body())
                .article(parent.getArticle())
                .author(author)
                .parentComment(parent)
                .createdAt(Instant.now())
                .build();

        Comment saved = commentRepository.save(reply);
        tagService.parseAndSaveTags(req.body(), TARGET_TYPE_COMMENT, saved.getId(), authorId);
        return commentMapper.toResponse(saved, 0L, 0L, null, List.of());
    }

    /**
     * Toggles a reaction (LIKE or DISLIKE) on a comment for the given user.
     * <ul>
     *   <li>Same reaction already exists — removes it (userReaction returns null)</li>
     *   <li>Opposite reaction exists — replaces it with the new type</li>
     *   <li>No reaction exists — adds the new reaction</li>
     * </ul>
     *
     * @param commentId    the ID of the comment to react to
     * @param userId       the ID of the authenticated user
     * @param reactionType "LIKE" or "DISLIKE"
     * @return ReactionResponse with updated counts and the user's current reaction
     * @throws ResourceNotFoundException if the comment does not exist
     */
    @Transactional
    public ReactionResponse toggleReaction(Long commentId, Long userId, String reactionType) {
        if (!REACTION_LIKE.equals(reactionType) && !REACTION_DISLIKE.equals(reactionType)) {
            throw new IllegalArgumentException("Invalid reaction type: " + reactionType);
        }
        if (!commentRepository.existsById(commentId)) {
            throw new ResourceNotFoundException("Comment not found: " + commentId);
        }
        Optional<Reaction> existing = reactionRepository
                .findByUserIdAndTargetTypeAndTargetId(userId, TARGET_TYPE_COMMENT, commentId);
        if (existing.isPresent()) {
            if (existing.get().getReactionType().equals(reactionType)) {
                reactionRepository.deleteByUserIdAndTargetTypeAndTargetId(userId, TARGET_TYPE_COMMENT, commentId);
            } else {
                existing.get().setReactionType(reactionType);
                reactionRepository.save(existing.get());
            }
        } else {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
            reactionRepository.save(Reaction.builder()
                    .user(user)
                    .targetType(TARGET_TYPE_COMMENT)
                    .targetId(commentId)
                    .reactionType(reactionType)
                    .createdAt(Instant.now())
                    .build());
        }
        long likeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                TARGET_TYPE_COMMENT, commentId, REACTION_LIKE);
        long dislikeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                TARGET_TYPE_COMMENT, commentId, REACTION_DISLIKE);
        String userReaction = reactionRepository
                .findByUserIdAndTargetTypeAndTargetId(userId, TARGET_TYPE_COMMENT, commentId)
                .map(Reaction::getReactionType)
                .orElse(null);
        return new ReactionResponse(likeCount, dislikeCount, userReaction);
    }

    /**
     * Recursively builds a CommentResponse tree for a given comment,
     * computing reaction counts and userReaction from the repository.
     *
     * @param comment       the comment entity to convert
     * @param currentUserId the ID of the requesting user, or null if anonymous
     * @return CommentResponse with nested replies and reaction data
     */
    private CommentResponse buildCommentResponse(Comment comment, Long currentUserId, int depth) {
        List<CommentResponse> replies = depth >= MAX_REPLY_DEPTH ? List.of()
                : commentRepository.findByParentCommentIdOrderByCreatedAtAsc(comment.getId())
                        .stream()
                        .map(reply -> buildCommentResponse(reply, currentUserId, depth + 1))
                        .toList();
        long likeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                TARGET_TYPE_COMMENT, comment.getId(), REACTION_LIKE);
        long dislikeCount = reactionRepository.countByTargetTypeAndTargetIdAndReactionType(
                TARGET_TYPE_COMMENT, comment.getId(), REACTION_DISLIKE);
        String userReaction = currentUserId == null ? null
                : reactionRepository.findByUserIdAndTargetTypeAndTargetId(currentUserId, TARGET_TYPE_COMMENT, comment.getId())
                        .map(Reaction::getReactionType)
                        .orElse(null);
        return commentMapper.toResponse(comment, likeCount, dislikeCount, userReaction, replies);
    }
}
