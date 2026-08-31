# Software Factory QA Framework v2 — 5-Step Loop

**Status:** Upgrade to the existing pre-deploy QA system (universal audit template + qa-auditor + qa-verifier + qa-loop-runbook)
**Scope:** Formalizes Steps 1–3 (already implicit in the pipeline), adds Steps 4–5 (new gates)
**Place at:** repo root as `QA.md`, alongside (not replacing) the existing 4 audit files

---

## Why this upgrade

The original pipeline (Architect → Builder → Tester → Fixer → Reviewer → Security → Product QA → Release) already does most of this implicitly, but it isn't written down as one closed loop that every deployment is required to pass through. This file makes the loop explicit, gives it a single entry/exit contract, and adds the two gates that were missing: a *formalized* retry loop (not just a runbook) and an *end-to-end completeness* check before Release is allowed to fire.

## Mapping to what already exists

| Step | New or existing | Owner subagent(s) | Existing artifact it extends |
|---|---|---|---|
| 1. Plan Alignment | Existing, now formalized | Architect + Reviewer | Architect's original spec doc |
| 2. Unit Test Verification | Existing, now formalized | Tester | Deterministic CI gates |
| 3. Reasoning Trace (anti-hallucination) | Existing, now formalized | qa-auditor | Universal audit template |
| 4. Bounded Iterate / Loop-on-Failure | **New formalization** | Fixer | qa-loop-runbook, 3-attempt cap |
| 5. End-to-End Completeness Gate | **New gate** | Security + Product QA | 9 audit categories → becomes 10 |

---

## Step 1 — Plan Alignment Check

**Runs:** immediately after Builder produces a diff, before Tester runs.
**Owner:** Reviewer, cross-checking against Architect's original spec.

- Pull the original plan/spec section this change maps to.
- Diff the actual code change against that section's stated scope.
- Flag anything built that wasn't specified (scope creep) and anything specified that wasn't built (gap).
- Output: `alignment-report.md` appended to the audit trail — pass/fail plus a one-line reason.

**Fails the gate if:** the diff touches files/behavior outside the plan's stated scope, or leaves a planned piece unbuilt with no explanation.

## Step 2 — Unit Test Verification

**Runs:** after Step 1 passes.
**Owner:** Tester.

- Run the full unit test suite for touched modules, not just new tests for the new code.
- Deterministic CI gate — no "looks right," only pass/fail exit codes.
- Output: test report attached to the audit trail, including coverage delta.

**Fails the gate if:** any test fails, or coverage on touched files drops.

## Step 3 — Reasoning Trace (Anti-Hallucination Gate)

**Runs:** after Step 2 passes, before the change is marked "audited."
**Owner:** qa-auditor, checked independently by qa-verifier (read-only).

- Every claim the auditor makes ("this works," "this matches spec X") must cite the specific evidence: a test output line, a diff line, a spec section — not an assertion.
- qa-verifier's only job is to confirm the cited evidence actually supports the claim. It cannot fix anything — structurally read-only, same as today.
- Output: evidence-linked audit log, one line per claim.

**Fails the gate if:** any claim in the audit has no cited evidence, or the verifier finds a citation that doesn't actually support the claim.

## Step 4 — Bounded Iterate / Loop-on-Failure *(new formalization)*

**Runs:** whenever Step 1, 2, or 3 fails.
**Owner:** Fixer.

This already exists as your 3-attempt repair loop with GitHub Issues escalation — this step folds it into the same QA.md contract so it isn't a separate runbook that's easy to forget:

- On failure, Fixer gets up to **3 attempts**. Each attempt must re-run **Steps 1–3 in full**, not just the step that failed — a fix that breaks alignment or drops evidence is still a failure.
- Every attempt is logged to the audit trail: what failed, what Fixer changed, what the re-run of 1–3 found.
- On the 3rd failed attempt, auto-escalate: open a GitHub Issue with the full failure history (all 3 attempts' audit logs) attached, and halt the pipeline for that change. No silent retries past the cap.

**Fails the gate if:** 3 attempts are exhausted without a clean pass through Steps 1–3.

## Step 5 — End-to-End Completeness Gate *(new)*

**Runs:** after Step 3 (or Step 4's recovery) passes, as the last check before Release.
**Owner:** Security + Product QA, jointly — this becomes the 10th audit category alongside the existing 9.

Purpose: catch the case where every individual piece passes QA but the *feature* isn't actually finished — the thing the video calls "producing end-to-end code before deployment."

Checklist:
- No stubbed functions, `TODO`, or placeholder returns in the touched code paths.
- No orphaned UI — every new UI element has a wired backend call, and vice versa.
- No dead code paths introduced (unreachable branches, unused new exports).
- The feature is exercised start-to-finish by at least one test or manual smoke-test step (ties into the existing post-deploy smoke test phase — this is the pre-deploy counterpart).

**Fails the gate if:** any checklist item is unmet. On failure, this routes back into Step 4's loop, not straight to Release.

---

## Updated pipeline flow

```
Architect → Builder → [Step 1: Alignment] → [Step 2: Unit Tests] → [Step 3: Reasoning Trace]
                              │ fail                  │ fail                 │ fail
                              └──────────────┴──────────────┴──────────► [Step 4: Fixer loop, max 3]
                                                                                  │ 3rd fail
                                                                                  ▼
                                                                          GitHub Issue + halt

[Step 3 pass] → [Step 5: End-to-End Completeness] → Release
                        │ fail
                        └──────────────────────────► [Step 4: Fixer loop]
```

## Bounded self-improvement (unchanged)

Same rule as today: agents can propose changes to this QA.md via a review file — they don't self-modify it. Any change to the 5 steps above goes through that same proposal-and-human-review path.
