import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";
async function main() {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8103";
  mkdirSync("artifacts/footer", { recursive: true });
  try {
    for (const width of [1440, 900, 390, 320]) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      await page.goto(base + "/contact-us/");
      const footer = page.locator(".site-footer");
      const links = footer.locator(
        '.footer-categories a[href^="/product-category/"]',
      );
      assert.equal(await links.count(), 8);
      for (const link of await links.all()) {
        const response = await page.request.get(
          base + (await link.getAttribute("href")),
        );
        assert.equal(response.status(), 200);
      }
      assert.equal(await footer.locator(".social a").count(), 3);
      assert.equal(
        await footer.locator(".logo").getAttribute("src"),
        "/images/logo-footer-original.png",
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      await footer.scrollIntoViewIfNeeded();
      await footer
        .locator("img")
        .evaluateAll((images) =>
          images.forEach(
            (image) => ((image as HTMLImageElement).loading = "eager"),
          ),
        );
      await footer
        .locator("img")
        .evaluateAll((images) =>
          Promise.all(
            images.map((image) => (image as HTMLImageElement).decode()),
          ),
        );
      if (width === 1440 || width === 390)
        await footer.screenshot({
          path: `artifacts/footer/footer-${width}.png`,
        });
      await page.close();
    }
    const page = await browser.newPage({ javaScriptEnabled: false });
    await page.goto(base + "/shop/");
    assert.equal(
      await page
        .locator('.footer-categories a[href^="/product-category/"]')
        .count(),
      8,
    );
    console.log(
      "PASS footer: eight original category routes return 200; four widths without overflow; original logo/social links; no-JS links.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
