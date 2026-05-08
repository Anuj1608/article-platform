CREATE TABLE reactions (
  id            BIGSERIAL PRIMARY KEY,
  user_id       BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type   VARCHAR(10) NOT NULL CHECK (target_type IN ('ARTICLE','COMMENT')),
  target_id     BIGINT NOT NULL,
  reaction_type VARCHAR(10) NOT NULL CHECK (reaction_type IN ('LIKE','DISLIKE')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_reactions_user_target UNIQUE (user_id, target_type, target_id)
);

INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT user_id, 'ARTICLE', article_id, 'LIKE', created_at FROM likes;

DROP TABLE likes;

CREATE INDEX idx_reactions_target ON reactions(target_type, target_id);
CREATE INDEX idx_reactions_user ON reactions(user_id);
