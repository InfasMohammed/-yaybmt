import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
async function main() {
  const browser = await chromium.launch({
    executablePath:
      process.env.YAYBMT_BROWSER_EXECUTABLE ||
      (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
  const output = process.env.YAYBMT_DROP_SCREENSHOTS || "artifacts/home-drop";
  mkdirSync(output, { recursive: true });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: "no-preference",
      });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base + "/");
      const card = page.locator("[data-category-grid] > a").first();
      await page.waitForFunction(
        () =>
          document.querySelector<HTMLElement>("[data-category-grid] > a")?.style
            .opacity === "0",
      );
      assert.equal(
        await card.evaluate((el) => getComputedStyle(el).opacity),
        "0",
        "Card is completely blank before scrolling into view",
      );
      const layout = await card.evaluate((el) => ({
        height: (el as HTMLElement).offsetHeight,
        top: (el as HTMLElement).offsetTop,
      }));
      await card.evaluate((el) => el.scrollIntoView({ block: "center" }));
      await page.waitForFunction(() => {
        const el = document.querySelector<HTMLElement>(
          "[data-category-grid] > a",
        )!;
        const s = getComputedStyle(el);
        return (
          Number(s.opacity) > 0 &&
          Number(s.opacity) < 1 &&
          parseFloat(s.translate.split(" ").at(-1)!) < -20
        );
      });
      assert.ok(
        await card.evaluate((el) =>
          el
            .getAnimations()
            .some((animation) =>
              (animation.effect as KeyframeEffect)
                .getKeyframes()
                .some(
                  (frame) =>
                    String(frame.translate).includes("-140px") &&
                    Number(frame.opacity) === 0,
                ),
            ),
        ),
      );
      await page.screenshot({ path: `${output}/falling-${width}.png` });
      await page.waitForFunction(() => {
        const s = getComputedStyle(
          document.querySelector("[data-category-grid] > a")!,
        );
        return s.opacity === "1" && s.translate === "none";
      });
      assert.deepEqual(
        await card.evaluate((el) => ({
          height: (el as HTMLElement).offsetHeight,
          top: (el as HTMLElement).offsetTop,
        })),
        layout,
      );
      await page.screenshot({ path: `${output}/settled-${width}.png` });
      await page.evaluate(() => scrollTo(0, 0));
      await card.evaluate((el) => el.scrollIntoView({ block: "center" }));
      assert.equal(
        await card.evaluate((el) => el.getAnimations().length),
        0,
        "Settled card does not repeatedly disappear",
      );
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(() =>
        [...document.querySelectorAll<HTMLElement>("[data-home-reveal]")].every(
          (el) => el.style.opacity !== "0",
        ),
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
    const page = await browser.newPage({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 900 },
    });
    await page.goto(base + "/");
    assert.equal(
      await page
        .locator("[data-category-grid] > a")
        .first()
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    assert.equal(
      await page
        .locator(".testimonial-card")
        .first()
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    console.log(
      "PASS homepage full drop: fully hidden before entry, actual 140px downward fall/settle, reserved layout, one reveal, live reduced-motion restoration and no-JS visible content.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
