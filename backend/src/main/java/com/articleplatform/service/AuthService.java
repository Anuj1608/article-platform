package com.articleplatform.service;

import com.articleplatform.dto.request.LoginRequest;
import com.articleplatform.dto.request.RegisterRequest;
import com.articleplatform.dto.response.AuthResponse;
import com.articleplatform.entity.User;
import com.articleplatform.exception.DuplicateResourceException;
import com.articleplatform.repository.UserRepository;
import com.articleplatform.security.ArticlePlatformUserDetails;
import com.articleplatform.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

/**
 * Service handling user registration and authentication.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Registers a new user account.
     * Validates uniqueness of email and username before persisting.
     * Password is BCrypt-hashed — never stored in plain text.
     *
     * @param request the registration details
     * @return an AuthResponse containing a signed JWT and user info
     * @throws IllegalArgumentException if the email or username is already in use
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("Email is already in use");
        }
        if (userRepository.existsByUsername(request.username())) {
            throw new DuplicateResourceException("Username is already taken");
        }

        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .createdAt(Instant.now())
                .build();

        User saved = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(buildUserDetails(saved));
        log.debug("User registered: id={}", saved.getId());
        return new AuthResponse(token, saved.getUsername(), saved.getId());
    }

    /**
     * Authenticates a user by email and password.
     *
     * @param request the login credentials
     * @return an AuthResponse containing a signed JWT and user info
     * @throws BadCredentialsException if the email is not found or the password is incorrect
     */
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        String token = jwtTokenProvider.generateToken(buildUserDetails(user));
        return new AuthResponse(token, user.getUsername(), user.getId());
    }

    private UserDetails buildUserDetails(User user) {
        return new ArticlePlatformUserDetails(
                user.getId(),
                user.getEmail(),
                user.getPasswordHash(),
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
