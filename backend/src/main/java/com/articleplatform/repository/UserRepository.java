package com.articleplatform.repository;

import com.articleplatform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for {@link User} entities.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /** Finds a user by their email address. */
    Optional<User> findByEmail(String email);

    /** Finds a user by their username. */
    Optional<User> findByUsername(String username);

    /** Returns true if a user with the given email exists. */
    boolean existsByEmail(String email);

    /** Returns true if a user with the given username exists. */
    boolean existsByUsername(String username);

    /** Returns users whose username contains the query string (case-insensitive). */
    List<User> findByUsernameContainingIgnoreCase(String query);
}
