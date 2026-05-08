package com.articleplatform.mapper;

import com.articleplatform.dto.response.CommentResponse;
import com.articleplatform.dto.response.UserSummaryResponse;
import com.articleplatform.entity.Comment;
import java.time.Instant;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-07T18:00:59+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 25.0.2 (Homebrew)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public CommentResponse toResponse(Comment comment, long likeCount, long dislikeCount, String userReaction, List<CommentResponse> replies) {
        if ( comment == null && userReaction == null && replies == null ) {
            return null;
        }

        Long id = null;
        String body = null;
        UserSummaryResponse author = null;
        Instant createdAt = null;
        if ( comment != null ) {
            id = comment.getId();
            body = comment.getBody();
            author = userMapper.toSummaryResponse( comment.getAuthor() );
            createdAt = comment.getCreatedAt();
        }

        List<CommentResponse> replies1 = replies;
        long likeCount1 = likeCount;
        long dislikeCount1 = dislikeCount;
        String userReaction1 = userReaction;

        CommentResponse commentResponse = new CommentResponse( id, body, author, createdAt, likeCount1, dislikeCount1, userReaction1, replies1 );

        return commentResponse;
    }
}
