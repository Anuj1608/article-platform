-- All passwords use BCrypt cost-10.
-- harshil_patel  → Harshil123!
-- alex_morgan    → Tech1234!
-- sarah_chen     → Writer123!
-- dev_insider    → Demo1234!
-- global_pulse   → Global123!

INSERT INTO users (username, email, password_hash, created_at) VALUES
(
  'harshil_patel',
  'harshil.patel@bacancy.com',
  '$2a$10$6ZuNmK47kJHF5RqvtbMraeBOryN5mu965MojHEVoV.0.1jNOHom2G',
  NOW() - INTERVAL '30 days'
),
(
  'alex_morgan',
  'alex.morgan@articleplatform.com',
  '$2a$10$MBQZS1XtiGnD2OFFChZ4CeImdfTnSk.wVPf4h7gFOQAhEs24WKrie',
  NOW() - INTERVAL '25 days'
),
(
  'sarah_chen',
  'sarah.chen@articleplatform.com',
  '$2a$10$Oimp4.jqJtTGZ.Ul6RswUOAYzurLdS7RfqgbzjnVRZxHev9ZpfjcK',
  NOW() - INTERVAL '20 days'
),
(
  'dev_insider',
  'dev@articleplatform.com',
  '$2a$10$bXStjYERHTswyvoxC9Wp1.a6vV80e8.jVvDR82ACnnJyPLbOxV7ZC',
  NOW() - INTERVAL '18 days'
),
(
  'global_pulse',
  'global@articleplatform.com',
  '$2a$10$9tlZS5XiHN.ztrX6t0JFjuQBPyG3fYVNgOXoyLw1T46QuU2vot9cW',
  NOW() - INTERVAL '15 days'
);
