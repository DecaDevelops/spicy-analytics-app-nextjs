"use server";
import { NextResponse } from "next/server";
import fs from "fs";
import { BearerTokens } from "@/types/auth";
import { BASE_API_URL } from "../../../../../default.env";
import { my_chatbots, my_chatbots_history } from "@/_db/schema";
import { my_chatbots as mc } from "@/types/typesense/chatbots";
import { mapMyChatBots } from "@service/mappers/chatbot.mapper";
import { db } from "@/_db/db";
import { sql } from "drizzle-orm";
import GetSpicyHeaders from "@service/headers/spicy-headers";

export async function GET() {
  if (!fs.existsSync("./auth.json")) {
    return NextResponse.json(
      { error: "Unauthorized, please log in!!" },
      { status: 401 }
    );
  }

  try {
    const headers = await GetSpicyHeaders();
    const result = await fetch(BASE_API_URL, {
      method: "GET",

      headers: headers,
      next: { revalidate: 60 },
    });
    if (result.status === 401)
      return NextResponse.json(
        {
          error:
            "you are no longer authorized, please relog or press the authenticate button",
        },
        { status: 401 }
      );
    if (!result.ok)
      return NextResponse.json({ error: result.statusText }, { status: 401 });

    const results = await result.json();
    const data = results.data as mc[];
    const { insert_my_chatbots, insert_my_chatbots_history } = data.reduce<{
      insert_my_chatbots: (typeof my_chatbots.$inferInsert)[];
      insert_my_chatbots_history: (typeof my_chatbots_history.$inferInsert)[];
    }>(
      (acc, p) => {
        acc.insert_my_chatbots.push(mapMyChatBots(p));
        acc.insert_my_chatbots_history.push({
          num_messages: p.num_messages ? p.num_messages : 0,
          bot_id: p.id,
          rating_score: p.rating_score ? p.rating_score.toString() : null,
        });
        return acc;
      },
      { insert_my_chatbots: [], insert_my_chatbots_history: [] }
    );

    await db
      .insert(my_chatbots)
      .values(insert_my_chatbots)
      .onConflictDoUpdate({
        target: my_chatbots.bot_id,
        set: {
          token_count: sql`excluded.token_count`,
          bot_name: sql`excluded.bot_name`,
          num_messages: sql`excluded.num_messages`,
          rating_score: sql`excluded.rating_score`,
          bot_title: sql`excluded.bot_title`,
          avatar_url: sql`excluded.avatar_url`,
          tags: sql`excluded.tags`,
        },
      });
    await db
      .insert(my_chatbots_history)
      .values(insert_my_chatbots_history)
      .onConflictDoNothing();

    return Response.json(
      { message: "chatbots have been updated" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
