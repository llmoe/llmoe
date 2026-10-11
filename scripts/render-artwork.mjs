import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

// Install Playwright locally, or point PLAYWRIGHT_MODULE at an existing installation.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const frames = resolve(root, 'tmp/terminal-frames');
await mkdir(frames, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 600 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(resolve(root, 'scripts/banner.html')).href);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.hero').screenshot({ path: resolve(root, 'assets/hero-pink.png') });
  await page.locator('.hero').evaluate(element => element.classList.add('mobile'));
  await page.locator('.hero').screenshot({ path: resolve(root, 'assets/hero-pink-mobile.png') });
  await page.locator('.hero').evaluate(element => element.classList.remove('mobile'));
  await page.locator('.terminal').screenshot({ path: resolve(root, 'assets/terminal-pink.png') });
  for (let frame = 0; frame < 135; frame++) {
    await page.evaluate(frame => window.setFrame(frame), frame);
    await page.locator('.terminal').screenshot({ path: resolve(frames, `${String(frame).padStart(3, '0')}.png`) });
  }
} finally {
  await browser.close();
}
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '15', '-i', resolve(frames, '%03d.png'), '-filter_complex', '[0:v]split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle', '-loop', '0', resolve(root, 'assets/terminal-pink.gif')], { stdio: 'inherit' });
console.log('Rendered pink desktop/mobile banners and terminal animation.');
