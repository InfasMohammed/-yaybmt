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
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
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
      const gallery = page.locator(".showroom-expandable-strip");
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
        const photo = gallery.locator("a").first();
        const before = (await photo.boundingBox())!.width;
        await photo.hover();
        await page.waitForTimeout(600);
        assert.ok((await photo.boundingBox())!.width > before * 1.5);
      }
      await gallery.locator("a").first().click();
      const viewer = page.getByRole("dialog", {
        name: "Showroom image viewer",
      });
      await viewer.waitFor({ state: "visible" });
      assert.equal(
        await viewer.locator("img").getAttribute("src"),
        aboutImages.gallery[0].originalSrc,
      );
      await page
        .getByRole("button", { name: "Next image", exact: true })
        .click();
      assert.equal(
        await viewer.locator("img").getAttribute("src"),
        aboutImages.gallery[1].originalSrc,
      );
      await page.keyboard.press("ArrowLeft");
      assert.equal(
        await viewer.locator("img").getAttribute("src"),
        aboutImages.gallery[0].originalSrc,
      );
      await page.keyboard.press("ArrowLeft");
      assert.equal(
        await viewer.locator("img").getAttribute("src"),
        aboutImages.gallery[5].originalSrc,
      );
      await page.keyboard.press("Escape");
      await viewer.waitFor({ state: "hidden" });
      assert.equal(
        await gallery
          .locator("a")
          .first()
          .evaluate((el) => el === document.activeElement),
        true,
      );
      await page.emulateMedia({ reducedMotion: "reduce" });
      assert.equal(
        await gallery
          .locator("a")
          .first()
          .evaluate((el) => getComputedStyle(el).transitionDuration),
        "0s",
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
    assert.equal(await page.locator(".showroom-expandable-strip a").count(), 6);
    assert.equal(
      await page
        .locator(".showroom-expandable-strip img")
        .first()
        .evaluate((el) => getComputedStyle(el).opacity),
      "1",
    );
    await page.locator(".showroom-expandable-strip a").first().click();
    assert.ok(page.url().endsWith(aboutImages.gallery[0].originalSrc));
    console.log(
      "PASS expandable showroom gallery: local photos, desktop expansion, mobile grid, modal next/previous/wraparound/Escape/focus return, reduced motion and no-JS links.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
