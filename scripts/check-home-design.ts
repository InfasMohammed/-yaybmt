import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { brands } from "../data/brands";
import { categories } from "../data/categories";
import { categoryImages } from "../data/category-images";
import { welcome } from "../data/welcome";
const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
const output =
  process.env.YAYBMT_HOME_SCREENSHOTS || "artifacts/tailwind-homepage";
async function main() {
  const browser = await chromium.launch({
    executablePath:
      process.env.YAYBMT_BROWSER_EXECUTABLE ||
      (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  try {
    mkdirSync(output, { recursive: true });
    for (const width of [1440, 1024, 768, 390, 320]) {
      const context = await browser.newContext({
        viewport: { width, height: width === 1440 ? 1000 : 844 },
        reducedMotion: "reduce",
      });
      await context.route("**/*", (route) =>
        new URL(route.request().url()).origin === base
          ? route.continue()
          : route.abort(),
      );
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(base + "/");
      await page.waitForLoadState("networkidle");
      await page
        .locator("img[loading=lazy]")
        .evaluateAll((images) =>
          images.forEach((i) => ((i as HTMLImageElement).loading = "eager")),
        );
      await page.evaluate(async () =>
        Promise.all([...document.images].map((i) => i.decode())),
      );
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(
        await page.locator("h1").innerText(),
        "Strong foundations.\nLasting connections.",
      );
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        "Horizontal overflow at " + width,
      );
      const header = await page.locator("header").boundingBox(),
        title = await page.locator("h1").boundingBox();
      assert.ok(
        header && title && header.y + header.height < title.y,
        "Header overlaps hero text at " + width,
      );
      assert.equal(
        await page
          .locator("header")
          .evaluate((e) => getComputedStyle(e).position),
        "absolute",
      );
      const cta = page.getByRole("link", {
        name: "Explore the catalogue",
        exact: true,
      });
      assert.equal(
        await cta.evaluate((e) => getComputedStyle(e).backgroundColor),
        "rgb(169, 99, 64)",
        "Tailwind utilities missing",
      );
      assert.equal(
        await page
          .locator("video")
          .evaluate((e) => (e as HTMLVideoElement).paused),
        true,
        "Reduced-motion video should stay paused",
      );
      assert.equal(await page.locator("video[controls]").count(), 0);
      assert.equal(await page.locator("[data-video-card] video").count(), 1);
      assert.equal(
        await page.locator("[data-industry-grid] article").count(),
        3,
      );
      assert.ok(
        await page.locator("[data-industry-grid] img").evaluateAll((images) =>
          images.every((image) => {
            const img = image as HTMLImageElement;
            const rect = img.getBoundingClientRect();
            return (
              rect.width <= 261 &&
              rect.width <= img.naturalWidth &&
              rect.height <= img.naturalHeight &&
              Math.abs(
                rect.width / rect.height - img.naturalWidth / img.naturalHeight,
              ) < 0.02
            );
          }),
        ),
        "Industry photos must retain their aspect ratios without enlargement",
      );
      for (const b of brands)
        assert.equal(
          await page.locator('main a[href="/brand/' + b.slug + '/"]').count(),
          1,
        );
      for (const c of categories.filter((c) => categoryImages[c.slug]))
        assert.equal(
          await page
            .locator('main a[href="/product-category/' + c.slug + '/"]')
            .count(),
          1,
        );
      for (const p of welcome.paragraphs)
        assert.ok(await page.getByText(p, { exact: true }).isVisible());
      assert.equal(errors.length, 0, errors.join("\n"));
      if (width === 1440 || width === 390) {
        const name = width === 1440 ? "desktop" : "mobile";
        await page.screenshot({
          path: join(output, "home-" + name + ".png"),
          fullPage: true,
        });
      }
      await context.close();
    }
    const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const page = await nojs.newPage();
    await page.goto(base + "/");
    await page
      .getByRole("link", { name: "Explore the catalogue", exact: true })
      .click();
    assert.ok(page.url().endsWith("/shop/"));
    await page.goBack();
    await page.getByRole("link", { name: "Discover our company" }).click();
    assert.ok(page.url().endsWith("/about-us/"));
    await page.goBack();
    await page.getByRole("link", { name: "Make an enquiry" }).click();
    assert.ok(page.url().endsWith("/contact-us/"));
    await page.goBack();
    assert.match(
      (await page
        .getByRole("link", { name: "WhatsApp our team" })
        .getAttribute("href"))!,
      /^https:\/\/wa.me\/971567369803\?text=/,
    );
    console.log(
      "PASS Tailwind homepage: compiled styles, five responsive widths, original copy and URL links, overlay header, local images, reduced motion, no-JS navigation and enquiries.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
