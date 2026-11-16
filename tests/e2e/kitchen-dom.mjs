// Full DOM interaction tests, not a replacement for real-browser visual QA.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const { JSDOM } = await import(process.env.JSDOM_MODULE || 'jsdom');
const html=readFileSync('public/kitchen/index.html','utf8');
const dom=new JSDOM(html,{runScripts:'outside-only'});
const {document}=dom.window;
dom.window.eval(html.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1]);
const el=id=>document.getElementById(id), click=id=>el(id).click();
const choose=id=>document.querySelector(`[data-recipe="${id}"]`).click();
const ingredient=id=>document.querySelector(`[data-id="${id}"]`).click();
const step=id=>document.querySelector(`[data-step="${id}"]`).click();
const cases=[
 ['misir',['onion','oil','garlic','berbere','lentils','water'],['onion','oil','berbere','lentils','water'],3,2,160],
 ['shiro',['onion','shiro','oil','water','garlic'],['onion','oil','water','shiro','simmer'],3,2,150],
 ['doro',['onion','butter','garlic','ginger','berbere','chicken','water','egg','spice'],['onion','butter','berbere','chicken','water','check','spice','egg'],5,3,220]
];
function fill(ids){ids.forEach(ingredient);click('next');}
function sequence(ids){ids.forEach(step);click('next');}
function simmer(n){el('heat').value='40';el('heat').dispatchEvent(new dom.window.Event('input'));for(let i=0;i<n;i++)click('stir');click('next');}
function resetCheck(){assert.match(el('chapter').textContent,/Fill your pot/);assert.equal(el('points').textContent,'0 practice points');assert.match(el('chances').textContent,/2 chances/);assert.match(el('feedback').textContent,/Two mistakes/);assert.equal(el('next').disabled,true);assert.equal(document.querySelectorAll('[data-id]:disabled').length,0);}
for(const [id,ids,steps,stirs,portions,points] of cases){
 choose(id);assert.equal(el('next').disabled,true);
 ingredient('onion');ingredient('onion');assert.equal(el('points').textContent,'10 practice points');
 ingredient('sugar');assert.match(el('chances').textContent,/1 chance left/);ingredient('sugar');resetCheck();
 fill(ids);step(steps.at(-1));step(steps.at(-1));resetCheck();
 fill(ids);sequence(steps);for(let i=0;i<stirs;i++)click('stir');click('next');assert.match(el('chances').textContent,/1 chance left/);click('next');resetCheck();
 fill(ids);sequence(steps);simmer(stirs);click('ladle');click('ladle');resetCheck();
 fill(ids);sequence(steps);simmer(stirs);assert.equal(el('next').disabled,true);click('lay-injera');click('lay-injera');
 for(let i=0;i<portions;i++)click('ladle');click('ladle');assert.equal(el('next').disabled,false);click('next');
 assert.match(el('chapter').textContent,/Served/);assert.equal(el('points').textContent,`${points} practice points`);
 assert.match(el('content').textContent,/cannot be redeemed/);assert.ok(el('serving-plate'));click('next');assert.equal(el('points').textContent,'0 practice points');
}
// One mistake follows the player across phases, not two free lives per phase.
choose('misir');ingredient('sugar');fill(cases[0][1]);step('water');resetCheck();
// Recipe/mode switch resets every part of a partially completed dish.
fill(cases[0][1]);choose('doro');assert.match(el('chapter').textContent,/Fill your pot/);assert.equal(el('points').textContent,'0 practice points');
click('practice');assert.equal(el('practice').getAttribute('aria-pressed'),'true');click('challenge');assert.equal(el('challenge').getAttribute('aria-pressed'),'true');
// Exercise the flight path with controlled layout and animation APIs.
choose('misir');
dom.window.matchMedia=()=>({matches:false});
dom.window.Element.prototype.getBoundingClientRect=()=>({left:10,top:10,width:100,height:100});
dom.window.Element.prototype.animate=function(){return {finished:new Promise(()=>{}),cancel(){}};};
ingredient('onion');assert.equal(document.querySelectorAll('.fly').length,1);
click('restart');assert.equal(document.querySelectorAll('.fly').length,0);
dom.window.matchMedia=()=>({matches:true});ingredient('onion');assert.equal(document.querySelectorAll('.fly').length,0);
console.log('PASS: all 3 dishes pantry → cook → simmer → plate → served; second mistakes in all 4 phases; duplicate taps; carryover lives; replay/recipe/mode reset.');
dom.window.close();
