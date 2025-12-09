import { ensureAuth } from "./service/auth.ts";
import {
  refreshBotsAndTrending,
  updateMyChatbots,
} from "./service/worker-func.ts";

(async () => {
  console.log("Running startup...");
  await ensureAuth();
  await refreshBotsAndTrending();
  await updateMyChatbots();
})();

setInterval(async () => {
  await refreshBotsAndTrending();
  await updateMyChatbots();
}, 15 * 60 * 1000);
setInterval(async () => {
  console.log("running hourly auth refresh...");
  await ensureAuth();
}, 60 * 60 * 1000);
