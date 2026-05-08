package com.articleplatform.repository;

import com.articleplatform.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Spring Data JPA repository for {@link Tag} entities.
 */
public interface TagRepository extends JpaRepository<Tag, Long> {

    /**
     * Returns all tags for a given source type and source ID.
     *
     * @param sourceType either "ARTICLE" or "COMMENT"
     * @param sourceId   the ID of the source entity
     * @return list of matching tags
     */
    List<Tag> findBySourceTypeAndSourceId(String sourceType, Long sourceId);
}
