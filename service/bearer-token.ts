"use server";
import { BearerTokens } from "@/types/auth";
import fs from "fs";
const BEARER_TOKEN_PATH = "./auth.json";
export async function existsBearerToken() {
  const exists = fs.existsSync(BEARER_TOKEN_PATH);
  return exists;
}

export async function getBearerToken() {
  const exists = fs.existsSync(BEARER_TOKEN_PATH);

  if (!exists) return;

  const res = fs.readFileSync(BEARER_TOKEN_PATH, "utf-8");

  try {
    return JSON.parse(res) as BearerTokens;
  } catch (error) {
    console.error("unhandled error", error);
    return;
  }
}
