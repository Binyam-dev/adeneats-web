import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync("public/kitchen/index.html", "utf8");
const script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, "bundled game script exists");
const pureLogic = script.slice(0, script.indexOf("const $="));
const context = vm.createContext({});
vm.runInContext(pureLogic + '\nglobalThis.api = {scorePantry, scoreHeat, grade, pantry, steps}', context);
const api = context.api;

test("bundled pantry scoring ignores duplicate selections and bounds penalties", () => {
  assert.equal(api.scorePantry(["onion", "shiro", "oil", "water", "garlic"]), 50);
  assert.equal(api.scorePantry(["onion", "onion"]), 10);
  assert.equal(api.scorePantry(["cream", "sugar", "pasta"]), 0);
  assert.equal(api.scorePantry([]), 0);
});
test("bundled heat scoring and grades cover the complete playable range", () => {
  for (let heat = 0; heat <= 100; heat += 5) {
    const score = api.scoreHeat(heat);
    assert.ok(score >= 0 && score <= 30);
  }
  assert.equal(api.scoreHeat(40), 30);
  assert.equal(api.grade(120), "Shiro star");
  assert.equal(api.grade(80), "Kitchen explorer");
  assert.equal(api.grade(0), "Curious cook");
  assert.equal(new Set(api.steps.map((s: {id: string}) => s.id)).size, 5);
});
test("route isolates scripts from account access and links back to existing site", () => {
  const route = readFileSync("app/play/page.tsx", "utf8");
  assert.match(route, /sandbox="allow-scripts"/);
  assert.doesNotMatch(route, /allow-same-origin|allow-forms|allow-popups/);
  assert.match(route, /src="\/kitchen\/index.html"/);
  assert.match(route, /href="\/#dishes"/);
  assert.match(route, /index: false/);
  assert.match(readFileSync("app/page.tsx", "utf8"), /<KitchenChallengeInvite \/>/);
  assert.match(readFileSync("components\/KitchenChallengeInvite.tsx", "utf8"), /href="\/play"/);
});
test("game has no remote dependencies, reward requests, storage or analytics", () => {
  assert.doesNotMatch(html, /<script[^>]+src=|fetch\(|XMLHttpRequest|localStorage|sessionStorage|document.cookie|https?:\/\//);
  assert.match(html, /These points cannot be redeemed for food discounts/);
  assert.match(html, /prefers-reduced-motion/);
  assert.match(html, /aria-live="polite"/);
});
