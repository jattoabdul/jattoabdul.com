#!/usr/bin/env bash
# Post-deploy smoke test for jattoabdul.com.
# Usage: ./infra/scripts/production-smoke.sh [base_url]
#   default base_url: https://jattoabdul.com

set -euo pipefail

BASE="${1:-https://jattoabdul.com}"
echo "Smoke testing $BASE"
echo

paths=(
  "/"
  "/writing"
  "/notes"
  "/projects"
  "/videos"
  "/about"
  "/contact"
  "/api/health"
  "/rss.xml"
  "/sitemap.xml"
  "/robots.txt"
)

fail=0
for p in "${paths[@]}"; do
  url="${BASE}${p}"
  status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 -L "$url")
  if [[ "$status" =~ ^(200|301|308)$ ]]; then
    printf "  \033[32mOK\033[0m   %3s  %s\n" "$status" "$p"
  else
    printf "  \033[31mFAIL\033[0m %3s  %s\n" "$status" "$p"
    fail=$((fail + 1))
  fi
done

echo
if [[ "$fail" -eq 0 ]]; then
  echo "All probes green."
  exit 0
else
  echo "$fail probe(s) failed."
  exit 1
fi
