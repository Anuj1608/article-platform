package com.articleplatform.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

/**
 * Provides JWT token generation, claim extraction, and validation.
 * The signing secret is loaded exclusively from the {@code JWT_SECRET} environment variable.
 */
@Component
@Slf4j
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long expiryHours;

    /**
     * Constructs the provider using externally configured secret and expiry.
     *
     * @param secret      the JWT signing secret — sourced from env var JWT_SECRET
     * @param expiryHours token validity in hours — sourced from env var JWT_EXPIRY_HOURS (default 24)
     */
    public JwtTokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiry-hours:24}") long expiryHours) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expiryHours = expiryHours;
    }

    /**
     * Generates a signed JWT token for the given user.
     * Subject is set to the user's email (Spring Security username).
     *
     * @param userDetails the authenticated user's details
     * @return compact signed JWT string
     */
    public String generateToken(UserDetails userDetails) {
        Instant now = Instant.now();
        Instant expiry = now.plus(expiryHours, ChronoUnit.HOURS);
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(secretKey)
                .compact();
    }

    /**
     * Extracts the username (subject / email) from a JWT token.
     *
     * @param token the compact JWT string
     * @return the email address embedded as the subject claim
     */
    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    /**
     * Validates that the token is well-formed, correctly signed, and not expired.
     *
     * @param token the compact JWT string to validate
     * @return true if valid; false otherwise
     */
    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException ex) {
            log.warn("JWT validation failed: {}", ex.getClass().getSimpleName());
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
