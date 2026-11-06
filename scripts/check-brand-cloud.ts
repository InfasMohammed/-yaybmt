import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { brands } from "../data/brands";
import { brandLogos } from "../data/brand-logos";
async function main() {
  const browser = await chromium.launch({
    executablePath:
      process.env.YAYBMT_BROWSER_EXECUTABLE ||
      (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
  const output =
    process.env.YAYBMT_BRAND_CLOUD_SCREENSHOTS || "artifacts/brand-cloud";
  mkdirSync(output, { recursive: true });
  try {
    for (const width of [1440, 768, 390, 320]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: "no-preference",
      });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base + "/brands/");
      const cloud = page.locator(".logo-cloud");
      assert.equal(await cloud.locator("a").count(), brands.length);
      assert.equal(await cloud.locator("img").count(), 7);
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(
        await page.locator("link[rel=canonical]").getAttribute("href"),
        "https://yaybmt.com/brands/",
      );
      for (const brand of brands) {
        const card = cloud.locator(`a[href="/brand/${brand.slug}/"]`);
        assert.equal(await card.locator("h2").innerText(), brand.name);
        if (brandLogos[brand.slug]) {
          assert.equal(
            await card.locator("img").getAttribute("src"),
            brandLogos[brand.slug].src,
          );
          await card.locator("img").evaluate((image) => {
            (image as HTMLImageElement).loading = "eager";
          });
          await card
            .locator("img")
            .evaluate((image) => (image as HTMLImageElement).decode());
        } else {
          assert.equal(await card.locator("img").count(), 0);
          assert.equal(
            await card.locator(".logo-cloud-wordmark").innerText(),
            brand.name,
          );
        }
      }
      assert.equal(await cloud.locator(".distributor-note").count(), 1);
      assert.equal(
        await cloud
          .locator(".distributor-note")
          .evaluate((el) => el.closest("a")),
        null,
      );
      assert.equal(
        await cloud
          .locator(".distributor-note")
          .evaluate((el) => getComputedStyle(el).backgroundColor),
        "rgba(0, 0, 0, 0)",
      );
      assert.equal(
        await cloud
          .locator(".distributor-note")
          .evaluate((el) => getComputedStyle(el).borderTopWidth),
        "0px",
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      const card = cloud.locator("a").first();
      await card.scrollIntoViewIfNeeded();
      const box = await card.boundingBox();
      assert.ok(box);
      await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.3);
      await page.waitForTimeout(200);
      assert.notEqual(
        await card
          .locator(".logo-cloud-mark")
          .evaluate((el) => getComputedStyle(el).transform),
        "none",
      );
      assert.equal(
        await card.evaluate((el) =>
          (el as HTMLElement).style.getPropertyValue("--glow-opacity"),
        ),
        "1",
      );
      await page.emulateMedia({ reducedMotion: "reduce" });
      assert.equal(
        await card
          .locator(".logo-cloud-mark")
          .evaluate((el) => getComputedStyle(el).transform),
        "none",
      );
      await card.focus();
      await page.keyboard.press("Tab");
      assert.equal(await cloud.locator("a:focus-visible").count(), 1);
      assert.notEqual(
        await cloud
          .locator("a:focus-visible")
          .evaluate((el) => getComputedStyle(el).outlineStyle),
        "none",
      );
      if (width === 1440 || width === 390)
        await cloud.screenshot({ path: `${output}/brands-${width}.png` });
      assert.deepEqual(errors, []);
      await page.close();
    }
    const page = await browser.newPage({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 1000 },
    });
    await page.goto(base + "/brands/");
    assert.equal(await page.locator(".logo-cloud a").count(), 9);
    await page.locator(".logo-cloud a").first().click();
    await page.waitForURL("**/brand/bn-cosmo/");
    console.log(
      "PASS brand LogoCloud: nine original links, seven local logos, two text-only brands, plain non-link KOPAT note, responsive layouts, pointer effects, reduced motion, focus and no-JS navigation.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
