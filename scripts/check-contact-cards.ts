import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { contactPage } from "../data/contact-page";

async function main() {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8103";
  mkdirSync("artifacts/contact-cards", { recursive: true });
  try {
    for (const width of [1440, 900, 390, 320]) {
      const page = await browser.newPage({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base + "/contact-us/");
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(
        await page
          .locator("h1")
          .evaluate((el) => getComputedStyle(el).textAlign),
        "center",
      );
      assert.equal(await page.locator(".contact-intro-card").count(), 1);
      assert.equal(await page.locator(".contact-detail-card").count(), 4);
      assert.equal(await page.locator(".contact-panel").count(), 2);
      assert.equal(
        await page.locator(".contact-map iframe").getAttribute("src"),
        contactPage.mapEmbed,
      );
      const map = await page.locator(".contact-map").boundingBox();
      const form = await page.locator(".contact-enquiry").boundingBox();
      assert.ok(map && form);
      if (width > 800) {
        assert.ok(
          Math.abs(map.y - form.y) < 2,
          "Map and form share a desktop row",
        );
        assert.ok(
          Math.abs(map.height - form.height) < 2,
          "Map and form cards have equal heights",
        );
      } else assert.ok(form.y > map.y + map.height, "Mobile cards stack");
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      assert.equal(
        await page.locator('a[href^="mailto:"],input[type="email"]').count(),
        0,
      );
      await page.evaluate(() => {
        window.open = ((url?: string | URL) => {
          (window as Window & { draftURL?: string }).draftURL = String(url);
          return null;
        }) as typeof window.open;
      });
      await page
        .getByRole("button", { name: "Continue on WhatsApp", exact: true })
        .click();
      assert.equal(
        await page.evaluate(
          () => (window as Window & { draftURL?: string }).draftURL,
        ),
        undefined,
      );
      await page.getByLabel("Full name").fill("Client Review");
      await page
        .getByLabel("Phone number", { exact: true })
        .fill("+971 50 000 0000");
      await page
        .getByLabel("Message", { exact: false })
        .fill("Need marine fittings & drawings\nQuantity: 12");
      await page
        .getByRole("button", { name: "Continue on WhatsApp", exact: true })
        .click();
      const draft = new URL(
        (await page.locator(".enquiry-draft a").getAttribute("href"))!,
      );
      assert.equal(draft.origin, "https://wa.me");
      assert.equal(draft.pathname, "/971567369803");
      assert.ok(
        draft.searchParams.get("text")?.includes("Name: Client Review"),
      );
      assert.ok(
        draft.searchParams
          .get("text")
          ?.includes(
            "Requirements:\nNeed marine fittings & drawings\nQuantity: 12",
          ),
      );
      assert.ok(!draft.searchParams.get("text")?.includes("Email:"));
      await page.getByLabel("Message", { exact: false }).fill("");
      await page.getByLabel("Full name").fill("");
      await page.getByLabel("Phone number", { exact: true }).fill("");
      await page
        .locator(".contact-map")
        .evaluate((el) => el.scrollIntoView({ block: "center" }));
      await page.waitForTimeout(1000);
      await page.evaluate(() => {
        (document.activeElement as HTMLElement)?.blur();
        scrollTo(0, 0);
      });
      if (width === 1440 || width === 390)
        await page.screenshot({
          path: `artifacts/contact-cards/contact-${width}.png`,
          fullPage: true,
        });
      assert.deepEqual(errors, []);
      await page.close();
    }
    const plain = await browser.newPage({ javaScriptEnabled: false });
    await plain.goto(base + "/contact-us/");
    assert.equal(
      await plain.locator(".contact-enquiry-form").isVisible(),
      false,
    );
    assert.ok(
      await plain
        .locator(".contact-enquiry")
        .getByRole("link", { name: "Enquire on WhatsApp", exact: true })
        .isVisible(),
    );
    assert.equal(await plain.locator(".contact-intro-card").isVisible(), true);
    console.log(
      "PASS contact cards: four widths, equal desktop map/form row, mobile stack, no overflow/errors, source map/contacts, validated WhatsApp-only unsent draft and no-JS fallback.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
