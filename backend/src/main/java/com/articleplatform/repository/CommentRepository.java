package com.articleplatform.repository;

import com.articleplatform.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Spring Data JPA repository for {@link Comment} entities.
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {

    /**
     * Returns root-level comments (no parent) for a given article, ordered by creation date ascending.
     *
     * @param articleId the article ID to query
     * @return list of root comments
     */
    List<Comment> findByArticleIdAndParentCommentIdIsNullOrderByCreatedAtAsc(Long articleId);

    /**
     * Returns direct replies to a given parent comment, ordered by creation date ascending.
     *
     * @param parentId the parent comment ID
     * @return list of reply comments
     */
    List<Comment> findByParentCommentIdOrderByCreatedAtAsc(Long parentId);

    /**
     * Counts root-level comments for an article without loading comment entities.
     *
     * @param articleId the article ID to count for
     * @return number of root-level comments
     */
    long countByArticleIdAndParentCommentIdIsNull(Long articleId);
}
