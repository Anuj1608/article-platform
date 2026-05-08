-- Seed reactions (likes / dislikes) across articles and comments
-- Uses JPQL-safe subqueries — runs after V4 which created the reactions table.

-- ── Article reactions ────────────────────────────────────────

-- Article 1 (AI Revolution): liked by 4 users, disliked by 1
INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'LIKE', NOW() - INTERVAL '6 days'
  FROM users u, articles a
 WHERE u.username IN ('sarah_chen','harshil_patel','dev_insider','global_pulse')
   AND a.title LIKE 'The AI Revolution%';

INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'DISLIKE', NOW() - INTERVAL '6 days'
  FROM users u, articles a
 WHERE u.username = 'alex_morgan' AND a.title LIKE 'The AI Revolution%';

-- Article 2 (US-Iran): liked by 3 users
INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'LIKE', NOW() - INTERVAL '5 days'
  FROM users u, articles a
 WHERE u.username IN ('alex_morgan','sarah_chen','harshil_patel')
   AND a.title LIKE 'U.S.%Iran%';

-- Article 3 (Angular Signals): liked by 4 users
INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'LIKE', NOW() - INTERVAL '4 days'
  FROM users u, articles a
 WHERE u.username IN ('alex_morgan','sarah_chen','dev_insider','global_pulse')
   AND a.title LIKE 'Angular 17%';

-- Article 4 (SpaceX): liked by 3, disliked by 1
INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'LIKE', NOW() - INTERVAL '3 days'
  FROM users u, articles a
 WHERE u.username IN ('sarah_chen','harshil_patel','global_pulse')
   AND a.title LIKE 'SpaceX%';

INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'DISLIKE', NOW() - INTERVAL '3 days'
  FROM users u, articles a
 WHERE u.username = 'dev_insider' AND a.title LIKE 'SpaceX%';

-- Article 5 (Wellness): liked by all others
INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'LIKE', NOW() - INTERVAL '2 days'
  FROM users u, articles a
 WHERE u.username IN ('alex_morgan','harshil_patel','dev_insider','global_pulse')
   AND a.title LIKE 'Science-Backed%';

-- Article 6 (Docker/K8s): liked by 3
INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'LIKE', NOW() - INTERVAL '36 hours'
  FROM users u, articles a
 WHERE u.username IN ('alex_morgan','dev_insider','global_pulse')
   AND a.title LIKE 'From Docker%';

-- Article 7 (Remote Work): liked by 2
INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'LIKE', NOW() - INTERVAL '20 hours'
  FROM users u, articles a
 WHERE u.username IN ('sarah_chen','harshil_patel')
   AND a.title LIKE 'Remote Work%';

-- Article 8 (Bitcoin): liked by 2, disliked by 1
INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'LIKE', NOW() - INTERVAL '10 hours'
  FROM users u, articles a
 WHERE u.username IN ('alex_morgan','dev_insider')
   AND a.title LIKE 'Bitcoin%';

INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'DISLIKE', NOW() - INTERVAL '10 hours'
  FROM users u, articles a
 WHERE u.username = 'sarah_chen' AND a.title LIKE 'Bitcoin%';

-- Article 9 (Climate): liked by 4
INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'LIKE', NOW() - INTERVAL '4 hours'
  FROM users u, articles a
 WHERE u.username IN ('alex_morgan','harshil_patel','dev_insider','global_pulse')
   AND a.title LIKE 'Climate Crisis%';

-- Article 10 (Spring Boot 3): liked by 3
INSERT INTO reactions (user_id, target_type, target_id, reaction_type, created_at)
SELECT u.id, 'ARTICLE', a.id, 'LIKE', NOW() - INTERVAL '1 hour'
  FROM users u, articles a
 WHERE u.username IN ('alex_morgan','sarah_chen','dev_insider')
   AND a.title LIKE 'Spring Boot 3%';

-- ── Seed comments ────────────────────────────────────────────

-- Comments on Article 1 (AI Revolution)
INSERT INTO comments (body, article_id, author_id, created_at)
SELECT
  'The healthcare applications are genuinely mind-blowing. I work in radiology and the diagnostic accuracy numbers are real — we are already using AI-assisted reads in our department.',
  a.id,
  (SELECT id FROM users WHERE username = 'sarah_chen'),
  NOW() - INTERVAL '6 days 4 hours'
FROM articles a WHERE a.title LIKE 'The AI Revolution%';

INSERT INTO comments (body, article_id, author_id, created_at)
SELECT
  'The productivity gap point is critical. Teams that adopt these tools are not just faster — they are competing in a different category. The laggards will not catch up by trying harder.',
  a.id,
  (SELECT id FROM users WHERE username = 'harshil_patel'),
  NOW() - INTERVAL '6 days 2 hours'
FROM articles a WHERE a.title LIKE 'The AI Revolution%';

INSERT INTO comments (body, article_id, author_id, created_at)
SELECT
  'Great article Alex! The legal industry disruption section is spot on. The question now is whether regulators move fast enough to keep up.',
  a.id,
  (SELECT id FROM users WHERE username = 'global_pulse'),
  NOW() - INTERVAL '5 days 18 hours'
FROM articles a WHERE a.title LIKE 'The AI Revolution%';

-- Comments on Article 3 (Angular Signals)
INSERT INTO comments (body, article_id, author_id, created_at)
SELECT
  'Finally migrated our main app to Signals last sprint. The reduction in boilerplate is real — we removed about 300 lines of RxJS plumbing from a single component. Highly recommend.',
  a.id,
  (SELECT id FROM users WHERE username = 'dev_insider'),
  NOW() - INTERVAL '4 days 8 hours'
FROM articles a WHERE a.title LIKE 'Angular 17%';

INSERT INTO comments (body, article_id, author_id, created_at)
SELECT
  'The track requirement on @for is a breaking change that caught us off-guard during the migration, but it is genuinely the right call. Enforcing it at compile time eliminates a whole class of performance bugs.',
  a.id,
  (SELECT id FROM users WHERE username = 'alex_morgan'),
  NOW() - INTERVAL '4 days 5 hours'
FROM articles a WHERE a.title LIKE 'Angular 17%';

-- Comments on Article 4 (SpaceX)
INSERT INTO comments (body, article_id, author_id, created_at)
SELECT
  'The fourth flight test was incredible to watch live. Catching the booster with the chopsticks arms was something I genuinely did not think they would pull off on the first attempt.',
  a.id,
  (SELECT id FROM users WHERE username = 'harshil_patel'),
  NOW() - INTERVAL '3 days 6 hours'
FROM articles a WHERE a.title LIKE 'SpaceX%';

-- Comments on Article 6 (Docker/K8s)
INSERT INTO comments (body, article_id, author_id, created_at)
SELECT
  'The liveness vs readiness probe distinction tripped up our team for months. Would be great to see a follow-up article specifically on K8s health checking patterns.',
  a.id,
  (SELECT id FROM users WHERE username = 'sarah_chen'),
  NOW() - INTERVAL '30 hours'
FROM articles a WHERE a.title LIKE 'From Docker%';

INSERT INTO comments (body, article_id, author_id, created_at)
SELECT
  'Solid intro. One thing worth adding: resource requests vs limits are not just good practice — Kubernetes scheduler uses requests for placement decisions. Setting them wrong causes all kinds of mysterious OOM kills.',
  a.id,
  (SELECT id FROM users WHERE username = 'alex_morgan'),
  NOW() - INTERVAL '28 hours'
FROM articles a WHERE a.title LIKE 'From Docker%';

-- Comments on Article 9 (Climate)
INSERT INTO comments (body, article_id, author_id, created_at)
SELECT
  'The stat about solar cost dropping 90% in a decade needs to be shouted from rooftops. The pessimism around energy transition is not keeping up with the technology reality.',
  a.id,
  (SELECT id FROM users WHERE username = 'harshil_patel'),
  NOW() - INTERVAL '3 hours'
FROM articles a WHERE a.title LIKE 'Climate Crisis%';

INSERT INTO comments (body, article_id, author_id, created_at)
SELECT
  'The loss and damage finance point is crucial and massively undercovered. The countries least responsible for emissions are absorbing costs they cannot afford.',
  a.id,
  (SELECT id FROM users WHERE username = 'dev_insider'),
  NOW() - INTERVAL '2 hours'
FROM articles a WHERE a.title LIKE 'Climate Crisis%';
