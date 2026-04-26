// Apex (jattoabdul.com) → Railway

resource "cloudflare_dns_record" "apex" {
  zone_id = var.cloudflare_zone_id
  name    = var.root_domain
  type    = "CNAME"
  content = var.apex_cname_target
  ttl     = 1
  proxied = var.proxied
  comment = "jattoabdul.com personal site on Railway"
}

resource "cloudflare_dns_record" "apex_railway_verify" {
  zone_id = var.cloudflare_zone_id
  name    = "_railway-verify"
  type    = "TXT"
  content = var.apex_railway_verification_token
  ttl     = 1
  comment = "Railway custom domain verification for jattoabdul.com"
}

// www (www.jattoabdul.com) → Railway

resource "cloudflare_dns_record" "www" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  type    = "CNAME"
  content = var.www_cname_target
  ttl     = 1
  proxied = var.proxied
  comment = "jattoabdul.com www alias on Railway"
}

resource "cloudflare_dns_record" "www_railway_verify" {
  zone_id = var.cloudflare_zone_id
  name    = "_railway-verify.www"
  type    = "TXT"
  content = var.www_railway_verification_token
  ttl     = 1
  comment = "Railway custom domain verification for www.jattoabdul.com"
}
