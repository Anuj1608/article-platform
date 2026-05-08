package com.articleplatform.mapper;

import com.articleplatform.dto.response.ArticleListResponse;
import com.articleplatform.dto.response.ArticleResponse;
import com.articleplatform.dto.response.UserSummaryResponse;
import com.articleplatform.entity.Article;
import java.time.Instant;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-07T18:00:59+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 25.0.2 (Homebrew)"
)
@Component
public class ArticleMapperImpl implements ArticleMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public ArticleResponse toResponse(Article article, long likeCount, long dislikeCount, long commentCount, String userReaction) {
        if ( article == null && userReaction == null ) {
            return null;
        }

        Long id = null;
        String title = null;
        String body = null;
        String coverImageUrl = null;
        UserSummaryResponse author = null;
        Instant createdAt = null;
        if ( article != null ) {
            id = article.getId();
            title = article.getTitle();
            body = article.getBody();
            coverImageUrl = article.getCoverImageUrl();
            author = userMapper.toSummaryResponse( article.getAuthor() );
            createdAt = article.getCreatedAt();
        }

        long likeCount1 = likeCount;
        long dislikeCount1 = dislikeCount;
        long commentCount1 = commentCount;
        String userReaction1 = userReaction;

        ArticleResponse articleResponse = new ArticleResponse( id, title, body, coverImageUrl, author, createdAt, likeCount1, dislikeCount1, commentCount1, userReaction1 );

        return articleResponse;
    }

    @Override
    public ArticleListResponse toListResponse(Article article, String excerpt, long likeCount, long dislikeCount, long commentCount, String userReaction) {
        if ( article == null && excerpt == null && userReaction == null ) {
            return null;
        }

        Long id = null;
        String title = null;
        String coverImageUrl = null;
        UserSummaryResponse author = null;
        Instant createdAt = null;
        if ( article != null ) {
            id = article.getId();
            title = article.getTitle();
            coverImageUrl = article.getCoverImageUrl();
            author = userMapper.toSummaryResponse( article.getAuthor() );
            createdAt = article.getCreatedAt();
        }

        String excerpt1 = excerpt;
        long likeCount1 = likeCount;
        long dislikeCount1 = dislikeCount;
        long commentCount1 = commentCount;
        String userReaction1 = userReaction;

        ArticleListResponse articleListResponse = new ArticleListResponse( id, title, excerpt1, coverImageUrl, author, createdAt, likeCount1, dislikeCount1, commentCount1, userReaction1 );

        return articleListResponse;
    }
}
