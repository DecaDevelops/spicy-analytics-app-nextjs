import { cookies } from "next/headers";

export const BASE_HEADERS = {
  Accept: "application/json, text-plain, */*",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  "Accept-Language": "en-Us,en;q0.9",
  "Content-Type": "application/json",
  Origin: "https://spicychat.ai",
  Referer: "https://spicychat.ai/my-chatbots",
  "x-app-id": "spicychat",
  "x-country": "US",
};
const BASE_API_URL = "https://prod.nd-api.com/v2/users/characters?switch=T1";
const BASE_URL = "https://spicychat.ai";

export async function SpicyRequest(
  requestInit: RequestInit,
  requestUrl: string
) {
  const headers = new Headers(BASE_HEADERS);

  if (requestInit.headers) {
    const extra = new Headers(requestInit.headers);
    for (const [key, value] of extra.entries()) {
      headers.set(key, value);
    }
  }
  const cookieStore = await cookies();
  const bearer_token = cookieStore.get("stored_auth_cookie")?.value;
  const guest_token = cookieStore.get("stored_guest_cookie")?.value;
  if (bearer_token) headers.set("Authorization", `Bearer ${bearer_token}`);
  if (guest_token) headers.set("x-guest-userid", guest_token);

  return await fetch(requestUrl, {
    ...requestInit,
    headers,
  });
}
