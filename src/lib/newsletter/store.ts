export interface SignupRecord {
  email_key: string;
  email: string;
  token_hash: string;
  request_id: string;
  requested_at: number;
  expires_at: number;
  consent_version: string;
  confirmed_at: number | null;
  provider_id: string | null;
  state: 'pending' | 'processing' | 'confirmed' | 'suppressed' | 'needs_review';
}
export interface SuppressionRecord {
  email_key: string;
  request_id: string;
  opted_out_at: number;
  synced_at: number | null;
  attempts: number;
  next_attempt_at: number;
}
// Consent, dispatch and local suppression ledger. Resend remains the subscriber dashboard.
export class NewsletterStore {
  private db: D1Database;
  constructor(db: D1Database) {
    this.db = db;
  }
  async limit(bucket: string, maximum: number, expires: number) {
    const row = await this.db
      .prepare(
        `INSERT INTO newsletter_limits VALUES (?,1,?)
   ON CONFLICT(bucket) DO UPDATE SET count=count+1 RETURNING count`
      )
      .bind(bucket, expires)
      .first<{ count: number }>();
    return !!row && row.count <= maximum;
  }
  async prune(now: number) {
    await this.db.batch([
      this.db
        .prepare(
          'DELETE FROM newsletter_limits WHERE bucket IN (SELECT bucket FROM newsletter_limits WHERE expires_at<? LIMIT 100)'
        )
        .bind(now),
      this.db
        .prepare(
          "DELETE FROM newsletter_requests WHERE email_key IN (SELECT email_key FROM newsletter_requests WHERE state='pending' AND expires_at<? LIMIT 100)"
        )
        .bind(now),
    ]);
  }
  async issue(r: Omit<SignupRecord, 'confirmed_at' | 'provider_id' | 'state'>) {
    if (await this.suppressed(r.email_key)) return null;
    // A new request can rotate only an unconfirmed token, never a consent receipt.
    return this.db
      .prepare(
        `INSERT INTO newsletter_requests
   (email_key,email,token_hash,request_id,requested_at,expires_at,consent_version,state)
   VALUES (?,?,?,?,?,?,?,'pending') ON CONFLICT(email_key) DO UPDATE SET
   token_hash=excluded.token_hash,request_id=excluded.request_id,
   requested_at=excluded.requested_at,expires_at=excluded.expires_at,
   consent_version=excluded.consent_version
   WHERE newsletter_requests.state='pending' AND newsletter_requests.requested_at<?
   RETURNING request_id`
      )
      .bind(
        r.email_key,
        r.email,
        r.token_hash,
        r.request_id,
        r.requested_at,
        r.expires_at,
        r.consent_version,
        r.requested_at - 300
      )
      .first<{ request_id: string }>();
  }
  async claim(hash: string, now: number) {
    // Atomic across parallel clicks and Worker isolates. GET never calls this.
    return this.db
      .prepare(
        `UPDATE newsletter_requests SET state='processing',confirmed_at=?
   WHERE token_hash=? AND state='pending' AND expires_at>? RETURNING *`
      )
      .bind(now, hash, now)
      .first<SignupRecord>();
  }
  async find(hash: string) {
    return this.db
      .prepare('SELECT * FROM newsletter_requests WHERE token_hash=?')
      .bind(hash)
      .first<SignupRecord>();
  }
  async finish(hash: string, state: SignupRecord['state'], providerId: string | null = null) {
    await this.db
      .prepare(
        "UPDATE newsletter_requests SET state=?,provider_id=? WHERE token_hash=? AND state='processing'"
      )
      .bind(state, providerId, hash)
      .run();
  }
  async receipt(id: string) {
    return this.db
      .prepare('SELECT * FROM newsletter_requests WHERE request_id=?')
      .bind(id)
      .first<SignupRecord>();
  }
  async suppressed(emailKey: string) {
    return !!(await this.db
      .prepare('SELECT email_key FROM newsletter_suppressions WHERE email_key=?')
      .bind(emailKey)
      .first());
  }
  async reserveWelcome(r: SignupRecord, now: number) {
    return !!(await this.db
      .prepare(
        `INSERT INTO newsletter_welcomes
      (request_id,email_key,attempted_at,state)
      SELECT request_id,email_key,?,'sending' FROM newsletter_requests
      WHERE request_id=? AND state='processing' AND NOT EXISTS
      (SELECT 1 FROM newsletter_suppressions WHERE email_key=newsletter_requests.email_key)
      ON CONFLICT(request_id) DO NOTHING RETURNING request_id`
      )
      .bind(now, r.request_id)
      .first());
  }
  async welcomeAllowed(id: string) {
    return !!(await this.db
      .prepare(
        `SELECT request_id FROM newsletter_welcomes
      WHERE request_id=? AND state='sending' AND NOT EXISTS
      (SELECT 1 FROM newsletter_suppressions WHERE email_key=newsletter_welcomes.email_key)`
      )
      .bind(id)
      .first());
  }
  async finishWelcome(
    id: string,
    state: 'accepted' | 'suppressed' | 'needs_review',
    providerId: string | null = null
  ) {
    await this.db
      .prepare('UPDATE newsletter_welcomes SET state=?,provider_id=? WHERE request_id=?')
      .bind(state, providerId, id)
      .run();
  }
  async optOut(r: SignupRecord, now: number) {
    // One transaction commits suppression and cancels any future receipt use.
    await this.db.batch([
      this.db
        .prepare(
          `INSERT INTO newsletter_suppressions(email_key,request_id,opted_out_at,next_attempt_at)
        VALUES (?,?,?,?) ON CONFLICT(email_key) DO NOTHING`
        )
        .bind(r.email_key, r.request_id, now, now),
      this.db
        .prepare("UPDATE newsletter_requests SET state='suppressed' WHERE email_key=?")
        .bind(r.email_key),
    ]);
  }
  async claimSync(now: number, emailKey?: string) {
    // Lease limits concurrent retries. A crash becomes retryable after five minutes.
    return this.db
      .prepare(
        `UPDATE newsletter_suppressions SET attempts=attempts+1,next_attempt_at=?
      WHERE email_key=(SELECT email_key FROM newsletter_suppressions
      WHERE synced_at IS NULL AND next_attempt_at<=? AND (? IS NULL OR email_key=?)
      ORDER BY next_attempt_at LIMIT 1) RETURNING *`
      )
      .bind(now + 300, now, emailKey ?? null, emailKey ?? null)
      .first<SuppressionRecord>();
  }
  async synced(emailKey: string, now: number) {
    await this.db
      .prepare('UPDATE newsletter_suppressions SET synced_at=? WHERE email_key=?')
      .bind(now, emailKey)
      .run();
  }
  async syncFailed(r: SuppressionRecord, now: number) {
    await this.db
      .prepare(
        'UPDATE newsletter_suppressions SET next_attempt_at=? WHERE email_key=? AND synced_at IS NULL'
      )
      .bind(now + Math.min(3600, 300 * 2 ** Math.min(r.attempts - 1, 4)), r.email_key)
      .run();
  }
}
