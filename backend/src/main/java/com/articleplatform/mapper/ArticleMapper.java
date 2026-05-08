package com.articleplatform.mapper;

import com.articleplatform.dto.response.ArticleListResponse;
import com.articleplatform.dto.response.ArticleResponse;
import com.articleplatform.entity.Article;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * MapStruct mapper for converting {@link Article} entities to response DTOs.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ArticleMapper {

    /**
     * Converts an Article entity to a full detail response.
     *
     * @param article      the article entity
     * @param likeCount    total number of likes
     * @param dislikeCount total number of dislikes
     * @param commentCount total number of root-level comments
     * @param userReaction the current user's reaction ("LIKE", "DISLIKE", or null)
     * @return fully populated ArticleResponse
     */
    @Mapping(target = "likeCount", expression = "java(likeCount)")
    @Mapping(target = "dislikeCount", expression = "java(dislikeCount)")
    @Mapping(target = "commentCount", expression = "java(commentCount)")
    @Mapping(target = "userReaction", expression = "java(userReaction)")
    ArticleResponse toResponse(Article article, long likeCount, long dislikeCount, long commentCount, String userReaction);

    /**
     * Converts an Article entity to a compact list item response.
     *
     * @param article      the article entity
     * @param likeCount    total number of likes
     * @param dislikeCount total number of dislikes
     * @param commentCount total number of root-level comments
     * @param userReaction the current user's reaction ("LIKE", "DISLIKE", or null)
     * @return ArticleListResponse for use in paginated lists
     */
    @Mapping(target = "excerpt", expression = "java(excerpt)")
    @Mapping(target = "likeCount", expression = "java(likeCount)")
    @Mapping(target = "dislikeCount", expression = "java(dislikeCount)")
    @Mapping(target = "commentCount", expression = "java(commentCount)")
    @Mapping(target = "userReaction", expression = "java(userReaction)")
    ArticleListResponse toListResponse(Article article, String excerpt, long likeCount, long dislikeCount, long commentCount, String userReaction);
}
