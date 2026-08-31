# Claude Code Prompt — Install & Wire the Fortification System

Paste this into Claude Code at the root of the software-factory repo, with `fortification-system-v3.md` and `qa-framework-v2.md` attached in the same session.

---

```
You are installing two open-source tool catalogs into this repo and wiring them
into the existing pipeline per the attached fortification-system-v3.md spec.
Do not skip the mapping step — the goal is real tooling behind existing roles,
not a 9th bolted-on stage.

CONTEXT
This repo has an 8-subagent pipeline (Architect → Builder → Tester → Fixer →
Reviewer → Security → Product QA → Release), a QA.md with a 5-step gate
(alignment, unit tests, reasoning trace, bounded 3-attempt fixer loop, e2e
completeness), and a 4-file audit system (universal audit template, qa-auditor,
qa-verifier [read-only], qa-loop-runbook). Full detail is in the attached specs.

PART 1 — INSTALL ECC
1. Run: npm i -g ecc-universal
2. Use the ECC installer to add ONLY this curated subset (do not install the
   full catalog — keep subagent context lean):
   Skills: blueprint, tdd-workflow, verification-loop, continuous-agent-loop,
   eval-harness, security-review, security-scan, deployment-patterns
   Agents: code-reviewer, security-reviewer, tdd-guide, e2e-runner,
   build-error-resolver, loop-operator
   Commands: verify, quality-gate, code-review, e2e, eval, build-fix,
   harness-audit, test-coverage
   Also add ONE stack-pattern skill matching this repo's actual language/
   framework (check package.json / go.mod / requirements.txt first — don't
   guess) — e.g. frontend-patterns, backend-patterns, postgres-patterns,
   golang-patterns, django-patterns, whichever applies.
3. Confirm install with: ecc-universal list --installed (or equivalent) and
   show me the result.

PART 2 — INSTALL STRIX
1. Install Strix per its docs (pipx install strix-agent, or the Claude Code
   skill installer if this repo already has SKILL.md-compatible agents set up).
2. Install these Strix skills specifically: ci-security-scanning-with-strix,
   fix-security-vulnerabilities-with-strix, penetration-testing-with-strix,
   owasp-top-10-testing.
3. Strix needs an LLM API key and, for the local CLI, Docker. Use the existing
   Anthropic key already configured for this repo's Claude Code setup — do not
   provision a new key or subscribe to the hosted app.strix.ai platform unless
   you hit a hard blocker running locally, in which case stop and tell me
   rather than signing up for anything.

PART 3 — WIRE INTO THE PIPELINE (per fortification-system-v3.md's table)
1. Update each existing subagent definition to call its mapped ECC addition —
   e.g. the Tester subagent should now invoke agents/tdd-guide and
   agents/e2e-runner rather than running ad hoc test commands; the Fixer
   subagent should invoke build-error-resolver and loop-operator.
2. Create FORTIFICATION.md at repo root using the attached spec verbatim as
   the source (reference qa-framework-v2.md's 4 files by name, don't
   duplicate their content).
3. Add Step 6 (Adversarial Fortification Gate) to the pipeline: after Step 5
   passes, run ci-security-scanning-with-strix on every PR (diff-scoped).
   On a finding, run fix-security-vulnerabilities-with-strix, then re-verify.
   On unresolved findings, route into the EXISTING Step 4 Fixer loop (same
   3-attempt cap) — do not create a second, parallel retry loop.
4. Tag any GitHub Issue opened from a Step 6 failure with priority:security
   so it's distinguishable from a routine test failure in the same queue.
5. Add owasp-top-10-testing as a separate, heavier check that runs only on
   release-candidate builds, not every PR — confirm with me which branch/tag
   pattern in this repo signifies "release candidate" before wiring the
   trigger, rather than assuming.
6. Add an 11th category to the universal audit template: "Adversarial
   Validation (Strix)" — pass/fail plus the proof-of-concept link for any
   finding.

VERIFICATION
1. Run the pipeline against a trivial change and confirm Steps 1–3 still fire
   with the new ECC agents doing the work (show me which agent handled each
   step in the output).
2. Deliberately introduce a known-vulnerable pattern (e.g. an unparameterized
   SQL query in a throwaway test file) and confirm: Strix's diff scan catches
   it, fix-security-vulnerabilities-with-strix remediates it, and if it
   somehow doesn't resolve in 3 attempts, a priority:security GitHub Issue
   opens with the full attempt history attached.
3. Confirm a normal, clean PR does NOT trigger the heavier owasp-top-10-testing
   pass — only the diff-scoped scan should run.

Show me every file changed, the ECC/Strix install confirmation output, and
both verification runs' results before considering this done.
```
