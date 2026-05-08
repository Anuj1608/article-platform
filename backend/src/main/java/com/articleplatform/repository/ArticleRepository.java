package com.articleplatform.repository;

import com.articleplatform.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for {@link Article} entities.
 */
public interface ArticleRepository extends JpaRepository<Article, Long> {

    /** Returns a paginated list of all articles ordered by creation date descending. */
    Page<Article> findAllByOrderByCreatedAtDesc(Pageable pageable);

    /**
     * Full-text search across article title and body, case-insensitive,
     * ordered by creation date descending.
     *
     * @param query    the search term
     * @param pageable pagination parameters
     * @return matching articles as a page
     */
    @Query("SELECT a FROM Article a WHERE LOWER(a.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(a.body) LIKE LOWER(CONCAT('%', :query, '%')) ORDER BY a.createdAt DESC")
    Page<Article> searchArticles(@Param("query") String query, Pageable pageable);
}
