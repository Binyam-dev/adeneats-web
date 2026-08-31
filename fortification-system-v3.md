# Pipeline Fortification System v3 — Three-Sided QA/QC

**Status:** Upgrade to QA.md v2 (plan-alignment, unit tests, reasoning trace, iterate loop, e2e completeness)
**Adds:** Real tooling behind the existing gates (ECC) + a new adversarial/security gate (Strix)
**Place at:** repo root as `FORTIFICATION.md`, alongside `QA.md`

---

## The three sides

A change only reaches Release once it has survived all three:

| Side | What it checks | Owned by |
|---|---|---|
| **A — Correctness** | Does it match the plan, pass tests, and is every claim evidence-backed? | QA.md v2, Steps 1–3, 5 (unchanged) |
| **B — Engineering Standards** | Is it built the way your stack is supposed to be built — coverage, patterns, clean errors? | **ECC** (new — real tooling behind existing subagent roles) |
| **C — Adversarial** | Does it survive someone actually trying to break it? | **Strix** (new — Step 6) |

Sides A and B run continuously as code is built. Side C runs once B is clean, as the last gate before Release.

---

## Side B — ECC: engineering standards behind your existing roles

ECC (ecc.tools, open-source, MIT, `npm i -g ecc-universal`) is a catalog of Claude Code skills/agents/commands. Install a curated subset — not the full 157-item catalog, to keep each subagent's context lean — mapped directly onto the 8 roles you already have. This isn't a 9th role; it's real tooling replacing what those roles were doing by prompt-only.

| Existing role | ECC additions | What it changes |
|---|---|---|
| Architect | `skills/blueprint` | Turns the plan into a step-by-step construction plan the Builder executes against, not just a prose spec |
| Builder | `skills/tdd-workflow`, stack-specific pattern skill (e.g. `skills/frontend-patterns`, `skills/backend-patterns`, `skills/postgres-patterns` — swap for your actual stack) | Code is written test-first, following your stack's actual idioms instead of generic output |
| Tester | `agents/tdd-guide` (enforces 80%+ coverage), `agents/e2e-runner` (Playwright, screenshots, traces) | Step 2 and Step 5 get real coverage enforcement and real browser-driven e2e runs, not a checklist |
| Fixer | `agents/build-error-resolver`, `agents/loop-operator` | Step 4's loop gets a dedicated build-error specialist and an operator that intervenes if the loop stalls, not just retries blindly |
| Reviewer | `agents/code-reviewer` | Step 1 and Step 3's alignment/evidence checks get a second, independently-contexted reviewer pass |
| Security | `agents/security-reviewer`, `skills/security-scan` | OWASP Top 10 and secret-detection sweep, feeding into Side C rather than replacing it |
| Product QA | `skills/eval-harness` | Scores agent output against defined criteria — this is what "evidence" in Step 3 gets graded against |
| Release | `skills/deployment-patterns`, `commands/quality-gate`, `commands/harness-audit` | CI/CD, rollback strategy, and a final automated gate check before merge |

Cross-cutting (not tied to one role): `skills/verification-loop` and `skills/continuous-agent-loop` — these formalize the structured retry/verify pattern Step 4 already describes, giving it an actual reusable implementation instead of a bespoke one.

---

## Side C — Strix: the adversarial gate (new Step 6)

Strix (usestrix/strix, open-source, 40K+ stars) runs autonomous agents that behave like real attackers — they execute your app, find vulnerabilities, and validate each one with a working proof-of-concept, not a pattern-matched guess. It ships as Claude Code skills directly (SKILL.md-compatible), so it installs the same way ECC does.

**Step 6 — Adversarial Fortification Gate**

**Runs:** after Step 5 (End-to-End Completeness) passes, before Release. This is the new last gate.
**Owner:** Strix, via two of its skills:

- `ci-security-scanning-with-strix` — runs on every PR, scoped to the diff. Fast, targeted, catches what changed.
- On any finding, `fix-security-vulnerabilities-with-strix` — remediates and re-scans to confirm the fix actually holds, not just that the code changed.
- For release-candidate builds (not every PR — this one's expensive), the `owasp-top-10-testing` workflow runs a full pass: injection, broken access control, SSRF, auth/session flaws, business-logic abuse.

**Fails the gate if:** any finding isn't auto-remediated and re-verified. Routes back into **Step 4's Fixer loop** — same 3-attempt cap, same GitHub Issue escalation on the 3rd failure, except security findings get tagged `priority:security` on escalation so they don't sit in the same queue as a failed unit test.

**Cost note:** Strix runs real exploit attempts, which costs real LLM tokens per run (expect low-to-mid double-digit dollars for a full OWASP pass, less for diff-scoped PR scans). Run the lightweight diff scan on every PR; save the full OWASP pass for release candidates, not every commit.

---

## Updated pipeline flow

```
Architect (+blueprint) → Builder (+tdd-workflow, stack patterns)
        → [Step 1: Alignment (+code-reviewer)]
        → [Step 2: Unit Tests (+tdd-guide, 80%+ coverage)]
        → [Step 3: Reasoning Trace (+eval-harness scoring)]
               │ any fail
               ▼
        [Step 4: Fixer loop — build-error-resolver + loop-operator, max 3]
               │ 3rd fail → GitHub Issue + halt
        [Step 3 pass]
        → [Step 5: E2E Completeness (+e2e-runner, Playwright)]
        → [Step 6: Adversarial Gate — Strix diff scan (every PR) / OWASP pass (release candidates)]
               │ finding → back to Step 4 (tagged priority:security)
               │ 3rd fail on a security finding → GitHub Issue (priority:security) + halt
        [Step 6 pass]
        → Release (+deployment-patterns, quality-gate, harness-audit)
```

## What doesn't change

- The 3-attempt cap and GitHub Issues escalation stay exactly as they are — Side C plugs into the same loop rather than creating a parallel one.
- The qa-verifier's read-only, structurally-independent role is unchanged — Strix's proof-of-concept validation is a second, different kind of independent check (adversarial, not evidentiary), not a replacement for it.
- Bounded self-improvement (agents propose changes to a review file) still applies to any of this — including which ECC items stay installed.
