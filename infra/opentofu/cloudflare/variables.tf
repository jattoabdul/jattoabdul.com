variable "cloudflare_account_id" {
  description = "Cloudflare account ID that owns the jattoabdul.com zone."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for jattoabdul.com."
  type        = string
}

variable "root_domain" {
  description = "Root domain for the personal site."
  type        = string
  default     = "jattoabdul.com"
}

# ── Apex (jattoabdul.com) ────────────────────────────────────────────────────

variable "apex_cname_target" {
  description = "CNAME target Railway provides for jattoabdul.com."
  type        = string
}

variable "apex_railway_verification_token" {
  description = "TXT record content Railway provides for jattoabdul.com ownership verification (format: railway-verify=<token>)."
  type        = string
}

# ── www (www.jattoabdul.com) ─────────────────────────────────────────────────

variable "www_cname_target" {
  description = "CNAME target Railway provides for www.jattoabdul.com."
  type        = string
}

variable "www_railway_verification_token" {
  description = "TXT record content Railway provides for www.jattoabdul.com ownership verification."
  type        = string
}

# ── Cloudflare proxy mode ────────────────────────────────────────────────────

variable "proxied" {
  description = "Whether to enable the Cloudflare orange-cloud proxy. TrustKarry runs DNS-only for simpler ownership verification + TLS renewal — recommend the same here for launch."
  type        = bool
  default     = false
}
