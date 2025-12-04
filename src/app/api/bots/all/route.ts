"use server";
import { db } from "@/_db/db";

export async function GET() {
  const result = await db.query.bots.findMany({
    with: {
      creator: true,
    },
  });

  return Response.json(result);
}
