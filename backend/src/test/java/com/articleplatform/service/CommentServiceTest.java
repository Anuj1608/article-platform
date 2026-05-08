package com.articleplatform.service;

import com.articleplatform.dto.request.CreateCommentRequest;
import com.articleplatform.dto.response.CommentResponse;
import com.articleplatform.dto.response.ReactionResponse;
import com.articleplatform.dto.response.UserSummaryResponse;
import com.articleplatform.entity.*;
import com.articleplatform.exception.ResourceNotFoundException;
import com.articleplatform.mapper.CommentMapper;
import com.articleplatform.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit tests for {@link CommentService}.
 */
@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReactionRepository reactionRepository;

    @Mock
    private CommentMapper commentMapper;

    @Mock
    private TagService tagService;

    @InjectMocks
    private CommentService commentService;

    private User makeUser(Long id, String username) {
        return User.builder().id(id).username(username)
                .email(username + "@example.com").passwordHash("h").createdAt(Instant.now()).build();
    }

    private Article makeArticle(Long id, User author) {
        return Article.builder().id(id).title("T").body("B")
                .author(author).createdAt(Instant.now()).build();
    }

    @Test
    void addComment_success_savesCommentWithNullParentAndCallsTagService() {
        User author = makeUser(1L, "alice");
        Article article = makeArticle(10L, author);

        when(articleRepository.findById(10L)).thenReturn(Optional.of(article));
        when(userRepository.findById(1L)).thenReturn(Optional.of(author));

        Comment saved = Comment.builder().id(100L).body("Hello @bob").article(article)
                .author(author).parentComment(null).createdAt(Instant.now()).build();
        when(commentRepository.save(any(Comment.class))).thenReturn(saved);

        CommentResponse expected = new CommentResponse(100L, "Hello @bob",
                new UserSummaryResponse(1L, "alice"), Instant.now(), 0L, 0L, null, List.of());
        when(commentMapper.toResponse(saved, 0L, 0L, null, List.of())).thenReturn(expected);

        CreateCommentRequest req = new CreateCommentRequest("Hello @bob", null);
        CommentResponse result = commentService.addComment(10L, req, 1L);

        assertThat(result.id()).isEqualTo(100L);
        verify(commentRepository).save(argThat(c -> c.getParentComment() == null));
        verify(tagService).parseAndSaveTags("Hello @bob", "COMMENT", 100L, 1L);
    }

    @Test
    void addReply_success_savesCommentWithCorrectParent() {
        User author = makeUser(1L, "alice");
        Article article = makeArticle(10L, author);
        Comment parent = Comment.builder().id(50L).body("Parent").article(article)
                .author(author).createdAt(Instant.now()).build();

        when(commentRepository.findById(50L)).thenReturn(Optional.of(parent));
        when(userRepository.findById(1L)).thenReturn(Optional.of(author));

        Comment saved = Comment.builder().id(200L).body("Reply").article(article)
                .author(author).parentComment(parent).createdAt(Instant.now()).build();
        when(commentRepository.save(any(Comment.class))).thenReturn(saved);

        CommentResponse expected = new CommentResponse(200L, "Reply",
                new UserSummaryResponse(1L, "alice"), Instant.now(), 0L, 0L, null, List.of());
        when(commentMapper.toResponse(saved, 0L, 0L, null, List.of())).thenReturn(expected);

        CreateCommentRequest req = new CreateCommentRequest("Reply", 50L);
        CommentResponse result = commentService.addReply(50L, req, 1L);

        assertThat(result.id()).isEqualTo(200L);
        verify(commentRepository).save(argThat(c ->
                c.getParentComment() != null && c.getParentComment().getId().equals(50L)));
        verify(tagService).parseAndSaveTags("Reply", "COMMENT", 200L, 1L);
    }

    @Test
    void getComments_buildsNestedTree() {
        User author = makeUser(1L, "alice");
        Article article = makeArticle(10L, author);

        Comment root = Comment.builder().id(1L).body("Root").article(article)
                .author(author).createdAt(Instant.now()).build();
        Comment reply = Comment.builder().id(2L).body("Reply").article(article)
                .author(author).parentComment(root).createdAt(Instant.now()).build();

        when(commentRepository.findByArticleIdAndParentCommentIdIsNullOrderByCreatedAtAsc(10L))
                .thenReturn(List.of(root));
        when(commentRepository.findByParentCommentIdOrderByCreatedAtAsc(1L))
                .thenReturn(List.of(reply));
        when(commentRepository.findByParentCommentIdOrderByCreatedAtAsc(2L))
                .thenReturn(List.of());

        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType(any(), any(), any())).thenReturn(0L);
        when(reactionRepository.findByUserIdAndTargetTypeAndTargetId(any(), any(), any()))
                .thenReturn(Optional.empty());

        UserSummaryResponse authorSummary = new UserSummaryResponse(1L, "alice");
        CommentResponse replyResponse = new CommentResponse(2L, "Reply", authorSummary, Instant.now(), 0L, 0L, null, List.of());
        CommentResponse rootResponse = new CommentResponse(1L, "Root", authorSummary, Instant.now(), 0L, 0L, null, List.of(replyResponse));

        when(commentMapper.toResponse(reply, 0L, 0L, null, List.of())).thenReturn(replyResponse);
        when(commentMapper.toResponse(root, 0L, 0L, null, List.of(replyResponse))).thenReturn(rootResponse);

        List<CommentResponse> result = commentService.getComments(10L, 1L);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).id()).isEqualTo(1L);
        assertThat(result.get(0).replies()).hasSize(1);
        assertThat(result.get(0).replies().get(0).id()).isEqualTo(2L);
    }

    @Test
    void getComments_anonymousUser_userReactionIsNull() {
        User author = makeUser(1L, "alice");
        Article article = makeArticle(10L, author);
        Comment root = Comment.builder().id(1L).body("Root").article(article)
                .author(author).createdAt(Instant.now()).build();

        when(commentRepository.findByArticleIdAndParentCommentIdIsNullOrderByCreatedAtAsc(10L))
                .thenReturn(List.of(root));
        when(commentRepository.findByParentCommentIdOrderByCreatedAtAsc(1L))
                .thenReturn(List.of());
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType(any(), any(), any())).thenReturn(0L);

        UserSummaryResponse authorSummary = new UserSummaryResponse(1L, "alice");
        CommentResponse rootResponse = new CommentResponse(1L, "Root", authorSummary, Instant.now(), 0L, 0L, null, List.of());
        when(commentMapper.toResponse(root, 0L, 0L, null, List.of())).thenReturn(rootResponse);

        List<CommentResponse> result = commentService.getComments(10L, null);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).userReaction()).isNull();
        verify(reactionRepository, never()).findByUserIdAndTargetTypeAndTargetId(any(), any(), any());
    }

    @Test
    void toggleReaction_onComment_addsLike() {
        when(commentRepository.existsById(5L)).thenReturn(true);
        when(reactionRepository.findByUserIdAndTargetTypeAndTargetId(1L, "COMMENT", 5L))
                .thenReturn(Optional.empty())
                .thenReturn(Optional.of(Reaction.builder().reactionType("LIKE").build()));
        User user = makeUser(1L, "alice");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("COMMENT", 5L, "LIKE")).thenReturn(1L);
        when(reactionRepository.countByTargetTypeAndTargetIdAndReactionType("COMMENT", 5L, "DISLIKE")).thenReturn(0L);

        ReactionResponse result = commentService.toggleReaction(5L, 1L, "LIKE");

        assertThat(result.likeCount()).isEqualTo(1L);
        assertThat(result.userReaction()).isEqualTo("LIKE");
        verify(reactionRepository).save(any(Reaction.class));
    }

    @Test
    void toggleReaction_onComment_notFound_throwsResourceNotFoundException() {
        when(commentRepository.existsById(999L)).thenReturn(false);

        assertThatThrownBy(() -> commentService.toggleReaction(999L, 1L, "LIKE"))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("999");
    }
}
