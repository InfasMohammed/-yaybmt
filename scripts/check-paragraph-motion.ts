import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium } from "playwright";
import { pages } from "../data/pages";
import { contactPage } from "../data/contact-page";
async function main() {
  const browser = await chromium.launch({
    executablePath:
      process.env.YAYBMT_BROWSER_EXECUTABLE ||
      (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
    args: ["--no-sandbox"],
  });
  const base = process.env.YAYBMT_TEST_URL || "http://127.0.0.1:8080";
  try {
    for (const width of [1440, 390, 320]) {
      for (const reducedMotion of ["no-preference", "reduce"] as const) {
        const page = await browser.newPage({
          viewport: { width, height: 1000 },
          reducedMotion,
        });
        for (const path of ["/about-us/", "/contact-us/"]) {
          await page.goto(base + path);
          const card = page.locator(
            path.includes("about")
              ? ".about-intro-card"
              : ".contact-intro-card",
          );
          await card.evaluate((el) => el.scrollIntoView({ block: "center" }));
          await page.waitForFunction(() => {
            const e = document.querySelector(
              ".about-intro-card,.contact-intro-card",
            );
            return (
              !!e &&
              getComputedStyle(e).opacity === "1" &&
              e.getAnimations().length === 0
            );
          });
          const text = await card.innerText();
          for (const para of pages.find((p) => p.path === path)!.paragraphs) {
            assert.ok(text.includes(para), path + " preserves original copy");
          }
          assert.equal(
            await page.locator(".text-rotate-element").count(),
            0,
            "No word-by-word animation",
          );
          assert.ok(
            (
              await card
                .locator(
                  path === "/contact-us/" ? ".contact-intro-copy p" : "p",
                )
                .first()
                .evaluate((el) => getComputedStyle(el).fontFamily)
            ).includes("Inter Variable"),
          );
          assert.equal(await page.locator("h1").count(), 1);
          assert.equal(
            await page.evaluate(
              () => document.documentElement.scrollWidth > innerWidth,
            ),
            false,
          );
        }
        await page.close();
      }
    }
    const page = await browser.newPage({ javaScriptEnabled: false });
    await page.goto(base + "/contact-us/");
    assert.ok(
      (await page.locator(".contact-intro-card").innerText()).includes(
        contactPage.introHeading,
      ),
    );
    console.log(
      "PASS paragraph presentation: original text/fonts, stationary words, smooth card reveal, reduced-motion/no-JS content, three widths without overflow.",
    );
  } finally {
    await browser.close();
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
