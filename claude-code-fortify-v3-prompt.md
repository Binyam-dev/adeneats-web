# Claude Code Prompt — Deploy the Fortified Pipeline v3

Paste this at the root of the software-factory repo, with `fortified-pipeline-v3.md` attached in the same session.

---

```
You are upgrading this repo's QA system from the 5-step QA.md to the Fortified
Pipeline v3 described in the attached fortified-pipeline-v3.md. This extends
the existing 8-subagent pipeline (Architect, Builder, Tester, Fixer, Reviewer,
Security, Product QA, Release) and the existing qa-auditor / qa-verifier /
qa-loop-runbook files — do not rebuild from scratch.

TASK

1. Create CONSTITUTION.md at repo root. Draft 5-10 non-negotiable principles
   based on patterns already visible in this codebase (existing conventions,
   security patterns, dependency choices). Show me the draft before finalizing
   — these should reflect real constraints, not generic best practices.

2. Update every subagent definition (wherever they live — .claude/agents/ or
   similar) so its system prompt opens with an instruction to read
   CONSTITUTION.md before acting.

3. Add a risk-scoring step to the Architect subagent: before handoff to
   Builder, score the change 1-9 on technical debt impact, integration
   complexity, regression potential, and security exposure. Score ≥9 blocks
   the pipeline until mitigated; ≥6 requires a logged CONCERNS entry with
   owner and reason before Builder proceeds. For high-risk changes, generate
   a test-design pass (test scenarios per acceptance criterion) before
   implementation starts.

4. Restructure subagent invocation so each of the 8 stages runs in a fresh
   context: reads CONSTITUTION.md, its specific plan/task, and the prior
   stage's written output only — not the accumulated session. If the current
   invocation pattern already does this, confirm and note it; if it doesn't,
   fix it, since this is the structural core of the upgrade.

5. Introduce REQ-ID convention: Architect's spec output assigns stable IDs
   (REQ-001, REQ-002...) to each requirement. Update Builder, Tester, and
   Reviewer conventions so commits, test names, and review comments reference
   the REQ-ID they satisfy.

6. Update qa-verifier to check three coverage axes using the REQ-IDs:
   requirement coverage, decision coverage (were CONTEXT/design decisions
   implemented as decided, not reinterpreted), and phase-goal alignment.
   Confirm qa-verifier's invocation is genuinely isolated — it should never
   receive the same context window that wrote the code, not just a different
   persona prompt in the same session. Fix this if it currently isn't true.

7. Change the Fixer loop's exit condition from "tests pass" to a convergence
   check: a read-only pass confirming code, spec, and tasks still agree with
   each other. Keep the existing 3-cycle cap and GitHub Issues escalation on
   the 3rd failure — only the exit condition changes, not the cap.

8. Introduce graded gate states everywhere a side currently reports pass/fail:
   PASS, CONCERNS (proceed with logged owner + reason), FAIL (blocked, routes
   to the Fixer loop), WAIVED (a prior FAIL/CONCERNS explicitly overridden,
   reason recorded permanently). Apply this to the risk-front gate and the
   evidence-verification gate at minimum.

9. Add a final conversational UAT pass after the existing completeness +
   security gate and before Release: walk through the feature's acceptance
   criteria one at a time against the running build, log pass/fail per
   criterion.

10. Do NOT change Release itself or the post-deploy smoke test phase.

VERIFICATION
Run the pipeline against a trivial test change and confirm:
- CONSTITUTION.md is actually read at each stage (spot-check by checking
  a stage's logged context)
- A deliberately high-risk fake change gets blocked by the Side 2 gate
- A deliberately broken test triggers the Fixer loop, and the loop's exit
  check is convergence-based, not just green tests
- The completeness/security/UAT gate catches a deliberately incomplete
  feature and routes it back to the Fixer loop, not to Release

Show me a summary of every file changed and the verification run's output
before considering this done.
```
