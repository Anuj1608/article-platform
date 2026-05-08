package com.articleplatform.controller;

import com.articleplatform.dto.response.ApiSuccessResponse;
import com.articleplatform.dto.response.UserSummaryResponse;
import com.articleplatform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for user search — used by @mention autocomplete in the frontend.
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Searches for users by username fragment (case-insensitive substring match).
     *
     * @param q the search term
     * @return 200 with a list of matching UserSummaryResponse objects
     */
    @GetMapping("/search")
    public ApiSuccessResponse<List<UserSummaryResponse>> searchUsers(@RequestParam String q) {
        return ApiSuccessResponse.of(userService.searchUsers(q));
    }
}
