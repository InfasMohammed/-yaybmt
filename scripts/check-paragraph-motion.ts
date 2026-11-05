import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { pages } from "../data/pages";
const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
const output =
  process.env.YAYBMT_PARAGRAPH_SCREENSHOTS || "artifacts/paragraph-motion";
async function main() {
  mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      process.env.YAYBMT_BROWSER_EXECUTABLE ||
      (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  try {
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "no-preference",
      });
      await context.route("**/*", (route) =>
        new URL(route.request().url()).origin === base
          ? route.continue()
          : route.abort(),
      );
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      for (const path of ["/contact-us/", "/about-us/"]) {
        const source = pages.find((item) => item.path === path)!;
        await page.goto(base + path, { waitUntil: "domcontentloaded" });
        const first = page.locator("[data-text-rotate]").first();
        await first.scrollIntoViewIfNeeded();
        await page.waitForFunction(() =>
          document.querySelector(
            '[data-text-motion="animated"] .text-rotate-element[style]',
          ),
        );
        await page.waitForFunction(() =>
          [...document.querySelectorAll(".text-rotate-element")].some(
            (word) => {
              const opacity = Number(getComputedStyle(word).opacity);
              return opacity > 0 && opacity < 0.99;
            },
          ),
        );
        await page.evaluate(() => document.fonts.ready);
        assert.ok(
          (
            await page
              .locator("h1")
              .evaluate((element) => getComputedStyle(element).fontFamily)
          ).includes("Manrope Variable"),
        );
        assert.ok(
          (
            await page
              .locator("main > p")
              .last()
              .evaluate((element) => getComputedStyle(element).fontFamily)
          ).includes("Inter Variable"),
        );
        assert.ok(
          await page.evaluate(() => {
            const fonts = [...document.fonts].filter((face) =>
              /Inter Variable|Manrope Variable/.test(face.family),
            );
            return (
              fonts.length === 2 &&
              fonts.every((face) => face.status === "loaded")
            );
          }),
        );
        assert.deepEqual(
          await page.locator(".text-rotate-accessible").allTextContents(),
          source.paragraphs,
        );
        assert.equal(await page.locator("h1").count(), 1);
        assert.equal(
          await page.locator("link[rel=canonical]").getAttribute("href"),
          "https://yaybmt.com" + path,
        );
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        );
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.waitForFunction(
          () =>
            document.querySelectorAll('[data-text-motion="animated"]')
              .length === 0,
        );
        assert.equal(await page.locator(".text-rotate-element").count(), 0);
        assert.deepEqual(
          await page.locator(".text-rotate-static").allTextContents(),
          source.paragraphs,
        );
        await page
          .locator("img[loading=lazy]")
          .evaluateAll((images) =>
            images.forEach(
              (image) => ((image as HTMLImageElement).loading = "eager"),
            ),
          );
        await page.evaluate(async () =>
          Promise.all([...document.images].map((image) => image.decode())),
        );
        await page.screenshot({
          path: join(
            output,
            path.includes("about")
              ? `company-${width}.png`
              : `contact-${width}.png`,
          ),
          fullPage: true,
        });
        await page.emulateMedia({ reducedMotion: "no-preference" });
      }
      assert.deepEqual(errors, []);
      await context.close();
    }
    const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const page = await nojs.newPage();
    for (const path of ["/contact-us/", "/about-us/"]) {
      await page.goto(base + path);
      assert.equal(await page.locator(".text-rotate-element").count(), 0);
      assert.deepEqual(
        await page.locator(".text-rotate-static").allTextContents(),
        pages.find((item) => item.path === path)!.paragraphs,
      );
      assert.ok(await page.locator(".text-rotate-static").first().isVisible());
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
    }
    await nojs.close();
    console.log(
      "PASS paragraph motion: actual word animation at 1440/390/320px; exact source copy; unchanged headings/canonicals; live reduced-motion cancellation; no-JS visible text; no page errors or horizontal overflow.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
