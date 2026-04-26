output "apex_record_id" {
  description = "Cloudflare record ID for the apex CNAME."
  value       = cloudflare_dns_record.apex.id
}

output "www_record_id" {
  description = "Cloudflare record ID for the www CNAME."
  value       = cloudflare_dns_record.www.id
}
