# Claude Code Prompt — Deploy the 5-Step QA Upgrade

Paste this into Claude Code at the root of the software-factory repo. It finds your existing 4 audit files, folds them into one QA.md contract, and wires in the two new gates.

---

```
You are upgrading the existing pre-deploy QA system in this repo to a formalized
5-step loop. Do not rebuild anything from scratch — extend what's already here.

CONTEXT
The repo has an 8-subagent pipeline (Architect → Builder → Tester → Fixer →
Reviewer → Security → Product QA → Release), deterministic CI gates, a capped
3-attempt repair loop with GitHub Issues escalation, and a 4-file pre-deploy
audit system: a universal audit template, a qa-auditor subagent, a qa-verifier
subagent (structurally read-only), and a qa-loop-runbook. The verifier's only
job is confirming cited evidence — it cannot fix anything.

TASK

1. Locate the 4 existing audit files (universal audit template, qa-auditor,
   qa-verifier, qa-loop-runbook) — check .claude/agents/, /agents/, or wherever
   this repo keeps subagent definitions.

2. Create QA.md at repo root using the attached qa-framework-v2.md as the spec.
   This is the single contract every deployment passes through — it references
   the 4 existing files by name rather than duplicating their content.

3. Update the qa-auditor subagent so every claim it logs cites specific
   evidence (a test output line, a diff line, a spec section) — no bare
   assertions. This should already be close to current behavior; make it
   an enforced requirement, not a convention.

4. Update the qa-loop-runbook to reflect Step 4 exactly as specified: on any
   failure in Steps 1–3, Fixer gets up to 3 attempts, each attempt re-runs
   Steps 1–3 in FULL (not just the failed step), every attempt is logged, and
   the 3rd failure auto-opens a GitHub Issue with all 3 attempts' logs attached
   and halts the pipeline for that change.

5. Add a NEW 10th audit category to the universal audit template: "End-to-End
   Completeness." Checklist: no stubbed functions/TODOs/placeholder returns in
   touched paths, no orphaned UI without a wired backend call (or vice versa),
   no dead code introduced, and the feature is exercised start-to-finish by at
   least one test or smoke-test step.

6. Wire this new category as a gate that runs AFTER qa-verifier passes and
   BEFORE Release fires. On failure, route back into the Step 4 Fixer loop —
   do not let it go straight to Release, and do not let it silently bypass
   the 3-attempt cap.

7. Update Security + Product QA subagent definitions to jointly own this new
   gate, matching how they already own audit categories today.

8. Do NOT change how Release itself works, and do NOT touch the post-deploy
   smoke test phase — Step 5 is the pre-deploy counterpart to that, not a
   replacement.

VERIFICATION
After making changes, run the pipeline against a trivial test change (or your
existing smoke-test fixture if one exists) and confirm:
- Steps 1–3 still fire in order and log evidence-linked claims
- A deliberately broken test triggers the Step 4 loop and escalates on the
  3rd failure
- A deliberately incomplete feature (e.g. a stubbed function) is caught by
  the new Step 5 gate and routed back to Step 4, not to Release

Show me a summary of every file changed and the verification run's output
before considering this done.
```

---

**Before you run it:** attach `qa-framework-v2.md` in the same Claude Code session (or paste its contents above the prompt) so it has the actual spec to work from, not just the summary above.
