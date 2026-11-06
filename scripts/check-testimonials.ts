import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { visibleTestimonials } from "../data/testimonials";
async function main() {
  const browser = await chromium.launch({
    executablePath:
      process.env.YAYBMT_BROWSER_EXECUTABLE ||
      (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
  const output =
    process.env.YAYBMT_TESTIMONIAL_SCREENSHOTS || "artifacts/testimonials";
  mkdirSync(output, { recursive: true });
  try {
    for (const width of [1440, 768, 390, 320]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base + "/");
      const section = page.locator(".testimonials-section");
      assert.equal(
        await section.locator("h2").innerText(),
        "Real Results, Real Voices",
      );
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(await section.locator("figure").count(), 3);
      assert.deepEqual(
        await section.locator("figcaption strong").allTextContents(),
        visibleTestimonials(false).map((item) => item.name),
      );
      assert.deepEqual(
        await section.locator("blockquote p").allTextContents(),
        visibleTestimonials(false)
          .filter((item) => item.quote)
          .map((item) => item.quote),
      );
      assert.equal(
        await section.locator(".testimonial-rating-only").count(),
        1,
      );
      assert.equal(await section.locator(".testimonial-pattern").count(), 3);
      assert.equal(
        await section
          .locator(".testimonials-grid")
          .evaluate(
            (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
          ),
        width >= 1024 ? 3 : width >= 640 ? 2 : 1,
      );
      assert.equal(
        await section
          .locator("figure")
          .first()
          .evaluate((el) => getComputedStyle(el).filter),
        "none",
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      if (width === 1440 || width === 390)
        await section.screenshot({
          path: `${output}/testimonials-${width}.png`,
        });
      assert.deepEqual(errors, []);
      await page.close();
    }
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "no-preference",
    });
    await page.goto(base + "/");
    await page
      .locator(".testimonials-section")
      .evaluate((el) => el.scrollIntoView({ block: "center" }));
    await page.waitForFunction(() =>
      [...document.querySelectorAll(".testimonial-card")].some((el) => {
        const style = getComputedStyle(el);
        return (
          parseFloat(style.opacity) > 0 && parseFloat(style.opacity) < 0.99
        );
      }),
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(() =>
      [...document.querySelectorAll(".testimonial-card")].every(
        (el) =>
          getComputedStyle(el).opacity === "1" &&
          getComputedStyle(el).filter === "none",
      ),
    );
    await page.close();
    const staticPage = await browser.newPage({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 1000 },
    });
    await staticPage.goto(base + "/");
    assert.equal(await staticPage.locator(".testimonial-card").count(), 3);
    assert.equal(
      await staticPage
        .locator(".testimonial-card")
        .first()
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    await staticPage.close();
    console.log(
      "PASS supplied testimonial design: compact 3/2/1-column layout, original heading, exact review copy, grid pattern, subtle staggered fade reveal, live reduced motion and no-JS visibility.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
