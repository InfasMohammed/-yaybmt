import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
const executablePath =
  process.env.YAYBMT_BROWSER_EXECUTABLE ||
  (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
const output = process.env.YAYBMT_LIQUID_SCREENSHOTS || "artifacts/liquid-hero";
fs.mkdirSync(output, { recursive: true });
(async () => {
  const browser = await chromium.launch({
    executablePath,
    args: [
      "--no-sandbox",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "no-preference",
    });
    await context.addInitScript(() =>
      Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 8 }),
    );
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base);
    await page.locator("[data-liquid=ready]").waitFor({ timeout: 30000 });
    console.log("PASS WebGL ready");
    assert.equal(
      await page.locator("h1").innerText(),
      "Strong foundations.\nLasting connections.",
    );
    await page.mouse.move(10, 900);
    await page.waitForTimeout(1800);
    const before = await page
      .locator(".hero")
      .screenshot({ path: output + "/desktop-static.png" });
    await page.mouse.move(1180, 330);
    await page.mouse.move(1320, 390, { steps: 12 });
    const after = await page
      .locator(".hero")
      .screenshot({ path: output + "/desktop-liquid.png" });
    assert.notEqual(
      crypto.createHash("sha256").update(before).digest("hex"),
      crypto.createHash("sha256").update(after).digest("hex"),
    );
    console.log("PASS desktop pointer changes image");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator("[data-liquid=static]").waitFor();
    assert.equal(await page.locator(".hero-liquid-canvas").count(), 0);
    await page
      .getByRole("link", { name: "Explore the catalogue", exact: true })
      .click();
    assert.ok(page.url().endsWith("/shop/"));
    assert.deepEqual(errors, []);
    await context.close();
    for (const opts of [
      {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        reducedMotion: "no-preference",
      },
      { viewport: { width: 320, height: 844 }, javaScriptEnabled: false },
    ]) {
      const c = await browser.newContext(opts);
      const p = await c.newPage();
      await p.goto(base);
      await p.locator(".hero-liquid-layer > img").evaluate((i) => i.decode());
      assert.equal(await p.locator(".hero-liquid-canvas").count(), 0);
      assert(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      await p.screenshot({
        path:
          output +
          (opts.javaScriptEnabled === false
            ? "/mobile-nojs.png"
            : "/mobile.png"),
        fullPage: true,
      });
      await p
        .getByRole("link", { name: "Explore the catalogue", exact: true })
        .click();
      assert.ok(p.url().endsWith("/shop/"));
      await c.close();
    }
    console.log(
      "PASS touch/mobile, no-JS, reduced-motion fallback and native CTA",
    );
  } finally {
    await browser.close();
  }
  const noGL = await chromium.launch({
    executablePath,
    args: ["--no-sandbox", "--disable-webgl"],
  });
  try {
    const p = await noGL.newPage({ viewport: { width: 1440, height: 1000 } });
    await p.addInitScript(() =>
      Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 8 }),
    );
    await p.goto(base);
    await p.locator("[data-liquid=unavailable]").waitFor();
    assert(await p.locator(".hero-liquid-layer > img").isVisible());
    await p
      .getByRole("link", { name: "Explore the catalogue", exact: true })
      .click();
    assert.ok(p.url().endsWith("/shop/"));
    console.log("PASS no-WebGL static fallback");
  } finally {
    await noGL.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
