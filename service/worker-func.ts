import { BASE_URL } from "../default.env.ts";

export async function refreshBotsAndTrending() {
  console.log("worker is fetching trending, please wait....\n");
  await fetch(BASE_URL + "/api/bots", { method: "GET" });
  console.log(
    "worker finished fetching trending, see trending page for updated"
  );
}

export async function updateMyChatbots() {
  console.log("worker is getting your bots, please wait.... \n");
  await fetch(BASE_URL + "/api/bots", { method: "GET" });
  console.log(
    "worker finished fetching your bots, you can see changes in drizzle studio or on the website"
  );
}
