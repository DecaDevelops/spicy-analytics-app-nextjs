"use server";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { AuthData, BearerTokens } from "@/types/auth";
import { BASE_API_URL } from "../../../../../default.env";
import { json } from "stream/consumers";
export async function GET(req: NextRequest) {
  if (!fs.existsSync("./auth.json")) {
    return NextResponse.json(
      { error: "Unauthorized, please log in!!" },
      { status: 401 }
    );
  }

  try {
    const data = fs.readFileSync("./bearer.json", "utf-8");

    const authData = JSON.parse(data) as BearerTokens;
    // return Response.json(authData);
    const headers = new Headers();

    if (authData) {
      headers.set("authorization", `Bearer ${authData.bearer}`);
      const result = await fetch(BASE_API_URL, {
        method: "GET",

        headers: headers,
      });

      return Response.json(await result.json());
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized, please log in again" },
      { status: 401 }
    );
  }
}
