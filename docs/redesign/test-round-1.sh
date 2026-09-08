#!/bin/zsh
# Runs public/__tests/round-1.html against the dev server in headless Chrome and prints the results.
# Start the dev server first: npm run dev -- -p 3005
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
URL="${1:-http://localhost:3005/__tests/round-1.html}"
OUT=$("$CH" --headless=new --disable-gpu --virtual-time-budget=40000 --window-size=1400,1000 --dump-dom "$URL" 2>/dev/null)
echo "$OUT" | grep -o '<title>[^<]*' | sed 's/<title>//'
echo "$OUT" | /usr/bin/python3 -c 'import sys,re,html; s=sys.stdin.read(); m=re.search(r"<pre id=\"log\">(.*?)</pre>", s, re.S); print(html.unescape(m.group(1)) if m else "no log found")'
