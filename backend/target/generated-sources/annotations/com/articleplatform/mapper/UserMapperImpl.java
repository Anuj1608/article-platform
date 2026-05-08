package com.articleplatform.mapper;

import com.articleplatform.dto.response.UserSummaryResponse;
import com.articleplatform.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-07T18:00:59+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 25.0.2 (Homebrew)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserSummaryResponse toSummaryResponse(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String username = null;

        id = user.getId();
        username = user.getUsername();

        UserSummaryResponse userSummaryResponse = new UserSummaryResponse( id, username );

        return userSummaryResponse;
    }
}
