import { chromium } from "playwright";
import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { productDocuments } from "../data/product-documents";
import rules from "../data/drawing-image-redirects.json";
const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
async function main() {
  const browser = await chromium.launch({
    executablePath:
      process.env.YAYBMT_BROWSER_EXECUTABLE ||
      (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    for (const [slug, drawings] of Object.entries(productDocuments)) {
      await page.goto(base + "/product/" + slug + "/");
      assert.equal(
        await page.locator(".product-documents img").count(),
        drawings.length,
      );
      assert.equal(
        await page
          .getByText(
            "Additional source illustration is not available in this review.",
            { exact: true },
          )
          .count(),
        0,
      );
      for (const drawing of drawings) {
        const response = await context.request.get(base + drawing.originalSrc);
        assert.equal(response.status(), 200);
        assert.match(response.headers()["content-type"], /^image\//);
      }
    }
    for (const rule of rules) {
      const r = await context.request.get(base + rule.source, {
        maxRedirects: 0,
      });
      assert.equal(r.status(), 301);
      assert.equal(r.headers().location, rule.destination);
    }
    await page.goto(base + "/product/fc-110cs/");
    assert.equal(await page.locator(".product-documents").count(), 0);
    mkdirSync("artifacts/nextjs", { recursive: true });
    for (const [name, width, height] of [
      ["desktop", 1440, 1000],
      ["mobile", 390, 844],
    ] as const) {
      await page.setViewportSize({ width, height });
      await page.goto(base + "/product/fl-930c/");
      const section = page.locator(".product-documents");
      await section.scrollIntoViewIfNeeded();
      await page
        .locator(".product-documents img")
        .evaluateAll(async (images) => {
          await Promise.all(
            images.map((i) => (i as HTMLImageElement).decode()),
          );
        });
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      assert.ok(
        await page.locator(".product-documents img").evaluateAll((images) =>
          images.every((i) => {
            const el = i as HTMLImageElement;
            return (
              el.naturalWidth > 0 &&
              Math.abs(
                el.getBoundingClientRect().width /
                  el.getBoundingClientRect().height -
                  el.naturalWidth / el.naturalHeight,
              ) < 0.02
            );
          }),
        ),
      );
      await section.screenshot({
        path: `artifacts/nextjs/technical-drawings-${name}.png`,
      });
    }
    const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const simple = await nojs.newPage();
    await simple.goto(base + "/product/s-1100pc/");
    assert.ok(await simple.locator(".product-documents img").isVisible());
    const href = await simple
      .locator(".product-document-preview")
      .getAttribute("href");
    await simple.locator(".product-document-preview").click();
    assert.ok(simple.url().endsWith(href!));
    assert.equal(
      (
        await context.request.get(base + "/not-a-real-product-drawing/")
      ).status(),
      404,
    );
    console.log(
      "PASS drawing browser: 28 product mappings, 31 full-size originals, 39 redirects, unaffected product, desktop/mobile aspect ratios, no-JS links, genuine404",
    );
  } finally {
    await browser.close();
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
