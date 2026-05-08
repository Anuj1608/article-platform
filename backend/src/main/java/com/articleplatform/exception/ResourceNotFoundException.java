package com.articleplatform.exception;

/**
 * Thrown when a requested resource does not exist in the system.
 * Maps to HTTP 404 via {@link GlobalExceptionHandler}.
 */
public class ResourceNotFoundException extends RuntimeException {

    /**
     * Constructs the exception with a descriptive message.
     *
     * @param message description of which resource was not found
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
