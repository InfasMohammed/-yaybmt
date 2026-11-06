import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
async function main() {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8103";
  mkdirSync("artifacts/page-scroll", { recursive: true });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: "no-preference",
      });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      for (const route of [
        "/shop/",
        "/brands/",
        "/categories/",
        "/about-us/",
        "/contact-us/",
        "/blog/",
        "/product/dc-102/",
      ]) {
        await page.goto(base + route);
        await page.waitForFunction(() =>
          document.querySelector("[data-page-scroll]"),
        );
        const target = page.locator("[data-page-scroll]").last();
        const before = await target.evaluate(
          (el) => el.getAnimations()[0]?.currentTime,
        );
        await target.evaluate((el) => el.scrollIntoView({ block: "center" }));
        await page.waitForTimeout(100);
        const after = await target.evaluate(
          (el) => el.getAnimations()[0]?.currentTime,
        );
        assert.ok(
          Number(after) >= Number(before),
          route + " assembles on scroll",
        );
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          true,
          route + " no horizontal overflow",
        );
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.waitForFunction(() =>
          [...document.querySelectorAll("[data-page-scroll]")].every(
            (el) => el.getAnimations().length === 0,
          ),
        );
        await page.emulateMedia({ reducedMotion: "no-preference" });
      }
      await page.goto(base + "/brands/");
      await page.locator(".logo-cloud").scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `artifacts/page-scroll/brands-${width}.png`,
        fullPage: true,
      });
      assert.deepEqual(errors, []);
      await page.close();
    }
    const page = await browser.newPage({ javaScriptEnabled: false });
    await page.goto(base + "/shop/");
    assert.ok((await page.locator(".card").count()) > 0);
    assert.equal(
      await page.locator("h1").evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    console.log(
      "PASS seven page types at desktop/mobile: scroll assembly, reduced-motion cancellation, no overflow/errors, no-JS catalogue.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
