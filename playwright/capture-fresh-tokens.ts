import { chromium } from "playwright";
import fs from "fs";
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://spicychat.ai/");

  await page.waitForTimeout(30_000);
  const cookies = await context.cookies();
  const localStorageData = await page.evaluate(() => {
    return JSON.stringify(localStorage);
  });
  let bearerToken: string | null = null;
  page.on("request", (req) => {
    const headers = req.headers();
    if (headers["authorization"]) bearerToken = headers["authorization"];
  });

  fs.writeFileSync(
    "./auth.json",
    JSON.stringify(
      { cookies, localStorage: localStorageData, bearerToken },
      null,
      2
    )
  );
  await browser.close();
})();
