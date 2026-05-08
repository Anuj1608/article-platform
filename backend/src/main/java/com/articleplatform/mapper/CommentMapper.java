package com.articleplatform.mapper;

import com.articleplatform.dto.response.CommentResponse;
import com.articleplatform.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * MapStruct mapper for converting {@link Comment} entities to response DTOs.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface CommentMapper {

    /**
     * Converts a Comment entity to a response DTO with reaction counts and an explicit replies list.
     * The replies list is provided pre-built by the caller to support recursive tree construction.
     *
     * @param comment      the comment entity
     * @param likeCount    total number of likes on this comment
     * @param dislikeCount total number of dislikes on this comment
     * @param userReaction the current user's reaction ("LIKE", "DISLIKE", or null)
     * @param replies      pre-built list of reply CommentResponse objects
     * @return CommentResponse with the provided reaction counts and replies attached
     */
    @Mapping(target = "replies", expression = "java(replies)")
    @Mapping(target = "likeCount", expression = "java(likeCount)")
    @Mapping(target = "dislikeCount", expression = "java(dislikeCount)")
    @Mapping(target = "userReaction", expression = "java(userReaction)")
    CommentResponse toResponse(Comment comment, long likeCount, long dislikeCount, String userReaction, List<CommentResponse> replies);
}
