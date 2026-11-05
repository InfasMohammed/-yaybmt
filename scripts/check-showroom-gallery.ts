import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { aboutImages } from "../data/about";
async function main() {
  const browser = await chromium.launch({
    executablePath: existsSync("/usr/bin/chromium")
      ? "/usr/bin/chromium"
      : undefined,
    args: ["--no-sandbox"],
  });
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8100";
  mkdirSync("artifacts/showroom-gallery", { recursive: true });
  try {
    for (const width of [1440, 768, 390, 320]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: "no-preference",
      });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base + "/about-us/");
      const gallery = page.locator(".showroom-masonry");
      await gallery.scrollIntoViewIfNeeded();
      assert.equal(await gallery.locator("a").count(), 6);
      for (let index = 0; index < 6; index++) {
        const img = gallery.locator("img").nth(index);
        assert.equal(
          await img.getAttribute("src"),
          aboutImages.gallery[index].src,
        );
        assert.equal(
          await gallery.locator("a").nth(index).getAttribute("href"),
          aboutImages.gallery[index].originalSrc,
        );
        await img.evaluate((el) => (el as HTMLImageElement).decode());
      }
      await page.waitForTimeout(900);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      if (width === 1440) {
        const frame = gallery.locator(".showroom-masonry-item").first();
        await frame.evaluate((el) => el.scrollIntoView({ block: "center" }));
        const box = await frame.boundingBox();
        assert.ok(box);
        await page.mouse.move(box.x + box.width * 0.8, box.y + 35);
        await page.waitForTimeout(150);
        assert.notEqual(
          await frame
            .locator(".showroom-masonry-tilt")
            .evaluate((el) => getComputedStyle(el).transform),
          "none",
        );
      }
      await page.emulateMedia({ reducedMotion: "reduce" });
      assert.equal(
        await gallery
          .locator(".showroom-masonry-tilt")
          .first()
          .evaluate((el) => getComputedStyle(el).transform),
        "none",
      );
      if (width === 1440 || width === 390)
        await gallery.screenshot({
          path: `artifacts/showroom-gallery/gallery-${width}.png`,
        });
      assert.deepEqual(errors, []);
      await page.close();
    }
    const page = await browser.newPage({
      javaScriptEnabled: false,
      viewport: { width: 320, height: 1000 },
    });
    await page.goto(base + "/about-us/");
    assert.equal(await page.locator(".showroom-masonry a").count(), 6);
    assert.equal(
      await page
        .locator(".showroom-masonry img")
        .first()
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    await page.locator(".showroom-masonry a").first().click();
    assert.ok(page.url().endsWith(aboutImages.gallery[0].originalSrc));
    console.log(
      "PASS showroom masonry: original local photos/links, responsive columns, desktop pointer tilt, reduced motion, no-JS navigation and no overflow.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
