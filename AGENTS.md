# AGENTS.md

This file is the shared contract for any AI coding tool working in this repo —
Claude Code, Cursor, Codex, OpenCode, GitHub Copilot, or Gemini. Whichever tool
you are, follow this. `CLAUDE.md` and `.github/copilot-instructions.md` in this
repo both just point back here — this is the one source of truth.

## What "done" means here

A change is not done when it compiles or passes a quick check. It's done when
it would pass all 6 fortification gates, which run for real in
`.github/workflows/fortification-gates.yml` regardless of which tool you are:

1. **Plan Alignment** — matches `docs/PLAN.md`'s stated scope for this change.
   No untracked scope creep, no silently-skipped planned pieces.
2. **Unit Tests** — full suite passes, coverage on touched files stays at or
   above 80%.
3. **Reasoning Trace** — your PR description must include an `## Evidence`
   section. Every claim you make about what the change does needs a citation:
   a test output line, a diff line, a spec section. Not an assertion.
4. **Bounded iteration** — if a gate fails, fix it and re-push. After 3 failed
   CI runs on the same PR, it auto-escalates to a GitHub Issue and halts. Use
   your attempts well — re-run the full gate set in your head before pushing,
   not just the piece that failed.
5. **End-to-End Completeness** — no `TODO`/`FIXME`/stub returns in touched
   paths, no orphaned UI without a wired backend call, feature exercised
   start-to-finish by at least one e2e test.
6. **Adversarial Gate** — Strix scans the diff for exploitable vulnerabilities.
   If you're touching auth, input handling, or anything that takes user data,
   assume this will run and write accordingly (parameterize queries, validate
   input, don't roll your own auth).

## Before you open a PR

- Write the `## Evidence` section yourself — don't leave it for CI to catch
  you missing it.
- If you have access to a tool-specific skill for tests, coverage, or
  security scanning (see `.agents/skills/`), use it — it's there so you don't
  have to reinvent what it already does.
- If something in `docs/PLAN.md` is genuinely out of date, say so in the PR
  rather than silently building around it.

## What NOT to do

- Don't try to defeat gate 3 with a vague evidence section just to get past
  CI — a reviewer (human or otherwise) will bounce it.
- Don't self-modify this file, the CI workflow, or anything under
  `.agents/skills/` directly. Propose changes via the review file described
  in `FORTIFICATION.md` instead.
