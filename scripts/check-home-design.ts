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
              Math.abs(
                rect.width - img.parentElement!.getBoundingClientRect().width,
              ) < 1 &&
              rect.width <= img.naturalWidth &&
              rect.height <= img.naturalHeight &&
              Math.abs(
                rect.width / rect.height - img.naturalWidth / img.naturalHeight,
              ) < 0.02
            );
          }),
        ),
        "Industry images must fill their frames and retain their aspect ratios without enlargement",
      );
      assert.equal(
        await page
          .locator("footer")
          .evaluate((e) => getComputedStyle(e).backgroundColor),
        "rgb(37, 40, 39)",
      );
      assert.equal(
        await page.locator("footer .logo").getAttribute("src"),
        "/images/logo-footer-original.png",
      );
      assert.equal(
        await page
          .locator("footer .social img")
          .first()
          .evaluate((e) => getComputedStyle(e).filter),
        "invert(1)",
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
      if (width <= 650) {
        const menu = page.locator(".mobile-navigation");
        const toggle = menu.locator(":scope > summary");
        assert.ok(await toggle.isVisible());
        assert.equal(await menu.getAttribute("open"), null);
        await toggle.click();
        assert.ok(
          await menu
            .getByRole("link", { name: "Company", exact: true })
            .isVisible(),
        );
        await menu.locator('[data-mobile-view="brands"]').click();
        assert.ok(
          await menu
            .getByRole("link", { name: "DAELIM", exact: true })
            .isVisible(),
        );
        assert.equal(
          await menu
            .getByRole("link", { name: "Company", exact: true })
            .count(),
          0,
        );
        assert.equal(
          await menu
            .getByRole("button", { name: "Close menu", exact: true })
            .count(),
          0,
        );
        assert.equal(
          await menu
            .getByRole("link", { name: "Contact", exact: true })
            .count(),
          0,
        );
        assert.equal(
          await menu.getByRole("link", { name: "Home", exact: true }).count(),
          0,
        );
        assert.equal(
          await page.locator("body").evaluate((e) => e.style.overflow),
          "hidden",
        );
        await menu.getByRole("button", { name: "‹ Back", exact: true }).click();
        assert.ok(
          await menu
            .getByRole("link", { name: "Company", exact: true })
            .isVisible(),
        );
        await menu.locator('[data-mobile-view="products"]').click();
        assert.ok(
          await menu
            .getByRole("link", { name: "Abrasives", exact: true })
            .isVisible(),
        );
        assert.equal(
          await menu
            .getByRole("link", { name: "Company", exact: true })
            .count(),
          0,
        );
        assert.equal(
          await menu.locator('[data-mobile-view="brands"]').count(),
          0,
        );
        await page.keyboard.press("Escape");
        assert.ok(
          await menu
            .getByRole("link", { name: "Company", exact: true })
            .isVisible(),
        );
        await page.keyboard.press("Escape");
        assert.equal(await menu.getAttribute("open"), null);
        await toggle.click();
        await menu
          .getByRole("button", { name: "Close menu", exact: true })
          .click();
        assert.equal(await menu.getAttribute("open"), null);
        await toggle.click();
        await page.keyboard.press("Escape");
        assert.equal(await menu.getAttribute("open"), null);
      } else {
        assert.ok(await page.locator(".desktop-navigation").isVisible());
        assert.equal(
          await page.locator(".mobile-navigation").isVisible(),
          false,
        );
      }
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
    const compact = await browser.newContext({
      viewport: { width: 360, height: 400 },
      reducedMotion: "reduce",
    });
    const compactPage = await compact.newPage();
    await compactPage.goto(base + "/");
    await compactPage.locator(".mobile-navigation > summary").click();
    await compactPage.locator('[data-mobile-view="products"]').click();
    const list = compactPage.locator(".mobile-menu-items");
    assert.ok(
      await list.evaluate((e) => e.scrollHeight > e.clientHeight),
      "Short-screen category list should scroll vertically",
    );
    assert.ok(
      await list.evaluate((e) => e.scrollWidth <= e.clientWidth),
      "Category list must not overflow horizontally",
    );
    const boxes = await list.locator(":scope > a").evaluateAll((items) =>
      items.map((item) => {
        const r = item.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width };
      }),
    );
    assert.ok(
      boxes.every(
        (box, index) =>
          Math.abs(box.x - boxes[0].x) < 1 &&
          (index === 0 || box.y > boxes[index - 1].y),
      ),
      "All categories must stay in one vertical column",
    );
    await list.locator(":scope > a").last().scrollIntoViewIfNeeded();
    assert.ok(await list.evaluate((e) => e.scrollTop > 0));
    assert.ok(
      await compactPage
        .getByRole("button", { name: "‹ Back", exact: true })
        .isVisible(),
    );
    assert.equal(await compactPage.evaluate(() => window.scrollY), 0);
    await compactPage.screenshot({
      path: join(output, "mobile-products-scroll.png"),
    });
    await compact.close();
    const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const page = await nojs.newPage();
    await page.goto(base + "/");
    await page.locator(".mobile-navigation > summary").click();
    await page
      .locator('.mobile-navigation [data-mobile-view="products"]')
      .click();
    assert.ok(page.url().endsWith("/shop/"));
    await page.goto(base + "/");
    await page
      .getByRole("link", { name: "Explore the catalogue", exact: true })
      .click();
    assert.ok(page.url().endsWith("/shop/"));
    assert.equal(
      await page
        .locator("footer")
        .evaluate((e) => getComputedStyle(e).backgroundColor),
      "rgb(37, 40, 39)",
    );
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
