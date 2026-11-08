CREATE UNIQUE INDEX newsletter_request_id ON newsletter_requests(request_id);
CREATE TABLE newsletter_welcomes (
 request_id TEXT PRIMARY KEY,
 email_key TEXT NOT NULL,
 attempted_at INTEGER NOT NULL,
 state TEXT NOT NULL CHECK(state IN ('sending','accepted','suppressed','needs_review')),
 provider_id TEXT
);
CREATE TABLE newsletter_suppressions (
 email_key TEXT PRIMARY KEY,
 request_id TEXT NOT NULL,
 opted_out_at INTEGER NOT NULL,
 synced_at INTEGER,
 attempts INTEGER NOT NULL DEFAULT 0,
 next_attempt_at INTEGER NOT NULL
);
CREATE INDEX newsletter_suppression_sync ON newsletter_suppressions(synced_at,next_attempt_at);
