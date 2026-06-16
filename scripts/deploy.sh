#!/usr/bin/env bash
#
# One-command deploy of the built site to the cPanel server.
#
# Usage (from Git Bash, in the project root):
#   npm run deploy            # ship code changes (most common)
#   npm run deploy -- --deps  # also reinstall server deps (when package.json changed)
#
# What it does:
#   1. Builds the Next.js standalone bundle locally (correct, no server build).
#   2. Sends ONLY the built app to the server — never node_modules, the
#      database, or uploaded media, so live content is always preserved.
#   3. Restarts the app and checks the site is up.
#
# Native modules (sharp/libsql) already live in the server's managed Node
# environment, so you only need --deps when you add/upgrade a dependency.

set -euo pipefail

# ----- config -------------------------------------------------------------
SSH_KEY="$HOME/.ssh/natanem_deploy"
SSH_USER="natanewn"
SSH_HOST="natanemengineering.com"
SSH_PORT="22"
APP_DIR="natanem-web"
SITE_URL="https://natanemengineering.com"
# --------------------------------------------------------------------------

SSH="ssh -i $SSH_KEY -p $SSH_PORT -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o LogLevel=ERROR $SSH_USER@$SSH_HOST"

WITH_DEPS="no"
[[ "${1:-}" == "--deps" ]] && WITH_DEPS="yes"

echo "==> [1/5] Building standalone bundle..."
STANDALONE=1 npm run build >/dev/null
echo "    build OK"

echo "==> [2/5] Assembling bundle (excluding node_modules, db, media)..."
rm -rf deploy && mkdir -p deploy
cp -r .next/standalone/. deploy/
rm -rf deploy/node_modules
mkdir -p deploy/.next/static
cp -r .next/static/. deploy/.next/static/
cp -r public/. deploy/public/
rm -f deploy/payload.db deploy/.env
rm -rf deploy/media deploy/tmp
echo "    bundle size: $(du -sh deploy | cut -f1)"

echo "==> [3/5] Transferring to server..."
$SSH "cd ~/$APP_DIR && rm -rf .next server.js public"
tar czf - -C deploy . | $SSH "tar xzf - -C ~/$APP_DIR"
rm -rf deploy
echo "    transfer OK"

if [[ "$WITH_DEPS" == "yes" ]]; then
  echo "==> [3b] Installing production dependencies on server..."
  NODE_VER=$($SSH "ls ~/nodevenv/$APP_DIR/ | head -1")
  $SSH "source ~/nodevenv/$APP_DIR/$NODE_VER/bin/activate && cd ~/$APP_DIR && npm install --omit=dev --no-audit --no-fund"
  echo "    dependencies installed"
fi

echo "==> [4/5] Restarting app..."
$SSH "mkdir -p ~/$APP_DIR/tmp && touch ~/$APP_DIR/tmp/restart.txt"

echo "==> [5/5] Verifying ($SITE_URL)..."
sleep 12
CODE=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 40 "$SITE_URL/")
if [[ "$CODE" == "200" ]]; then
  echo "    ✓ Live and healthy (HTTP 200)"
  echo "==> Deploy complete."
else
  echo "    ⚠ Site returned HTTP $CODE — check the app log:"
  echo "      ssh -i $SSH_KEY $SSH_USER@$SSH_HOST 'tail -30 ~/$APP_DIR/stderr.log'"
  exit 1
fi
