package com.articleplatform.controller;

import com.articleplatform.dto.request.LoginRequest;
import com.articleplatform.dto.request.RegisterRequest;
import com.articleplatform.dto.response.ApiSuccessResponse;
import com.articleplatform.dto.response.AuthResponse;
import com.articleplatform.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for authentication — registration and login endpoints.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Registers a new user account and returns a JWT token.
     *
     * @param request the registration details
     * @return 201 with JWT token and user info
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiSuccessResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiSuccessResponse.of(authService.register(request));
    }

    /**
     * Authenticates a user and returns a JWT token.
     *
     * @param request the login credentials
     * @return 200 with JWT token and user info
     */
    @PostMapping("/login")
    public ApiSuccessResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiSuccessResponse.of(authService.login(request));
    }
}
