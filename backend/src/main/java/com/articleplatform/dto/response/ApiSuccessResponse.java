package com.articleplatform.dto.response;

/**
 * Standard success response envelope for all API endpoints.
 *
 * @param <T> the type of the data payload
 */
public record ApiSuccessResponse<T>(boolean success, T data) {

    /**
     * Creates a success response wrapping the given data.
     *
     * @param data the response payload
     * @param <T>  type of the payload
     * @return wrapped success response with success=true
     */
    public static <T> ApiSuccessResponse<T> of(T data) {
        return new ApiSuccessResponse<>(true, data);
    }
}
