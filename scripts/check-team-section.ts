import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { team } from "../data/about";

const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
const output = process.env.YAYBMT_TEAM_SCREENSHOTS || "artifacts/team-section";
async function main() {
  mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      process.env.YAYBMT_BROWSER_EXECUTABLE ||
      (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  try {
    for (const width of [1440, 768, 390, 320]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base + "/about-us/");
      const section = page.locator(".leadership-section");
      await section.scrollIntoViewIfNeeded();
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(
        await section.locator("#team-heading").innerText(),
        "Our leadership",
      );
      assert.equal(
        await section.locator(".leadership-card").count(),
        team.length,
      );
      assert.equal(
        await section.locator("a").count(),
        0,
        "No fabricated profile or register links",
      );
      for (const person of team) {
        const card = section
          .locator(".leadership-card")
          .filter({
            has: page.getByRole("heading", { name: person.name, exact: true }),
          });
        assert.equal(await card.locator("p").innerText(), person.role);
        const image = card.locator("img");
        assert.equal(await image.getAttribute("src"), person.image.src);
        await image.evaluate((img) => (img as HTMLImageElement).decode());
        const box = await image.boundingBox();
        assert.ok(
          box &&
            box.width <= person.image.width &&
            box.height <= person.image.height,
        );
        assert.ok(
          Math.abs(
            box.width / box.height - person.image.width / person.image.height,
          ) < 0.01,
        );
      }
      const boxes = await section
        .locator(".leadership-card")
        .evaluateAll((cards) =>
          cards.map((card) => {
            const box = card.getBoundingClientRect();
            return { x: box.x, y: box.y, width: box.width };
          }),
        );
      if (width > 760)
        assert.ok(
          boxes.every((box) => Math.abs(box.y - boxes[0].y) < 1),
          "Desktop cards should share one row",
        );
      else
        assert.ok(
          boxes.every((box, i) => i === 0 || box.y > boxes[i - 1].y),
          "Mobile cards should form one column",
        );
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        "No horizontal overflow",
      );
      await section.locator(".leadership-card").first().hover();
      assert.equal(
        await section
          .locator(".leadership-card")
          .first()
          .evaluate((card) => getComputedStyle(card).transform),
        "none",
        "Reduced motion disables lift",
      );
      if (width === 1440 || width === 390)
        await section.screenshot({
          path: join(
            output,
            width === 1440 ? "team-desktop.png" : "team-mobile.png",
          ),
        });
      assert.deepEqual(errors, []);
      await context.close();
    }
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto(base + "/about-us/");
    const section = page.locator(".leadership-section");
    await section.scrollIntoViewIfNeeded();
    for (const person of team)
      assert.ok(
        await section
          .getByRole("heading", { name: person.name, exact: true })
          .isVisible(),
      );
    await context.close();
    console.log(
      "PASS team section: genuine names/roles/local photos, one page H1, natural image sizing, desktop/mobile cards, reduced-motion hover, no-JS content and no horizontal overflow.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
