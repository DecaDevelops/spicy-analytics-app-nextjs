"use server";
import { db } from "@/_db/db";
export async function GET() {
  const result = await db.query.bots_rank_history.findMany({
    with: {
      bots: {
        with: {
          creator: true,
        },
      },
    },
  });

  return Response.json(result);
}
