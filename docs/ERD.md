# Entity Relationship Diagram

## Mermaid ERD

```mermaid
erDiagram
    users {
        BIGSERIAL id PK
        VARCHAR(50) username UK "NOT NULL"
        VARCHAR(255) email UK "NOT NULL"
        VARCHAR(255) password_hash "NOT NULL"
        TIMESTAMPTZ created_at "NOT NULL DEFAULT NOW()"
    }

    articles {
        BIGSERIAL id PK
        VARCHAR(500) title "NOT NULL"
        TEXT body "NOT NULL"
        VARCHAR(500) cover_image_url "NULLABLE"
        BIGINT author_id FK "NOT NULL → users(id)"
        TIMESTAMPTZ created_at "NOT NULL DEFAULT NOW()"
    }

    comments {
        BIGSERIAL id PK
        TEXT body "NOT NULL"
        BIGINT article_id FK "NOT NULL → articles(id)"
        BIGINT author_id FK "NOT NULL → users(id)"
        BIGINT parent_comment_id FK "NULLABLE → comments(id)"
        TIMESTAMPTZ created_at "NOT NULL DEFAULT NOW()"
    }

    reactions {
        BIGSERIAL id PK
        BIGINT user_id FK "NOT NULL → users(id)"
        VARCHAR(10) target_type "NOT NULL CHECK IN ('ARTICLE','COMMENT')"
        BIGINT target_id "NOT NULL — FK by convention to articles.id or comments.id"
        VARCHAR(10) reaction_type "NOT NULL CHECK IN ('LIKE','DISLIKE')"
        TIMESTAMPTZ created_at "NOT NULL DEFAULT NOW()"
    }

    tags {
        BIGSERIAL id PK
        BIGINT tagged_user_id FK "NOT NULL → users(id)"
        VARCHAR(10) source_type "NOT NULL CHECK IN ('ARTICLE','COMMENT')"
        BIGINT source_id "NOT NULL — FK by convention to articles.id or comments.id"
        BIGINT created_by FK "NOT NULL → users(id)"
        TIMESTAMPTZ created_at "NOT NULL DEFAULT NOW()"
    }

    users ||--o{ articles : "authors"
    users ||--o{ comments : "writes"
    users ||--o{ reactions : "places"
    users ||--o{ tags : "is tagged in"
    users ||--o{ tags : "creates tags"
    articles ||--o{ comments : "receives"
    articles ||--o{ reactions : "receives"
    comments ||--o{ reactions : "receives"
    comments ||--o{ comments : "parent of (replies)"
```

## Relationship Notes

| Relationship | Cardinality | Cascade |
|---|---|---|
| users → articles | one-to-many | DELETE CASCADE |
| users → comments | one-to-many | DELETE CASCADE |
| users → reactions | one-to-many | DELETE CASCADE |
| articles → comments | one-to-many | DELETE CASCADE |
| articles → reactions | one-to-many (via target_type='ARTICLE') | DELETE CASCADE |
| comments → reactions | one-to-many (via target_type='COMMENT') | DELETE CASCADE |
| comments → comments | self-referential (replies) | DELETE CASCADE |
| tags.tagged_user_id → users | many-to-one | DELETE CASCADE |
| tags.created_by → users | many-to-one | DELETE CASCADE |

## Unique Constraints

- `users.username` — one account per username
- `users.email` — one account per email address
- `reactions(user_id, target_type, target_id)` — one reaction per user per target, prevents duplicate likes/dislikes at the database level

## Polymorphic Pattern (reactions table)

The `reactions` table uses a discriminator column pattern:
- `target_type IN ('ARTICLE', 'COMMENT')` identifies which entity the reaction belongs to
- `target_id` is the primary key of that entity
- `reaction_type IN ('LIKE', 'DISLIKE')` captures the reaction kind
- This single table handles reactions on both articles and comments, avoiding table proliferation
- The unique constraint on `(user_id, target_type, target_id)` ensures each user has at most one reaction per target

## Polymorphic Pattern (tags table)

The `tags` table uses the same discriminator column pattern:
- `source_type IN ('ARTICLE', 'COMMENT')` identifies which entity the tag belongs to
- `source_id` is the primary key of that entity
- This avoids two separate tag tables while keeping the schema flexible
- The check constraint ensures only valid source types are stored
