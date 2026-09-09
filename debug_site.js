const { chromium } = require('@playwright/test');
(async() => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('https://phptravels.net/');
  console.log('TITLE', await page.title());
  console.log('BUTTONS', await page.locator('button').evaluateAll(els => els.map(el => ({text: el.innerText.trim(), aria: el.getAttribute('aria-label'), name: el.textContent.trim()}))));
  console.log('TABS', await page.locator('[role="tab"]').evaluateAll(els => els.map(el => el.textContent.trim())));
  await browser.close();
})();
