import { BearerTokens } from "@/types/auth";
import fs from "fs";
export default async function GetSpicyHeaders(): Promise<Headers> {
  const headers = new Headers();

  if (fs.existsSync("./auth.json")) {
    const data = fs.readFileSync("./bearer.json", "utf-8");
    const authData = JSON.parse(data) as BearerTokens;
    if (authData) {
      headers.set("Authorization", `Bearer ${authData.bearer}`);
    }
  }

  headers.set("Referer", "https://spicychat.ai");
  headers.set("x-app-id", "spicychat");
  headers.set("Origin", "https://spicychat.ai");
  headers.set("Accept-Language", "en-Us,en;q0.9");
  headers.set("Accept", "application/json, text-plan, */*");
  headers.set("Content-Type", "application/json");
  return headers;
}
