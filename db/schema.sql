-- Article Publishing Platform — Complete Database Schema
-- PostgreSQL 15+
-- Run once against a fresh database. Flyway migration V1__init_schema.sql mirrors this.

CREATE TABLE users (
  id            BIGSERIAL PRIMARY KEY,
  username      VARCHAR(50)  UNIQUE NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE articles (
  id         BIGSERIAL PRIMARY KEY,
  title      VARCHAR(500) NOT NULL,
  body       TEXT         NOT NULL,
  author_id  BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE comments (
  id                BIGSERIAL PRIMARY KEY,
  body              TEXT        NOT NULL,
  article_id        BIGINT      NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  author_id         BIGINT      NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  parent_comment_id BIGINT               REFERENCES comments(id) ON DELETE CASCADE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE likes (
  id         BIGSERIAL PRIMARY KEY,
  user_id    BIGINT      NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  article_id BIGINT      NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_likes_user_article UNIQUE (user_id, article_id)
);

-- Polymorphic tag table — source_type identifies whether the @mention
-- appeared in an ARTICLE body or a COMMENT body.
CREATE TABLE tags (
  id             BIGSERIAL PRIMARY KEY,
  tagged_user_id BIGINT      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_type    VARCHAR(10) NOT NULL CHECK (source_type IN ('ARTICLE', 'COMMENT')),
  source_id      BIGINT      NOT NULL,
  created_by     BIGINT      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_articles_author_id  ON articles(author_id);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX idx_comments_article_id ON comments(article_id);
CREATE INDEX idx_comments_parent_id  ON comments(parent_comment_id);
CREATE INDEX idx_likes_article_id    ON likes(article_id);
CREATE INDEX idx_tags_tagged_user_id ON tags(tagged_user_id);
CREATE INDEX idx_tags_source         ON tags(source_type, source_id);
