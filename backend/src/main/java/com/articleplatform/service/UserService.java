package com.articleplatform.service;

import com.articleplatform.dto.response.UserSummaryResponse;
import com.articleplatform.mapper.UserMapper;
import com.articleplatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service for user-facing operations such as search.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    /**
     * Returns users whose username contains the given query string (case-insensitive).
     * Used for @mention autocomplete in the frontend.
     *
     * @param query the search term
     * @return list of matching users as summary DTOs
     */
    public List<UserSummaryResponse> searchUsers(String query) {
        return userRepository.findByUsernameContainingIgnoreCase(query).stream()
                .map(userMapper::toSummaryResponse)
                .toList();
    }
}
