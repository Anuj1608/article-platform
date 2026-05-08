package com.articleplatform.exception;

/**
 * Thrown when a uniqueness constraint is violated (e.g. duplicate email or username on registration).
 * Maps to HTTP 409 Conflict via {@link GlobalExceptionHandler}.
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
