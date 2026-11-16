// Run after `npm run dev`: node tests/e2e/kitchen.mjs
// Playwright is a QA-only dependency, intentionally not added to production.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import assert from 'node:assert/strict';
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${process.env.BASE_URL || 'http://localhost:3000'}/play`);
    const game = page.frameLocator('iframe');
    await game.locator('#next').click();
    await game.getByText('Choose exactly five ingredients before checking your pantry.').waitFor();
    for (const id of ['onion', 'shiro', 'oil', 'water', 'garlic']) await game.locator(`[data-id="${id}"]`).click();
    await game.locator('#next').click();
    assert.equal(await game.locator('#points').textContent(), '50 practice points');
    await game.locator('#next').click();
    for (const id of ['onion', 'oil', 'water', 'shiro', 'simmer']) await game.locator(`[data-step="${id}"]`).click();
    assert.equal(await game.locator('#points').textContent(), '90 practice points');
    await game.locator('#next').click();
    assert.equal(await game.locator('#next').isDisabled(), true);
    for (let i = 0; i < 3; i++) await game.locator('#stir').click();
    await game.locator('#next').click();
    await game.getByRole('heading', { name: 'Shiro star' }).waitFor();
    assert.equal(await game.locator('#points').textContent(), '120 practice points');
    await game.getByText('These points cannot be redeemed', { exact: false }).waitFor();
    await game.locator('#next').click();
    assert.equal(await game.locator('#points').textContent(), '0 practice points');
    await game.locator('#challenge').click();
    assert.equal(await game.locator('#challenge').getAttribute('aria-pressed'), 'true');
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await game.locator('body').evaluate(el => el.scrollWidth <= innerWidth), true);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const steam = game.locator('.steam').first();
    if (await steam.count()) assert.equal(await steam.evaluate(el => getComputedStyle(el).animationName), 'none');
    assert.equal(await page.locator('iframe').getAttribute('sandbox'), 'allow-scripts');
    assert.deepEqual(errors, []);
    await page.screenshot({ path: '/tmp/aden-kitchen-mobile.png', fullPage: true });
    await page.getByRole('link', { name: 'Back to Aden Eats', exact: false }).click();
    await page.waitForURL('**/#dishes');
    console.log('PASS: route, perfect round, replay, challenge, mobile, reduced motion, exit');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
