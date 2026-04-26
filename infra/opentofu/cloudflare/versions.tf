terraform {
  required_version = ">= 1.8.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }
}

# The Cloudflare provider reads CLOUDFLARE_API_TOKEN (or
# CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL) from the environment.
# Don't pin secrets in this file.
provider "cloudflare" {}
