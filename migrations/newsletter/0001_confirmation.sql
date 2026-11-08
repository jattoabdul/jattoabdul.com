CREATE TABLE newsletter_requests (
 email_key TEXT PRIMARY KEY, email TEXT NOT NULL, token_hash TEXT NOT NULL UNIQUE,
 request_id TEXT NOT NULL, requested_at INTEGER NOT NULL, expires_at INTEGER NOT NULL,
 consent_version TEXT NOT NULL, confirmed_at INTEGER,
 state TEXT NOT NULL CHECK(state IN ('pending','processing','confirmed','suppressed','needs_review')),
 provider_id TEXT
);
CREATE INDEX newsletter_expiry ON newsletter_requests(state,expires_at);
CREATE TABLE newsletter_limits (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
