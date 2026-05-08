package com.articleplatform.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * Custom {@link UserDetails} implementation that carries the user's database ID.
 * This avoids an additional DB round-trip in controllers when the authenticated user's ID is needed.
 */
public class ArticlePlatformUserDetails implements UserDetails {

    private static final long serialVersionUID = 1L;

    private final Long userId;
    private final String email;
    private final String passwordHash;
    private final Collection<? extends GrantedAuthority> authorities;

    /**
     * Constructs user details with all required fields.
     *
     * @param userId       the database primary key of the user
     * @param email        the user's email (used as JWT subject / Spring Security username)
     * @param passwordHash the BCrypt-hashed password
     * @param authorities  the granted roles
     */
    public ArticlePlatformUserDetails(
            Long userId,
            String email,
            String passwordHash,
            Collection<? extends GrantedAuthority> authorities) {
        this.userId = userId;
        this.email = email;
        this.passwordHash = passwordHash;
        this.authorities = authorities;
    }

    /**
     * Returns the database user ID.
     *
     * @return the user's primary key
     */
    public Long getUserId() {
        return userId;
    }

    /** Returns the user's email address, used as the Spring Security username. */
    @Override
    public String getUsername() {
        return email;
    }

    /** Returns the BCrypt-hashed password. */
    @Override
    public String getPassword() {
        return passwordHash;
    }

    /** Returns the user's granted authorities. */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    /** Account is non-expired. */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /** Account is non-locked. */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /** Credentials are non-expired. */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /** Account is enabled. */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
