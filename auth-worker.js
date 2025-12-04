import { ensureAuth } from "./service/auth.ts";

(async () => {
  console.log("Running auth at startup...");
  await ensureAuth();
})();

setInterval(async () => {
  console.log("running hourly auth refresh...");
  await ensureAuth();
}, 60 * 60 * 1000);
