package com.articleplatform.repository;

import com.articleplatform.entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Spring Data JPA repository for {@link Reaction} entities.
 * Provides lookup, delete, and count operations keyed on user, target, and reaction type.
 */
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    /**
     * Finds an existing reaction by user and target (article or comment).
     *
     * @param userId     the user's ID
     * @param targetType "ARTICLE" or "COMMENT"
     * @param targetId   the ID of the target entity
     * @return an Optional containing the reaction if it exists
     */
    Optional<Reaction> findByUserIdAndTargetTypeAndTargetId(Long userId, String targetType, Long targetId);

    /**
     * Deletes the reaction for the given user and target.
     *
     * @param userId     the user's ID
     * @param targetType "ARTICLE" or "COMMENT"
     * @param targetId   the ID of the target entity
     */
    @Modifying
    @Transactional
    void deleteByUserIdAndTargetTypeAndTargetId(Long userId, String targetType, Long targetId);

    /**
     * Counts reactions of a specific type for a given target.
     *
     * @param targetType   "ARTICLE" or "COMMENT"
     * @param targetId     the ID of the target entity
     * @param reactionType "LIKE" or "DISLIKE"
     * @return the count of matching reactions
     */
    long countByTargetTypeAndTargetIdAndReactionType(String targetType, Long targetId, String reactionType);
}
