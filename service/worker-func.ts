import { BASE_URL } from "../default.env.ts";

export async function refreshBotsAndTrending() {
  console.log("worker is fetching trending, please wait....\n");
  await fetch(BASE_URL + "/api/bots", { method: "GET" });
  console.log(
    "worker finished fetching trending, see trending page for updated"
  );
}
