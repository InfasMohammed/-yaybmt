import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
async function main() {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8103";
  mkdirSync("artifacts/page-drop", { recursive: true });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 800 },
        reducedMotion: "no-preference",
      });
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      for (const route of [
        "/shop/",
        "/brands/",
        "/categories/",
        "/about-us/",
        "/contact-us/",
        "/blog/",
        "/product/dc-102/",
      ]) {
        console.log(width, route);
        await page.goto(base + route);
        await page.waitForSelector("[data-page-drop]", { state: "attached" });
        // Hidden targets keep their geometry, so scroll directly instead of waiting for actionability.
        const pending = page.locator("[data-page-drop]").last();
        if (
          (await pending.count()) &&
          (await pending.getAttribute("data-page-drop")) === "pending"
        ) {
          assert.equal(
            await pending.evaluate((el) => getComputedStyle(el).opacity),
            "0",
          );
          await pending.evaluate((el) =>
            el.scrollIntoView({ block: "center" }),
          );
          await page.waitForFunction(() =>
            [...document.querySelectorAll('[data-page-drop="played"]')].some(
              (el) =>
                el
                  .getAnimations()
                  .some((a) =>
                    (a.effect as KeyframeEffect | null)
                      ?.getKeyframes()
                      .some((k) => String(k.translate).includes("-140px")),
                  ),
            ),
          );
          await page.waitForTimeout(1300);
          assert.equal(
            await pending.evaluate((el) => getComputedStyle(el).opacity),
            "1",
          );
          assert.equal(
            await pending.evaluate((el) => el.getAnimations().length),
            0,
          );
          await page.evaluate(() => scrollTo(0, 0));
          await pending.evaluate((el) =>
            el.scrollIntoView({ block: "center" }),
          );
          assert.equal(
            await pending.evaluate((el) => el.getAnimations().length),
            0,
            "does not replay",
          );
        }
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.waitForFunction(() =>
          [...document.querySelectorAll("[data-page-drop]")].every(
            (el) => getComputedStyle(el).opacity === "1",
          ),
        );
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
        );
        if (route === "/brands/")
          await page.screenshot({
            path: `artifacts/page-drop/brands-${width}.png`,
            fullPage: true,
          });
        await page.emulateMedia({ reducedMotion: "no-preference" });
      }
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
      "PASS one-time downward fall on seven page types at desktop/mobile: hidden entry, 140px keyframes, settles once, reduced-motion restoration, no overflow/errors and no-JS visibility.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
