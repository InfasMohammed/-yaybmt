import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { companyFigures } from "../data/about";

async function main() {
  const browser = await chromium.launch({
    executablePath:
      process.env.YAYBMT_BROWSER_EXECUTABLE ||
      (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
  const output =
    process.env.YAYBMT_COMPANY_SCREENSHOTS || "artifacts/team-section";
  mkdirSync(output, { recursive: true });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: "no-preference",
      });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base + "/about-us/");
      const cards = page.locator(".leadership-card");
      await cards
        .first()
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
      for (const selector of [
        ".leadership-card",
        ".leadership-heading",
        ".company-figures > h2",
        ".company-figures dl > div",
      ]) {
        assert.equal(
          await page
            .locator(selector)
            .first()
            .evaluate((el) => getComputedStyle(el).animationName),
          "none",
        );
      }
      assert.equal(await page.locator(".company-motion-toggle").count(), 0);
      const counters = page.locator("[data-count-up]");
      await page.locator(".company-figures").scrollIntoViewIfNeeded();
      await page.waitForFunction(() =>
        [...document.querySelectorAll("[data-count-up]")].some(
          (el) => el.textContent !== (el as HTMLElement).dataset.countUp,
        ),
      );
      await page.waitForFunction(() =>
        [...document.querySelectorAll("[data-count-up]")].every(
          (el) => el.textContent === (el as HTMLElement).dataset.countUp,
        ),
      );
      assert.deepEqual(
        await counters.allTextContents(),
        companyFigures.map((f) => f.value),
      );
      await page.locator(".company-figures").screenshot({
        path: `${output}/figures-${width}.png`,
        animations: "disabled",
      });
      await page.emulateMedia({ reducedMotion: "reduce" });
      assert.equal(
        await cards
          .first()
          .evaluate((el) => getComputedStyle(el).animationName),
        "none",
      );
      assert.deepEqual(
        await counters.allTextContents(),
        companyFigures.map((f) => f.value),
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      assert.deepEqual(errors, []);
      await page.close();
    }
    const page = await browser.newPage({ javaScriptEnabled: false });
    await page.goto(base + "/about-us/");
    assert.deepEqual(
      await page.locator("[data-count-up]").allTextContents(),
      companyFigures.map((f) => f.value),
    );
    assert.equal(await page.locator(".leadership-card").count(), 3);
    await page.close();
    console.log(
      "PASS Company motion: stationary cards/headings, live count-up to source figures, reduced motion, no-JS and desktop/mobile overflow.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
