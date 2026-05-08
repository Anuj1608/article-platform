package com.articleplatform.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * JPA entity representing a user reaction (LIKE or DISLIKE) on an article or comment.
 * Uniqueness is enforced at the DB level via the uq_reactions_user_target constraint,
 * ensuring a user can only have one reaction per target.
 */
@Entity
@Table(name = "reactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "target_type", nullable = false, length = 10)
    private String targetType;   // "ARTICLE" or "COMMENT"

    @Column(name = "target_id", nullable = false)
    private Long targetId;

    @Column(name = "reaction_type", nullable = false, length = 10)
    private String reactionType; // "LIKE" or "DISLIKE"

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}
