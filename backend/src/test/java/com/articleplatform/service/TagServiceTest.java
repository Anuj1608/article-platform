package com.articleplatform.service;

import com.articleplatform.entity.Tag;
import com.articleplatform.entity.User;
import com.articleplatform.repository.TagRepository;
import com.articleplatform.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
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
 * Unit tests for {@link TagService}.
 */
@ExtendWith(MockitoExtension.class)
class TagServiceTest {

    @Mock
    private TagRepository tagRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TagService tagService;

    private User makeUser(Long id, String username) {
        return User.builder().id(id).username(username)
                .email(username + "@example.com").passwordHash("h").createdAt(Instant.now()).build();
    }

    @Test
    void parseAndSaveTags_validUsername_savesTagWithCorrectSourceType() {
        User creator = makeUser(1L, "author");
        User tagged = makeUser(2L, "alice");

        when(userRepository.findById(1L)).thenReturn(Optional.of(creator));
        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(tagged));
        when(tagRepository.findBySourceTypeAndSourceId("ARTICLE", 10L)).thenReturn(List.of());
        when(tagRepository.saveAll(any())).thenReturn(List.of());

        tagService.parseAndSaveTags("Hello @alice", "ARTICLE", 10L, 1L);

        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<Tag>> captor = ArgumentCaptor.forClass(List.class);
        verify(tagRepository).saveAll(captor.capture());
        List<Tag> saved = captor.getValue();
        assertThat(saved).hasSize(1);
        assertThat(saved.get(0).getSourceType()).isEqualTo("ARTICLE");
        assertThat(saved.get(0).getTaggedUser().getUsername()).isEqualTo("alice");
        assertThat(saved.get(0).getSourceId()).isEqualTo(10L);
    }

    @Test
    void parseAndSaveTags_invalidUsername_savesNoTags() {
        User creator = makeUser(1L, "author");

        when(userRepository.findById(1L)).thenReturn(Optional.of(creator));
        when(userRepository.findByUsername("nobody")).thenReturn(Optional.empty());
        when(tagRepository.findBySourceTypeAndSourceId("ARTICLE", 10L)).thenReturn(List.of());

        tagService.parseAndSaveTags("Hello @nobody", "ARTICLE", 10L, 1L);

        verify(tagRepository, never()).saveAll(any());
    }

    @Test
    void parseAndSaveTags_noMentions_doesNothing() {
        tagService.parseAndSaveTags("No mentions here", "ARTICLE", 10L, 1L);

        verify(userRepository, never()).findById(any());
        verify(tagRepository, never()).saveAll(any());
    }

    @Test
    void parseAndSaveTags_sourceTypeComment_persistsCorrectSourceType() {
        User creator = makeUser(1L, "author");
        User tagged = makeUser(2L, "bob");

        when(userRepository.findById(1L)).thenReturn(Optional.of(creator));
        when(userRepository.findByUsername("bob")).thenReturn(Optional.of(tagged));
        when(tagRepository.findBySourceTypeAndSourceId("COMMENT", 99L)).thenReturn(List.of());
        when(tagRepository.saveAll(any())).thenReturn(List.of());

        tagService.parseAndSaveTags("Hey @bob", "COMMENT", 99L, 1L);

        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<Tag>> captor = ArgumentCaptor.forClass(List.class);
        verify(tagRepository).saveAll(captor.capture());
        assertThat(captor.getValue().get(0).getSourceType()).isEqualTo("COMMENT");
    }

    @Test
    void parseAndSaveTags_duplicateMentionInBody_savesOnlyOneTag() {
        User creator = makeUser(1L, "author");
        User tagged = makeUser(2L, "alice");

        when(userRepository.findById(1L)).thenReturn(Optional.of(creator));
        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(tagged));
        when(tagRepository.findBySourceTypeAndSourceId("ARTICLE", 10L)).thenReturn(List.of());
        when(tagRepository.saveAll(any())).thenReturn(List.of());

        tagService.parseAndSaveTags("@alice said hi and @alice said bye", "ARTICLE", 10L, 1L);

        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<Tag>> captor = ArgumentCaptor.forClass(List.class);
        verify(tagRepository).saveAll(captor.capture());
        assertThat(captor.getValue()).hasSize(1);
    }
}
