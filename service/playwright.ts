import fs from "fs";
import { chromium } from "playwright";

export async function ensureAuth() {
  let storageExists = fs.existsSync("./auth.json");
  const browser = await chromium.launch({ headless: storageExists });
  const context = storageExists
    ? await browser.newContext({ storageState: "./auth.json" })
    : await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://spicychat.ai");
  if (!storageExists) {
    await page.waitForURL("https://spicychat.ai/my-creations/chatbots", {
      timeout: 300_000,
    });
    await context.storageState({ path: "./auth.json" });
  }

  return { browser, context, page };
}
