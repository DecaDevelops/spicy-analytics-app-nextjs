"use server";
import fs from "fs";
import { Award } from "lucide-react";
import { chromium } from "playwright";

export async function ensureAuth() {
  try {
    const storagePath = "./auth.json";
    let storageExists = fs.existsSync(storagePath);

    if (!storageExists) {
      const browser = await chromium.launch({ headless: false });
      const context = storageExists
        ? await browser.newContext({ storageState: "./auth.json" })
        : await browser.newContext();
      const page = await context.newPage();
      await page.goto("https://spicychat.ai");
      await page.waitForURL("https://spicychat.ai/my-creations/chatbots", {
        timeout: 300_000,
      });
      await context.storageState({ path: "./auth.json" });
      await browser.close();
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ storageState: storagePath });
    const page = await context.newPage();
    await page.goto("https://spicychat.ai/my-creations/chatbots");
    let tokenCaptured = false;
    await page.on("request", (req) => {
      if (tokenCaptured) return;
      const url = req.url();
      const headers = req.headers();

      if (url.includes("prod.nd-api.com") && headers["authorization"]) {
        const bearerHeader = headers["authorization"];
        const bearer = bearerHeader.replace(/^Bearer\s+/i, "");
        fs.writeFileSync("./bearer.json", JSON.stringify({ bearer: bearer }));
        tokenCaptured = true;
      }
    });
    return true;
  } catch {
    return false;
  }
}
