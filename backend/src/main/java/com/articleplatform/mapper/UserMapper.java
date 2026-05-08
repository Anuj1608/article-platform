package com.articleplatform.mapper;

import com.articleplatform.dto.response.UserSummaryResponse;
import com.articleplatform.entity.User;
import org.mapstruct.Mapper;

/**
 * MapStruct mapper for converting {@link User} entities to response DTOs.
 */
@Mapper(componentModel = "spring")
public interface UserMapper {

    /**
     * Converts a User entity to a compact summary response.
     *
     * @param user the user entity
     * @return summary DTO containing id and username
     */
    UserSummaryResponse toSummaryResponse(User user);
}
