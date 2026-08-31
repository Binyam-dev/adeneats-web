# Prompt — Migrate to Cross-Harness Fortification

Run this in Claude Code at repo root (it's your primary tool per your setup),
with `cross-harness-fortification-v4.md`, `fortification-gates.yml`,
`AGENTS.md`, and `CLAUDE.md` attached in the session. The same prompt text
works if run from Codex or another AGENTS.md-native tool instead — nothing
in it is Claude-Code-specific except where noted.

---

```
You are restructuring this repo's QA/security pipeline from Claude-Code-only
to cross-harness, per the attached cross-harness-fortification-v4.md spec.
Do not discard the existing 8-subagent setup — it becomes one adapter layer
among several, not the whole system.

CONTEXT
This repo already has: an 8-subagent Claude Code pipeline, QA.md (5 gates),
FORTIFICATION.md (ECC + Strix mapped onto those subagents, Claude-Code-only).
The goal now is the same 6 gates, enforced the same way, regardless of
whether Claude Code, Cursor, Codex, OpenCode, Copilot, or Gemini authored
the change.

PART 1 — CI LAYER (does the real enforcing now)
1. Add the attached fortification-gates.yml to .github/workflows/.
2. Before it can run for real, fill in the CUSTOMIZE-marked spots: actual
   test/build commands for this repo's stack, the real path to the plan/spec
   doc (create docs/PLAN.md from the existing Architect output if it doesn't
   exist as a file yet), and the coverage threshold.
3. Add repo secrets this workflow needs (ANTHROPIC_API_KEY at minimum, plus
   whatever Strix's current CI docs require — check docs.strix.ai/llms.txt,
   don't assume the flag names in the YAML comments are exactly right, they're
   marked CUSTOMIZE for a reason).
4. Confirm the workflow actually runs by opening a throwaway PR and showing
   me the Actions run, not just that the YAML is syntactically valid.

PART 2 — INSTRUCTION LAYER
1. Add the attached AGENTS.md and CLAUDE.md to repo root as given.
2. Create .github/copilot-instructions.md with a two-line pointer to
   AGENTS.md, matching CLAUDE.md's pattern — don't duplicate content into it.
3. Move the ECC + Strix skills already installed (from the earlier
   Claude-Code-only setup) into .agents/skills/ if they aren't already
   there — this is the path Copilot, Codex, Cursor, and Gemini CLI read
   natively. Verify against ECC's current cross-harness docs
   (github.com/affaan-m/ECC/blob/main/docs/architecture/cross-harness.md)
   since install paths change; don't assume the ones in this prompt are
   still current.

PART 3 — RE-INSTALL ECC AND STRIX WITH ACTUAL MULTI-TARGET FLAGS
1. Re-run the ECC install using its real multi-target syntax rather than the
   Claude-Code-only install from before — something like
   npx ecc-install --profile developer --target claude,cursor,codex,opencode
   (confirm the actual flag names and supported targets against ECC's own
   docs first; they've changed version to version).
2. For Cursor specifically: confirm .cursor/hooks/adapter.js exists and
   correctly maps to the existing Claude Code hook scripts rather than
   duplicating them.
3. For Strix: confirm its skill install already covers Cursor/Codex/OpenCode
   (it advertises SKILL.md-compatibility across "any SKILL.md-compatible
   agent") — if any target needs a separate install step, do it.
4. Run npx ecc-agentshield scan (or current equivalent) and show me the
   result — this checks your own config for secrets, permission issues, and
   hook injection risk across the harnesses you just wired up.

PART 4 — PARITY CHECK
1. For each tool in {Claude Code, Cursor, Codex, OpenCode, Copilot, Gemini}
   that's actually usable in this environment, do a smoke test: make a
   trivial change with that tool (or simulate its instruction-reading path
   if the tool itself isn't installed here), open a PR, and confirm the CI
   gates in Part 1 fire the same way regardless of which tool authored it.
2. Where a tool structurally can't match another (Copilot's lack of hooks,
   for instance), don't try to force parity — confirm CI still catches what
   the tool itself can't, and note the gap plainly rather than papering
   over it.
3. Update the parity table in cross-harness-fortification-v4.md if what you
   find running it for real differs from what's documented — this is exactly
   the kind of thing that should get corrected once you have real signal
   instead of secondhand docs.

Show me: the CI run from a real PR, the AgentShield scan result, and the
parity check outcome per tool before considering this done.
```
