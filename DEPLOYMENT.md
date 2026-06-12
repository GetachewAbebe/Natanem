# Deploying to cPanel (natanemengineering.com)

Every push to the `main` branch on GitHub automatically builds the site and
deploys it to the cPanel server. The build runs on GitHub's servers — the
cPanel server only receives the finished app and runs it.

The live content database (`payload.db`) and uploaded images (`media/`) on the
server are **never touched by deployments**.

---

## One-time setup

### 1. Create an SSH key for deployments

In cPanel → **SSH Access** → **Manage SSH Keys**:

1. **Generate a New Key** — name it `github-deploy`, leave the passphrase
   empty (GitHub Actions cannot type a passphrase), key type RSA 4096 or
   ED25519.
2. Back on Manage SSH Keys, click **Manage → Authorize** next to the new
   public key.
3. Click **View/Download** on the **private** key and copy its full text
   (including the `-----BEGIN ... KEY-----` lines).

### 2. Add the GitHub repository secrets

In the GitHub repo → **Settings → Secrets and variables → Actions →
New repository secret**, create these four:

| Secret            | Value                                                       |
| ----------------- | ----------------------------------------------------------- |
| `CPANEL_SSH_HOST` | The server hostname (often the same as the cPanel address)  |
| `CPANEL_SSH_PORT` | The SSH port (`22` unless the host says otherwise)          |
| `CPANEL_SSH_USER` | `natanewn`                                                  |
| `CPANEL_SSH_KEY`  | The full private key text from step 1                       |

### 3. Run the first deploy

GitHub → **Actions** tab → **Deploy to cPanel** → **Run workflow**.
This creates `/home/natanewn/natanem-web` on the server with the built app.

### 4. Create the Node.js application in cPanel

cPanel → **Setup Node.js App** → **Create Application**:

- **Node.js version:** 20 or newer (highest available)
- **Application mode:** Production
- **Application root:** `natanem-web`
- **Application URL:** `natanemengineering.com`
- **Application startup file:** `server.js`

Then add these **environment variables** in the same screen:

| Name             | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| `PAYLOAD_SECRET` | A long random string — generate with `node -e "console.log(crypto.randomBytes(32).toString('hex'))"`. NOT the one from local `.env`. Keep a copy somewhere safe. |
| `DATABASE_URI`   | `file:./payload.db`                                          |
| `NODE_ENV`       | `production`                                                 |

Click **Create**, then **Restart**.

> Do NOT click "Run NPM Install" — the deploy bundle already contains
> everything it needs.

### 5. Upload the content database and media

The production site starts with an empty database. To carry over the content
created locally:

1. Stop the app (Setup Node.js App → Stop).
2. In **File Manager**, upload the local `payload.db` file into
   `/home/natanewn/natanem-web/`.
3. If there are uploaded images locally, upload the `media/` folder there too.
4. Start the app again.

Alternatively, start fresh: visit `https://natanemengineering.com/admin`,
create the first admin user, and enter content manually.

### 6. Enable HTTPS

cPanel → **SSL/TLS Status** → make sure `natanemengineering.com` has a valid
AutoSSL certificate (run AutoSSL if not). The site should be used as
`https://natanemengineering.com`.

---

## Everyday use

- **Deploy:** push (or merge) to `main`. Watch progress under the repo's
  **Actions** tab. The site updates in about 2–3 minutes.
- **Manual deploy:** Actions tab → Deploy to cPanel → Run workflow.
- **Content edits** (posts, projects, text) need **no deploy at all** — they
  are live the moment an editor saves them in `/admin`.

## Troubleshooting

- **Deploy failed at "Upload to server"** — check the four GitHub secrets,
  and that the SSH key is still authorized in cPanel.
- **Site shows an error after deploy** — in cPanel → Setup Node.js App,
  check the app is "Running" and restart it. Application logs are in
  `/home/natanewn/natanem-web/stderr.log` (visible in File Manager).
- **Rollback** — in GitHub, open the Actions tab, pick the last good run,
  and click "Re-run all jobs". That redeploys the previous version.
