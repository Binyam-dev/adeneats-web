# The Fortified Pipeline — v3

**Supersedes:** `qa-framework-v2.md`'s step ordering (the 5 steps aren't gone — they're absorbed into Sides 5 and 6 below, hardened by what the other frameworks do better)
**Built from:** direct comparison of your existing 8-subagent system against GitHub Spec Kit, BMAD-METHOD's Test Architect (Quinn), and GSD Core — the three frameworks that dominate spec-driven AI development in 2026
**Place at:** repo root as `PIPELINE.md`

---

## What "fortified from each side" means

Six independent lines of defense. Each one catches a failure mode the others structurally can't. A change has to clear all six — passing one side is never treated as proof the others would also pass.

| Side | Catches | Borrowed from |
|---|---|---|
| 1. Constitutional Guardrail | Silent drift from your own standards | Spec Kit |
| 2. Risk-Front Assessment | Expensive mistakes found too late to be cheap | BMAD (Quinn) |
| 3. Structural Context Isolation | Quality decay from a long, dirty session | GSD Core |
| 4. Traceable Build | Requirements that quietly get dropped or reinterpreted | BMAD + Spec Kit |
| 5. Independent Evidence Verification | Hallucinated claims of correctness | Your existing system, hardened |
| 6. Convergence Loop + Ship Gate | Shipping something "done" that isn't actually finished | Your existing system + Spec Kit's converge |

---

## Side 1 — Constitutional Guardrail *(new)*

A single `CONSTITUTION.md` at repo root: the non-negotiable principles every subagent gets re-shown at the start of every phase, not just at kickoff. Spec Kit's version of this is the strongest governance primitive of the three frameworks — because the constitution is re-surfaced every time, an agent can't quietly violate a principle three phases later once the original context has scrolled away.

Write 5-10 real non-negotiables, not generic ones. Examples in the pattern you'd actually use:
- No feature ships without an integration test against real data
- No new dependency without a documented reason
- Every subagent handoff writes to the audit trail — silent handoffs are a constitution violation, not a style issue

**Mechanism:** every subagent's system prompt opens with "Read CONSTITUTION.md before doing anything else." Architect, Builder, Fixer — all of them, every phase.

## Side 2 — Risk-Front Assessment *(new)*

Runs **before** Builder writes a line of code, not after. BMAD's Quinn scores every story 1-9 on technical debt impact, integration complexity, regression potential, and security exposure. A score ≥9 blocks the pipeline until mitigated; ≥6 requires an explicit logged CONCERNS acknowledgment before proceeding.

**Mechanism:** Architect produces a risk score alongside the spec, using the same four dimensions. High-risk changes get a test-design pass (what BMAD calls test-design — test scenarios mapped to each acceptance criterion, before Builder starts) instead of jumping straight to implementation.

**Why front-loaded matters:** catching a design-level risk before code exists is cheap. Catching it in Step 5 after Builder, Tester, and Fixer have all touched it is expensive — this side exists specifically to shift that cost left.

## Side 3 — Structural Context Isolation *(new)*

The mechanical fix for the failure mode your existing system doesn't yet address. GSD Core's core finding: an executor running with 180k tokens of accumulated session history is a degraded executor: past roughly 70% context usage, models measurably start hallucinating and dropping requirements. An executor that starts clean and reads only what its phase needs operates at full capacity.

**Mechanism:** every subagent in your 8-stage chain (Architect, Builder, Tester, Fixer, Reviewer, Security, Product QA, Release) starts with a **fresh context window**, reading only: the constitution, the specific plan/task it owns, and the prior phase's written output — never the full accumulated conversation. This is a structural change to how you invoke subagents, not a new subagent.

## Side 4 — Traceable Build *(new)*

Every requirement gets a stable ID (`REQ-001`, `REQ-002`...). Every plan task, every test, every review comment references the ID it's satisfying. This is what makes Side 5's "did we cover everything" check answerable in fact rather than in vibes.

**Mechanism:** Architect's spec output assigns REQ-IDs. Builder's commits reference them. Tester's test names reference them. The independent verifier (Side 5) checks two coverage axes, not one: **requirement coverage** (was every REQ-ID addressed?) and **decision coverage** (was every design decision actually implemented as decided, not as reinterpreted?) — plus the original phase-goal alignment check from v2.

## Side 5 — Independent Evidence Verification *(hardened from v2 Steps 1-3)*

Your existing Steps 1-3 (plan alignment, unit tests, evidence-cited reasoning trace) still run exactly as specified in `qa-framework-v2.md`. Two hardenings:

- **Genuine isolation, not just role separation.** qa-verifier must run in a context that never saw the code being written — not a different persona prompt in the same session. Using the same model to write code and grade its own homework is structurally weak: the tests and the review can inherit the same blind spots as the code, because they came from the same reasoning.
- **Three coverage axes, not one.** Alignment check now verifies requirement coverage, decision coverage, and phase-goal alignment as three separate pass/fail checks, using the REQ-IDs from Side 4.

## Side 6 — Convergence Loop + Ship Gate *(upgraded from v2 Steps 4-5)*

Your capped 3-attempt Fixer loop stays, but the **exit condition** upgrades from "tests pass" to Spec Kit's convergence check: a read-only cross-artifact consistency pass confirming the code, the spec, and the tasks all still agree with each other, not just that tests are green. Re-run Fixer → re-verify → re-check convergence, capped at 3 cycles, then the existing GitHub Issue escalation with full history.

Once converged, the existing Step 5 end-to-end completeness gate runs (no stubs, no orphaned UI, no dead code), plus a final lightweight conversational UAT pass — walk through the feature's acceptance criteria one at a time against the running build — before Release fires.

---

## Graded gate states *(new — replaces binary pass/fail everywhere)*

Every side above now reports one of four states, not just pass/fail:

- **PASS** — proceed
- **CONCERNS** — proceed, but only with a logged owner + written reason (a waiver, not a silent skip)
- **FAIL** — blocked, routes to Side 6's loop
- **WAIVED** — a prior FAIL or CONCERNS explicitly overridden by you, with the reason recorded permanently in the audit trail

This matters most on Side 2 (risk) and Side 5 (evidence) — those are the two sides most likely to produce a defensible "ship anyway, here's why" instead of a hard block.

---

## Updated flow

```
CONSTITUTION.md (read by every subagent, every phase)
        │
[Side 2: Risk-Front] ──FAIL(≥9)──► blocked until mitigated
        │ PASS/CONCERNS
        ▼
Architect → Builder → Tester → Reviewer   (each: Side 3 fresh context, Side 4 REQ-IDs)
        │
[Side 5: Independent Evidence Verification — 3 coverage axes]
        │ FAIL
        ▼
[Side 6: Fixer loop, re-verify, re-check convergence — max 3 cycles] ──3rd fail──► GitHub Issue + halt
        │ converged
        ▼
[Side 6: Completeness + Security + UAT Gate]
        │ FAIL
        └──────────────────────────────────────────► back into Fixer loop
        │ PASS/CONCERNS(waived)
        ▼
      Release
```

## What's genuinely new vs. what's carried over

**Carried over unchanged:** your 8-subagent chain, the capped 3-attempt structure, qa-auditor/qa-verifier as named subagents, the bounded self-improvement pattern (agents propose changes to a review file, never self-modify).

**New:** CONSTITUTION.md, front-loaded risk scoring, fresh-context-per-phase as an enforced mechanism, REQ-ID traceability, three-axis coverage checking, graded gate states with waivers, convergence-based (not just test-based) loop exit.
