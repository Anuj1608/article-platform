package com.articleplatform.service;

import com.articleplatform.dto.request.CreateArticleRequest;
import com.articleplatform.dto.response.ArticleListResponse;
import com.articleplatform.dto.response.ArticleResponse;
import com.articleplatform.dto.response.ReactionResponse;
import com.articleplatform.dto.response.UserSummaryResponse;
import com.articleplatform.entity.Article;
import com.articleplatform.entity.Reaction;
import com.articleplatform.entity.User;
import com.articleplatform.exception.ResourceNotFoundException;
import com.articleplatform.mapper.ArticleMapper;
import com.articleplatform.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link ArticleService}.
 */
@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReactionRepository reactionRepository;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private ArticleMapper articleMapper;

    @Mock
    private TagService tagService;

    @InjectMocks
    private ArticleService articleService;

    private User makeUser(Long id, String username) {
        return User.builder().id(id).username(username)
                .email(username + "@example.com").passwordHash("h").createdAt(Instant.now()).build();
    }

    @Test
    void createArticle_success_savesArticleAndCallsTagService() {
        CreateArticleRequest request = new CreateArticleRequest("Title", "Hello @bob");
        User author = makeUser(1L, "alice");

        when(userRepository.findById(1L)).thenReturn(Optional.of(author));
        Article savedArticle = Article.builder().id(10L).title("Title").body("Hello @bob")
                .author(author).createdAt(Instant.now()).build();
        when(articleRepository.save(any(Article.class))).thenReturn(savedArticle);

        UserSummaryResponse authorSummary = new UserSummaryResponse(1L, "alice");
        ArticleResponse mockResponse = new ArticleResponse(10L, "Title", "Hello @bob",
                authorSummary, Instant.now(), 0L, 0L, 0L, null);
        when(articleMapper.toResponse(savedArticle, 0L, 0L, 0L, null)).thenReturn(mockResponse);

        ArticleResponse result = articleService.createArticle(request, 1L);

        assertThat(result.id()).isEqualTo(10L);
        assertThat(result.title()).isEqualTo("Title");
        verify(articleRepository).save(any(Article.class));
        verify(tagService).parseAndSaveTags("Hello @bob", "ARTICLE", 10L, 1L);
    }

    @Test
    void getArticle_withLikeCount_returnsCorrectLikeCount() {
        User author = makeUser(1L, "alice");
        Article article = Article.builder().id(5L).title("T").body("B")
                .author(author).createdAt(Instant.now()).build();

        when(articleRepository.findById(5L)).thenReturn(Optional.of(article));
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 5L, "LIKE")).thenReturn(5L);
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 5L, "DISLIKE")).thenReturn(0L);
        when(commentRepository.findByArticleIdAndParentCommentIdIsNullOrderByCreatedAtAsc(5L))
                .thenReturn(List.of());

        Reaction likeReaction = Reaction.builder().reactionType("LIKE").build();
        when(reactionRepository.findByUserIdAndTargetTypeAndTargetId(1L, "ARTICLE", 5L))
                .thenReturn(Optional.of(likeReaction));

        UserSummaryResponse authorSummary = new UserSummaryResponse(1L, "alice");
        ArticleResponse mockResponse = new ArticleResponse(5L, "T", "B",
                authorSummary, Instant.now(), 5L, 0L, 0L, "LIKE");
        when(articleMapper.toResponse(article, 5L, 0L, 0L, "LIKE")).thenReturn(mockResponse);

        ArticleResponse result = articleService.getArticle(5L, 1L);

        assertThat(result.likeCount()).isEqualTo(5L);
        assertThat(result.userReaction()).isEqualTo("LIKE");
    }

    @Test
    void getArticle_anonymousUser_userReactionIsNull() {
        User author = makeUser(1L, "alice");
        Article article = Article.builder().id(5L).title("T").body("B")
                .author(author).createdAt(Instant.now()).build();

        when(articleRepository.findById(5L)).thenReturn(Optional.of(article));
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 5L, "LIKE")).thenReturn(2L);
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 5L, "DISLIKE")).thenReturn(1L);
        when(commentRepository.findByArticleIdAndParentCommentIdIsNullOrderByCreatedAtAsc(5L))
                .thenReturn(List.of());

        UserSummaryResponse authorSummary = new UserSummaryResponse(1L, "alice");
        ArticleResponse mockResponse = new ArticleResponse(5L, "T", "B",
                authorSummary, Instant.now(), 2L, 1L, 0L, null);
        when(articleMapper.toResponse(article, 2L, 1L, 0L, null)).thenReturn(mockResponse);

        ArticleResponse result = articleService.getArticle(5L, null);

        assertThat(result.userReaction()).isNull();
        verify(reactionRepository, never()).findByUserIdAndTargetTypeAndTargetId(any(), any(), any());
    }

    @Test
    void toggleReaction_like_addsReactionWhenNoneExists() {
        when(articleRepository.existsById(1L)).thenReturn(true);
        when(reactionRepository.findByUserIdAndTargetTypeAndTargetId(1L, "ARTICLE", 1L))
                .thenReturn(Optional.empty())
                .thenReturn(Optional.of(Reaction.builder().reactionType("LIKE").build()));
        User user = makeUser(1L, "alice");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 1L, "LIKE")).thenReturn(1L);
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 1L, "DISLIKE")).thenReturn(0L);

        ReactionResponse result = articleService.toggleReaction(1L, 1L, "LIKE");

        assertThat(result.likeCount()).isEqualTo(1L);
        assertThat(result.dislikeCount()).isEqualTo(0L);
        assertThat(result.userReaction()).isEqualTo("LIKE");
        verify(reactionRepository).save(any(Reaction.class));
    }

    @Test
    void toggleReaction_sameLike_removesReaction() {
        when(articleRepository.existsById(1L)).thenReturn(true);
        Reaction existing = Reaction.builder().id(10L).reactionType("LIKE").build();
        when(reactionRepository.findByUserIdAndTargetTypeAndTargetId(1L, "ARTICLE", 1L))
                .thenReturn(Optional.of(existing))
                .thenReturn(Optional.empty());
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 1L, "LIKE")).thenReturn(0L);
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 1L, "DISLIKE")).thenReturn(0L);

        ReactionResponse result = articleService.toggleReaction(1L, 1L, "LIKE");

        assertThat(result.userReaction()).isNull();
        verify(reactionRepository).deleteByUserIdAndTargetTypeAndTargetId(1L, "ARTICLE", 1L);
    }

    @Test
    void toggleReaction_oppositeReaction_replacesWithNewType() {
        when(articleRepository.existsById(1L)).thenReturn(true);
        Reaction existing = Reaction.builder().id(10L).reactionType("LIKE").build();
        when(reactionRepository.findByUserIdAndTargetTypeAndTargetId(1L, "ARTICLE", 1L))
                .thenReturn(Optional.of(existing))
                .thenReturn(Optional.of(Reaction.builder().reactionType("DISLIKE").build()));
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 1L, "LIKE")).thenReturn(0L);
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 1L, "DISLIKE")).thenReturn(1L);

        ReactionResponse result = articleService.toggleReaction(1L, 1L, "DISLIKE");

        assertThat(result.userReaction()).isEqualTo("DISLIKE");
        assertThat(existing.getReactionType()).isEqualTo("DISLIKE");
        verify(reactionRepository).save(existing);
    }

    @Test
    void getArticle_notFound_throwsResourceNotFoundException() {
        when(articleRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> articleService.getArticle(999L, null))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("999");
    }

    @Test
    void getArticles_returnsMappedPage() {
        User author = makeUser(1L, "alice");
        Article article = Article.builder().id(1L).title("T").body("B")
                .author(author).createdAt(Instant.now()).build();

        Page<Article> articlePage = new PageImpl<>(List.of(article), PageRequest.of(0, 10), 1);
        when(articleRepository.findAllByOrderByCreatedAtDesc(any())).thenReturn(articlePage);
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 1L, "LIKE")).thenReturn(3L);
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("ARTICLE", 1L, "DISLIKE")).thenReturn(1L);
        when(commentRepository.findByArticleIdAndParentCommentIdIsNullOrderByCreatedAtAsc(1L))
                .thenReturn(List.of());

        UserSummaryResponse authorSummary = new UserSummaryResponse(1L, "alice");
        ArticleListResponse listItem = new ArticleListResponse(1L, "T", authorSummary, Instant.now(), 3L, 1L, 0L, null);
        when(articleMapper.toListResponse(article, 3L, 1L, 0L, null)).thenReturn(listItem);

        Page<ArticleListResponse> result = articleService.getArticles(PageRequest.of(0, 10), null);

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).likeCount()).isEqualTo(3L);
        assertThat(result.getContent().get(0).dislikeCount()).isEqualTo(1L);
    }
}
