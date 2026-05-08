# API Documentation

Base URL: `http://localhost:8080/api`

All responses follow one of two envelope shapes:

**Success:**
```json
{ "success": true, "data": <T> }
```

**Error:**
```json
{ "success": false, "error": "message", "errors": { "field": "message" } }
```

---

## Authentication

### POST /api/auth/register
Register a new user account.

**Auth required:** No

**Request body:**
```json
{
  "username": "string (3–50 chars)",
  "email": "string (valid email)",
  "password": "string (8–100 chars)"
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "username": "alice",
    "userId": 1
  }
}
```

**Response 400 (validation failure):**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": { "email": "must be a well-formed email address" }
}
```

---

### POST /api/auth/login
Authenticate an existing user and receive a JWT.

**Auth required:** No

**Request body:**
```json
{
  "email": "alice@example.com",
  "password": "Password123!"
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "username": "alice",
    "userId": 1
  }
}
```

**Response 401:** Invalid credentials.

---

## Articles

### GET /api/articles
Returns paginated list of articles sorted by newest first.

**Auth required:** No (but `liked` field is null for unauthenticated requests)

**Query params:**
- `page` (default 0)
- `size` (default 10)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "title": "Getting Started with Spring Boot",
        "author": { "id": 1, "username": "alice" },
        "createdAt": "2026-05-07T10:00:00Z",
        "likeCount": 42,
        "commentCount": 7
      }
    ],
    "totalElements": 100,
    "totalPages": 10,
    "size": 10,
    "number": 0
  }
}
```

---

### GET /api/articles/{id}
Returns full article detail.

**Auth required:** No (but `liked` is null if unauthenticated)

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Getting Started with Spring Boot",
    "body": "Full article content here...",
    "author": { "id": 1, "username": "alice" },
    "createdAt": "2026-05-07T10:00:00Z",
    "likeCount": 42,
    "commentCount": 7,
    "liked": true
  }
}
```

**Response 404:** Article not found.

---

### POST /api/articles
Create a new article.

**Auth required:** Yes (Bearer token)

**Request body:**
```json
{
  "title": "My Article Title",
  "body": "Article content, can include @mentions like @bob"
}
```

**Response 201:** `ArticleResponse` (same shape as GET /api/articles/{id})

**Response 401:** Not authenticated.
**Response 400:** Validation failure.

---

## Likes

### POST /api/articles/{id}/likes
Like an article. Idempotent — calling when already liked has no effect.

**Auth required:** Yes

**Response 200:**
```json
{ "success": true, "data": null }
```

**Response 401:** Not authenticated.
**Response 404:** Article not found.

---

### DELETE /api/articles/{id}/likes
Unlike an article. Idempotent — calling when not liked has no effect.

**Auth required:** Yes

**Response 200:**
```json
{ "success": true, "data": null }
```

---

## Comments

### GET /api/articles/{id}/comments
Returns threaded comment tree for an article. Root comments contain nested replies.

**Auth required:** No

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "body": "Great article! @alice thanks for writing this.",
      "author": { "id": 2, "username": "bob" },
      "createdAt": "2026-05-07T11:00:00Z",
      "replies": [
        {
          "id": 3,
          "body": "Thanks @bob, glad it helped!",
          "author": { "id": 1, "username": "alice" },
          "createdAt": "2026-05-07T11:05:00Z",
          "replies": []
        }
      ]
    }
  ]
}
```

---

### POST /api/articles/{id}/comments
Add a root-level comment to an article.

**Auth required:** Yes

**Request body:**
```json
{
  "body": "This is my comment with @mention support"
}
```

**Response 201:** `CommentResponse`

---

### POST /api/comments/{id}/replies
Add a reply to an existing comment.

**Auth required:** Yes

**Request body:**
```json
{
  "body": "Replying to you, @alice!"
}
```

**Response 201:** `CommentResponse`

**Response 404:** Parent comment not found.

---

## Users

### GET /api/users/search?q={term}
Search users by username (case-insensitive, substring match). Used for @mention autocomplete.

**Auth required:** Yes

**Response 200:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "username": "alice" },
    { "id": 4, "username": "alan" }
  ]
}
```

---

## Error Codes

| HTTP Status | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Validation failure — check `errors` map for field details |
| 401 | Not authenticated — provide valid Bearer token |
| 403 | Forbidden — authenticated but not authorized |
| 404 | Resource not found |
| 500 | Internal server error — check server logs |
