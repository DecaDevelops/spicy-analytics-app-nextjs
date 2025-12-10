import { chromium } from "playwright";
import fs from "fs";
export async function ensureAuth() {
  try {
    const storagePath = "./auth.json";
    console.log("checking if auth file exists...");
    const storageExists = fs.existsSync(storagePath);
    if (!storageExists) {
      console.warn("AUTH WAS NOT FOUND! opening browser... PLEASE LOGIN!");
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
    let bearer: string | null = null;
    let guestUserId: string | null = null;
    await page.goto("https://spicychat.ai/");
    let tokenCaptured = false;
    await page.on("request", (req) => {
      if (tokenCaptured) return;
      const url = req.url();
      const headers = req.headers();
      if (url.includes("prod.nd-api.com") && headers["x-guest-userid"]) {
        guestUserId = headers["x-guest-userid"];
      }
      if (url.includes("prod.nd-api.com") && headers["authorization"]) {
        const bearerHeader = headers["authorization"];
        bearer = bearerHeader.replace(/^Bearer\s+/i, "");
      }

      if (guestUserId && bearer) {
        fs.writeFileSync(
          "./bearer.json",
          JSON.stringify({ bearer: bearer, guest_userid: guestUserId })
        );
        tokenCaptured = true;
      }
    });
    await context.storageState({ path: "./auth.json" });
    return true;
  } catch (error) {
    console.error("error encountered:", error);
    return false;
  }
}
