# Sequence Diagram: Authenticated User Posts a Reply with @mention

This diagram shows the complete flow when an authenticated user submits a reply to a comment that includes an @mention of another user.

## Mermaid Sequence Diagram

```mermaid
sequenceDiagram
    actor User
    participant AngularApp as Angular App
    participant AuthInterceptor as AuthInterceptor
    participant CommentController as CommentController
    participant CommentService as CommentService
    participant TagService as TagService
    participant CommentRepository as CommentRepository
    participant TagRepository as TagRepository
    participant UserRepository as UserRepository
    participant PostgreSQL as PostgreSQL

    User->>AngularApp: Types reply body with @alice, clicks Submit
    
    AngularApp->>AngularApp: CommentFormComponent validates form (body not empty)
    AngularApp->>AngularApp: CommentService.addComment(articleId, body, parentCommentId)
    AngularApp->>AuthInterceptor: HTTP POST /api/comments/{parentId}/replies
    AuthInterceptor->>AuthInterceptor: Reads JWT from AuthService.getToken()
    AuthInterceptor->>CommentController: POST /api/comments/{parentId}/replies\nAuthorization: Bearer <jwt>

    CommentController->>CommentController: @AuthenticationPrincipal → extract userId
    CommentController->>CommentController: @Valid validates CreateCommentRequest
    CommentController->>CommentService: addReply(parentCommentId, request, authorId)

    CommentService->>CommentRepository: findById(parentCommentId)
    CommentRepository->>PostgreSQL: SELECT * FROM comments WHERE id = ?
    PostgreSQL-->>CommentRepository: Comment row (parent)
    CommentRepository-->>CommentService: Optional<Comment> parent

    CommentService->>CommentService: Verify parent exists (throw ResourceNotFoundException if not)
    CommentService->>CommentRepository: findById(articleId from parent)
    
    CommentService->>TagService: parseAndSaveTags(body, "COMMENT", newCommentId, authorId)
    
    TagService->>TagService: Regex match /@([a-zA-Z0-9_]+)/g on body
    TagService->>TagService: Extract ["alice"] from matches
    TagService->>UserRepository: findByUsername("alice")
    UserRepository->>PostgreSQL: SELECT * FROM users WHERE username = 'alice'
    PostgreSQL-->>UserRepository: User row for alice
    UserRepository-->>TagService: Optional<User> alice (present)
    
    TagService->>TagRepository: save(Tag { tagged_user_id=alice.id, source_type="COMMENT", source_id=newComment.id, created_by=authorId })
    TagRepository->>PostgreSQL: INSERT INTO tags (tagged_user_id, source_type, source_id, created_by) VALUES (?, 'COMMENT', ?, ?)
    PostgreSQL-->>TagRepository: Tag row with generated id
    TagRepository-->>TagService: Saved Tag

    CommentService->>CommentRepository: save(Comment { body, article, author, parentComment })
    CommentRepository->>PostgreSQL: INSERT INTO comments (body, article_id, author_id, parent_comment_id) VALUES (?, ?, ?, ?)
    PostgreSQL-->>CommentRepository: Comment row with generated id
    CommentRepository-->>CommentService: Saved Comment

    CommentService->>CommentService: Map Comment → CommentResponse (with empty replies list)
    CommentService-->>CommentController: CommentResponse

    CommentController->>CommentController: Wrap in ApiSuccessResponse<CommentResponse>
    CommentController-->>AuthInterceptor: HTTP 201 { success: true, data: CommentResponse }
    AuthInterceptor-->>AngularApp: HTTP 201 response

    AngularApp->>AngularApp: CommentService Observable emits IComment
    AngularApp->>AngularApp: CommentItemComponent receives reply
    AngularApp->>AngularApp: Append reply to parent comment.replies signal
    AngularApp->>AngularApp: Hide inline reply form
    AngularApp-->>User: Reply appears in thread — no page reload
```

## Flow Summary

1. User types reply body containing `@alice` and clicks Submit
2. Angular validates the form and calls `CommentService.addComment()`
3. `AuthInterceptor` attaches the JWT `Bearer` token to the request
4. `CommentController` validates the request body and extracts the authenticated user ID
5. `CommentService.addReply()` loads the parent comment and delegates to `TagService`
6. `TagService` parses `@mentions` with a regex, resolves each username via `UserRepository`, and persists a `Tag` row for each valid match — silently skipping unknown usernames
7. `CommentRepository` persists the new `Comment` with `parent_comment_id` set
8. The `CommentResponse` travels back up through the layers
9. Angular appends the new reply to the parent comment's `replies` array in the Signals-based state — no page reload required
