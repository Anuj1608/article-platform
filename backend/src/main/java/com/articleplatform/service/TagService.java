package com.articleplatform.service;

import com.articleplatform.entity.Tag;
import com.articleplatform.entity.User;
import com.articleplatform.repository.TagRepository;
import com.articleplatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Service for parsing @mention tags from text bodies and persisting Tag records.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class TagService {

    private static final Pattern MENTION_PATTERN = Pattern.compile("@([a-zA-Z0-9_]+)");

    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    /**
     * Parses @mentions from the given body text, resolves valid usernames, and persists Tag records.
     * Invalid or non-existent usernames are silently ignored.
     * Duplicate tags for the same user and source combination are not created.
     *
     * @param body       the text body to parse for @mentions
     * @param sourceType either "ARTICLE" or "COMMENT"
     * @param sourceId   the primary key of the source entity
     * @param createdBy  the primary key of the user who authored the body
     */
    @Transactional
    public void parseAndSaveTags(String body, String sourceType, Long sourceId, Long createdBy) {
        Matcher matcher = MENTION_PATTERN.matcher(body);
        Set<String> mentionedUsernames = new LinkedHashSet<>();
        while (matcher.find()) {
            mentionedUsernames.add(matcher.group(1));
        }

        if (mentionedUsernames.isEmpty()) {
            return;
        }

        User creator = userRepository.findById(createdBy).orElse(null);
        if (creator == null) {
            log.warn("Tag creator not found for userId={}", createdBy);
            return;
        }

        List<Tag> existingTags = tagRepository.findBySourceTypeAndSourceId(sourceType, sourceId);
        Set<Long> alreadyTaggedUserIds = new HashSet<>();
        for (Tag t : existingTags) {
            alreadyTaggedUserIds.add(t.getTaggedUser().getId());
        }

        List<Tag> tagsToSave = new ArrayList<>();
        for (String username : mentionedUsernames) {
            userRepository.findByUsername(username).ifPresent(taggedUser -> {
                if (!alreadyTaggedUserIds.contains(taggedUser.getId())) {
                    tagsToSave.add(Tag.builder()
                            .taggedUser(taggedUser)
                            .sourceType(sourceType)
                            .sourceId(sourceId)
                            .createdBy(creator)
                            .createdAt(Instant.now())
                            .build());
                    alreadyTaggedUserIds.add(taggedUser.getId());
                }
            });
        }

        if (!tagsToSave.isEmpty()) {
            tagRepository.saveAll(tagsToSave);
            log.debug("Saved {} tag(s) for sourceType={} sourceId={}", tagsToSave.size(), sourceType, sourceId);
        }
    }
}
