package com.articleplatform.exception;

import com.articleplatform.dto.response.ApiErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

/**
 * Centralises exception handling across all controllers.
 * Maps domain and framework exceptions to structured HTTP error responses.
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * Handles bean validation failures from {@code @Valid} annotated request bodies.
     *
     * @param ex the validation exception
     * @return 400 with a field-to-message error map
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        fe -> fe.getDefaultMessage() != null ? fe.getDefaultMessage() : "Invalid value",
                        (first, second) -> first
                ));
        return ApiErrorResponse.withErrors("Validation failed", fieldErrors);
    }

    /**
     * Handles requests for resources that do not exist.
     *
     * @param ex the not-found exception
     * @return 404 with the exception message
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return ApiErrorResponse.of(ex.getMessage());
    }

    /**
     * Handles uniqueness conflicts — duplicate email or username on registration.
     * Returns 409 Conflict with a specific field message so the frontend can display it directly.
     */
    @ExceptionHandler(DuplicateResourceException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiErrorResponse handleDuplicate(DuplicateResourceException ex) {
        return ApiErrorResponse.of(ex.getMessage());
    }

    /**
     * Catches SQL unique-constraint violations that slip past application-level checks
     * (e.g. race conditions) and maps them to a 409 with a readable message.
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiErrorResponse handleDataIntegrity(DataIntegrityViolationException ex) {
        String msg = ex.getMessage() != null ? ex.getMessage().toLowerCase() : "";
        if (msg.contains("email")) {
            return ApiErrorResponse.of("Email is already in use");
        }
        if (msg.contains("username")) {
            return ApiErrorResponse.of("Username is already taken");
        }
        return ApiErrorResponse.of("A record with that value already exists");
    }

    /**
     * Handles domain-level invalid argument errors.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleIllegalArgument(IllegalArgumentException ex) {
        return ApiErrorResponse.of(ex.getMessage());
    }

    /**
     * Handles authentication failures such as bad credentials.
     *
     * @param ex the authentication exception
     * @return 401 Unauthorized
     */
    @ExceptionHandler({AuthenticationException.class, BadCredentialsException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiErrorResponse handleAuthentication(RuntimeException ex) {
        return ApiErrorResponse.of("Unauthorized");
    }

    /**
     * Handles Spring Security access denied exceptions.
     *
     * @param ex the access denied exception
     * @return 403 Forbidden
     */
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ApiErrorResponse handleAccessDenied(AccessDeniedException ex) {
        return ApiErrorResponse.of("Forbidden");
    }

    /**
     * Catch-all handler for any unhandled exception.
     * Logs the full stack trace without exposing internal details to the client.
     *
     * @param ex the unhandled exception
     * @return 500 with a generic message
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiErrorResponse handleGeneral(Exception ex) {
        log.error("Unhandled exception", ex);
        return ApiErrorResponse.of("An unexpected error occurred.");
    }
}
