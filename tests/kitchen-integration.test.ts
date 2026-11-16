import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
const html = readFileSync("public/kitchen/index.html", "utf8");
const script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script);
const context = vm.createContext({});
vm.runInContext(script.slice(0, script.indexOf("const $=")) + '\nglobalThis.api={recipes,newRound,currentRecipe,failRound,advance}', context);
const api = context.api;
test("three dishes have distinct difficulty, ingredients and cooking sequences", () => {
  assert.equal(api.recipes.length, 3);
  for (const r of api.recipes) {
    assert.equal(new Set(r.required).size, r.required.length);
    assert.equal(new Set(r.steps.map((s: string[]) => s[0])).size, r.steps.length);
    assert.ok(r.range[0] <= 40 && r.range[1] >= 40);
    assert.ok(r.portions >= 2);
  }
  const beginner = api.recipes.find((r: {id: string}) => r.id === 'misir');
  const advanced = api.recipes.find((r: {id: string}) => r.id === 'doro');
  assert.equal(beginner.level, 'Beginner');
  assert.equal(advanced.level, 'Advanced');
  assert.ok(advanced.steps.length > beginner.steps.length);
  assert.ok(advanced.stirs > beginner.stirs);
  assert.ok(advanced.range[1]-advanced.range[0] < beginner.range[1]-beginner.range[0]);
});
test("second error resets the same dish and all progress from every stage", () => {
  for (const recipe of api.recipes) for (let stage=0;stage<4;stage++) {
    const state = {...api.newRound(recipe.id), stage, selected:['onion'], step:3, stirs:2, heat:100, injera:true, portions:1, score:90};
    const first = api.failRound(state);
    assert.equal(first.state.lives,1); assert.equal(first.restarted,false);
    assert.equal(first.state.score,90);
    const second = api.failRound(first.state);
    assert.equal(second.restarted,true);
    assert.equal(second.state.id,recipe.id);
    assert.equal(second.state.stage,0); assert.equal(second.state.score,0);
    assert.equal(second.state.lives,2); assert.equal(second.state.selected.length,0);
    assert.equal(second.state.step,0); assert.equal(second.state.stirs,0);
    assert.equal(second.state.injera,false); assert.equal(second.state.portions,0);
  }
});
test("each phase requires completion; rewards occur only on completed transitions", () => {
  for (const r of api.recipes) {
    let s=api.newRound(r.id);
    assert.equal(api.advance(s),s);
    s.selected=[...r.required]; s=api.advance(s); assert.equal(s.stage,1);
    assert.equal(api.advance(s),s); s.step=r.steps.length; s=api.advance(s); assert.equal(s.stage,2);
    s.stirs=r.stirs; s.heat=100; assert.equal(api.advance(s),s);
    s.heat=40; s=api.advance(s); assert.equal(s.stage,3); assert.equal(s.score,20);
    assert.equal(api.advance(s),s); s.injera=true; assert.equal(api.advance(s),s);
    s.portions=r.portions; s=api.advance(s); assert.equal(s.stage,4); assert.equal(s.score,50);
    assert.equal(api.advance(s),s);
  }
});
test("same-site route is sandboxed, no remote data/storage/redeemable rewards", () => {
  const route=readFileSync('app/play/page.tsx','utf8');
  assert.match(route,/sandbox="allow-scripts"/);
  assert.doesNotMatch(route,/allow-same-origin|allow-forms|allow-popups/);
  assert.match(route,/src="\/kitchen\/index.html"/);
  assert.match(readFileSync('components/KitchenChallengeInvite.tsx','utf8'),/href="\/play"/);
  assert.doesNotMatch(html,/<script[^>]+src=|fetch\(|XMLHttpRequest|localStorage|sessionStorage|document.cookie|https?:\/\//);
  assert.match(html,/These points cannot be redeemed for food discounts/);
  assert.match(html,/prefers-reduced-motion/); assert.match(html,/aria-live="polite"/);
  assert.match(html,/className='fly'/); assert.match(html,/motion.finished/);
  assert.match(html,/Game heat and speed do not establish food safety/);
});
