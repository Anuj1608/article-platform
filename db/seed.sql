-- Sample seed data for local development
-- Passwords are BCrypt hashes of "Password123!"

INSERT INTO users (username, email, password_hash) VALUES
  ('alice',   'alice@example.com',   '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpR1IOBSmCkAie'),
  ('bob',     'bob@example.com',     '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpR1IOBSmCkAie'),
  ('charlie', 'charlie@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpR1IOBSmCkAie');

INSERT INTO articles (title, body, author_id) VALUES
  ('Getting Started with Spring Boot',
   'Spring Boot makes it easy to create stand-alone, production-grade applications. In this article we cover the essentials you need to get started. Shout out to @bob for reviewing this!',
   1),
  ('Angular Signals: A Deep Dive',
   'Angular 17 introduced Signals as a reactive primitive. This post explores how Signals replace traditional change detection. Thanks @alice for the feedback!',
   2),
  ('PostgreSQL Performance Tips',
   'Indexes, EXPLAIN ANALYZE, and query planning — learn how to squeeze maximum performance from PostgreSQL. @charlie has some great additional resources.',
   3);

INSERT INTO comments (body, article_id, author_id) VALUES
  ('Great introduction! Really helped me understand the basics.', 1, 2),
  ('Can you cover testing in a follow-up?', 1, 3),
  ('This is exactly what I needed. @alice do you have a sample repo?', 2, 1);

INSERT INTO comments (body, article_id, author_id, parent_comment_id) VALUES
  ('Sure! I will post the repo link shortly.', 2, 2, 3);

INSERT INTO likes (user_id, article_id) VALUES
  (2, 1),
  (3, 1),
  (1, 2),
  (3, 2),
  (1, 3),
  (2, 3);

INSERT INTO tags (tagged_user_id, source_type, source_id, created_by) VALUES
  (2, 'ARTICLE', 1, 1),
  (1, 'ARTICLE', 2, 2),
  (3, 'ARTICLE', 3, 3),
  (1, 'COMMENT', 3, 1);
