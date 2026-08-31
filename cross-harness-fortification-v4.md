# Cross-Harness Fortification System v4

**Status:** Restructures v3 (ECC + Strix mapped onto Claude Code subagents only) so the same gates hold regardless of which AI tool wrote the code.
**Core change:** enforcement moves out of `.claude/agents/` and into three layers, only the innermost of which is Claude-Code-specific.

---

## Why the restructure was needed

ECC and Strix were already cross-harness — that part needed no work. What wasn't portable was the custom piece: your 8 roles and the 6-step gate only existed as Claude Code subagent files, which nothing else reads. Cursor, Codex, Copilot, OpenCode, and Gemini would happily write code against this repo and never touch a single gate.

The fix: stop relying on any one tool's internal loop/delegation mechanics to *enforce* the gates. Use them only to *do the work*. Enforcement moves to CI, which runs identically no matter which tool produced the diff.

---

## Layer 1 — CI-enforced gates (the universal backstop)

Lives in `.github/workflows/fortification-gates.yml`. This is the only layer that's tool-agnostic by construction — it's a script running on a GitHub runner, indifferent to whether a human, Claude Code, Cursor, or Codex wrote the PR.

| Step | Enforced how | Tool-agnostic because |
|---|---|---|
| 1. Plan Alignment | CI job calls the Anthropic API directly with the diff + the plan doc, parses pass/fail | The API call is made by CI itself, not by whichever coding tool is running |
| 2. Unit Tests | Native test runner + coverage threshold check | Just exit codes |
| 3. Reasoning Trace | CI validates the PR body has an evidence section (test output / diff lines / spec citations), rejects if empty or unstructured | Structural check, not tool-dependent |
| 4. Iterate/Loop cap | CI **counts failed runs on the PR itself** (via a label, not any tool's internal retry loop) and escalates on the 3rd | Counting CI runs works no matter what's making the fixes between them |
| 5. E2E Completeness | Playwright (or your existing e2e runner) as a CI job | Same reasoning as Step 2 |
| 6. Adversarial Gate | Strix's CI-scanning skill, run headless with `--diff` scoping | Strix already runs standalone in CI, independent of the authoring tool |

This is the one genuine architecture change from v3: **Step 4's loop is no longer "the Fixer subagent gets 3 tries."** It's "this PR gets 3 failed CI runs before a GitHub Issue opens," which holds regardless of whether Claude Code, Cursor, or a human is pushing the fixes.

## Layer 2 — the instruction layer every tool can read

- **`AGENTS.md`** at repo root — the shared contract. States the plan, the 6 gates, and what "done" means. This is read natively by Cursor, Codex, and OpenCode; Copilot reads its own `.github/copilot-instructions.md`, so that file gets a two-line pointer to `AGENTS.md` rather than a duplicate; Gemini CLI supports it as opt-in.
- **`CLAUDE.md`** — kept as a thin pointer to `AGENTS.md`, since Claude Code's native convention still expects it. One file, not two sources of truth.
- **Skills directory** — install ECC's and Strix's skills into `.agents/skills/`, the broadest shared path (read natively by Copilot, Codex, Cursor, Gemini CLI; OpenCode via fallback; Claude Code via its own plugin path pointing at the same source).

## Layer 3 — per-harness adapters (thin, tool-specific)

Only where a tool has a real native mechanism worth using:

- **Claude Code:** keeps `.claude/agents/` — your 8 roles stay, now explicitly scoped as "do the work AGENTS.md describes," with Layer 1 double-checking the output either way.
- **Cursor:** `.cursor/rules` + `.cursor/hooks/adapter.js` (ECC's existing DRY adapter, translates Claude Code's hook format so the same scripts run without duplicating them).
- **Codex:** no real hooks — leans on `AGENTS.md` plus `model_instructions_file` overrides and sandbox permissions to carry the weight hooks would in other tools.
- **OpenCode:** plugin/event system, reuses ECC's hook logic through its adapter layer.
- **GitHub Copilot:** no hook system, no subagent API at all — this is the weakest-parity tool by design, not misconfiguration. `.github/copilot-instructions.md` (pointing to `AGENTS.md`) plus Layer 1's CI gates is the entire enforcement story here, since Copilot itself can't loop or self-verify the way the others can.
- **Gemini:** opt-in `AGENTS.md` support; treat similarly to Copilot until that matures.

## Honest parity table

| Capability | Claude Code | Cursor | Codex | OpenCode | Copilot | Gemini |
|---|---|---|---|---|---|---|
| Subagent delegation | Native | Custom modes | No | Plugin/event system | No | Limited |
| Hooks | Native | Via adapter | Instruction-only | Via adapter | None | None |
| Reads `AGENTS.md` | Via pointer only | Native | Native | Native | No (own file, pointed) | Opt-in |
| Reads shared skills path | Own plugin path | Native | Native | Fallback | Native | Native |
| Where enforcement *actually* holds | Subagents **+ CI** | Rules/hooks **+ CI** | Instructions **+ CI** | Adapter **+ CI** | **CI only** | **CI only** |

The rightmost column of that last row is the point: for Copilot and Gemini, Layer 1 isn't a backstop — it's the whole mechanism. This table is current as of Aug 2026 documentation for a fast-moving space; worth a quick spot-check against each tool's own docs before relying on it long-term.

## What carries over from v3 unchanged

- The 6 gates themselves (Steps 1–6) and their pass/fail definitions.
- The GitHub Issue escalation pattern and `priority:security` tagging for Strix findings.
- ECC's curated subset and role mapping — just installed via its actual multi-target flags now instead of Claude-Code-only.
- Bounded self-improvement (proposals to a review file, no self-modification).
