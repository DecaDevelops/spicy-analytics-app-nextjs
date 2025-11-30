"use server";

import { search } from "@/types/search-pref";
import { TYPESENSE_ENDPOINT, TYPESENSE_KEY } from "../../../../default.env";

export async function GET() {
  const result = await fetch(TYPESENSE_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json, text-plain, */*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
      "Accept-Language": "en-Us,en;q0.9",
      Origin: "https://spicychat.ai",
      Referer: "https://spicychat.ai",
      "x-app-id": "spicychat",
      "x-country": "US",
      "Content-Type": "application/json",
      "X-TYPESENSE-API-KEY": TYPESENSE_KEY,
    },
    body: search,
  });

  console.log(result.status);

  return Response.json(await result.json());
}
