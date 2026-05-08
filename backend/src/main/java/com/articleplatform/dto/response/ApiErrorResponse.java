package com.articleplatform.dto.response;

import java.util.Map;

/**
 * Standard error response envelope for all API error cases.
 */
public record ApiErrorResponse(boolean success, String error, Map<String, String> errors) {

    /**
     * Creates a simple error response with a single message.
     *
     * @param error human-readable error message
     * @return error response with success=false
     */
    public static ApiErrorResponse of(String error) {
        return new ApiErrorResponse(false, error, null);
    }

    /**
     * Creates an error response with field-level validation errors.
     *
     * @param error  top-level error message
     * @param errors map of field name to validation message
     * @return error response with field errors map
     */
    public static ApiErrorResponse withErrors(String error, Map<String, String> errors) {
        return new ApiErrorResponse(false, error, errors);
    }
}
