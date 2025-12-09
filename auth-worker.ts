import { ensureAuth } from "./service/auth.ts";
import { refreshBotsAndTrending } from "./service/worker-func.ts";

(async () => {
  console.log("Running startup...");
  await ensureAuth();
  await refreshBotsAndTrending();
})();

setInterval(async () => {
  await refreshBotsAndTrending();
}, 15 * 60 * 1000);
setInterval(async () => {
  console.log("running hourly auth refresh...");
  await ensureAuth();
}, 60 * 60 * 1000);
