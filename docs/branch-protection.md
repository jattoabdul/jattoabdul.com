# Branch protection setup

Repo is public. `main` should be protected so nobody (including a confused
future me) can force-push or merge unreviewed work.

GitHub doesn't yet have a stable API to declare branch-protection rules
inside the repo, so this is a one-time manual step. Document so it's easy
to redo if the repo is ever recreated.

## One-time setup

GitHub → **Settings → Branches → Add branch protection rule**

**Branch name pattern:** `main`

Enable:

- [x] **Require a pull request before merging**
  - [x] Require approvals: **1**
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners (uses `.github/CODEOWNERS`)
- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Required check: `Lint + build` (the job name from `.github/workflows/ci.yml`)
- [x] **Require conversation resolution before merging**
- [x] **Require linear history**
- [x] **Do not allow bypassing the above settings** (applies to admins too,
      otherwise you can self-approve via the "Bypass" button)

Leave off:

- Restrict who can push to matching branches (no need on a personal repo)
- Require signed commits (nice-to-have; add later if you set up SSH/GPG signing properly)

## Verify

After enabling:

1. Try to push directly to `main` — should be rejected.
2. Open a test PR — the merge button should be disabled until CI passes
   and you (as code-owner) approve.
3. Delete the test PR.
